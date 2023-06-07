import { Bucket } from "@google-cloud/storage";
import { UploadOptions } from "../Interface/interface";
import { errorHandler } from "../Utils/errorHandler";
import { Response } from "express";
import fs from "fs";
import axios from "axios";

async function uploadFileToCloud(
	res: Response,
	file: Express.Multer.File,
	bucket: Bucket,
	uploadOptions: UploadOptions
) {
	return new Promise<string>((resolve, reject) => {
		bucket.upload(file.path, uploadOptions, async (err, uploadedFile) => {
			if (err) {
				errorHandler(res, 500, "Error uploading file", {
					errMessage: err.message,
				});
				reject(err);
			}
			await uploadedFile?.makePublic();
			const fileUrl = uploadedFile?.publicUrl();

			if (!fileUrl) {
				errorHandler(res, 500, "Error while retrieving fileUrl");
				reject(new Error("Error while retrieving fileUrl"));
				return;
			}
			fs.unlinkSync(file.path); // removing the file from upload directory
			resolve(fileUrl);
		});
	});
}

async function compareCloudFile(reqFile: Express.Multer.File, compareFilePath: string) {
	return new Promise<boolean>(async (resolve, reject) => {
		try {
			const res = await axios.get(compareFilePath, {
				responseType: "arraybuffer",
			});

			const cloudFileBuffer = Buffer.from(res.data, "binary");
			const reqFileBuffer = fs.readFileSync(reqFile.path);
			const filesMatch = cloudFileBuffer.equals(reqFileBuffer);

			if (!filesMatch) {
				resolve(false);
				return;
			}
			resolve(true);
		} catch (error) {
			reject(error);
		}
	});
}

async function deleteCloudFile(filePath: string, bucket: Bucket) {
	return new Promise<boolean>(async (resolve, reject) => {
		const pathInStorage = filePath.replace(`https://storage.googleapis.com/${process.env.STORAGE_BUCKET_NAME}/`, ""); // Removing the unnecessary prefix from url
		const pathInStorage_DECODED = decodeURIComponent(pathInStorage);
		const file = bucket.file(pathInStorage_DECODED);

		try {
			await file.delete();
			console.log("file deleted");
			resolve(true);
		} catch (error: any) {
			console.log("Error Deleting file" + error.message, error.stack);
			reject("Error deleting file : " + error);
		}
	});
}

async function updateCloudFile(res: Response, file: Express.Multer.File, bucket: Bucket, uploadOptions: UploadOptions) {
	const fileSrc = await uploadFileToCloud(res, file, bucket, uploadOptions);
	const isDeleted = await deleteCloudFile(file.path, bucket);
	return {
		fileSrc,
		isDeleted,
	};
}

function cloudUploadOptions(destination: string, contentType: string) {
	return {
		destination,
		metadata: {
			contentType,
		},
	};
}

export { uploadFileToCloud, compareCloudFile, deleteCloudFile, updateCloudFile, cloudUploadOptions };
