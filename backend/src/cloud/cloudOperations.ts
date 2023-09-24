import { Bucket } from "@google-cloud/storage";
import { ImageResize, UploadOptions } from "../Interface/interface";
import { errorHandler } from "../Utils/errorHandler";
import { Response } from "express";
import fs from "fs";
import axios from "axios";
import resizeImage from "../imageOptmization/resize";

interface ImageResizeOptions {
	height : number, 
	width : number
}

async function uploadFileToCloud(
	res: Response,
	file: Express.Multer.File,
	bucket: Bucket,
	uploadOptions: UploadOptions,
	resizeOptions ?: ImageResizeOptions
) {
	return new Promise<string>(async (resolve, reject) => {
		let filePath = file.path;
		if(resizeOptions){
			const folderpath = file.path.split('\\')
			const resizedPath = await resizeImage({imagePath : file.path, height : resizeOptions.height, width : resizeOptions.width, resizedImagePath : `${folderpath.slice(0, folderpath.length - 1)}`})
			filePath = resizedPath
			console.log('path' , filePath)
		}
		bucket.upload(filePath, uploadOptions, async (err, uploadedFile) => {
			if (err) {
				reject(err);
			}
			await uploadedFile?.makePublic();
			const fileUrl = uploadedFile?.publicUrl();
			console.log('path inside : ', filePath)
			console.log(fileUrl)

			if (!fileUrl) {
				reject(new Error("Error while retrieving fileUrl"));
				return;
			}
			resizeOptions && fs.unlinkSync(file.path)
			fs.unlinkSync(filePath); // removing the file from upload directory
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
			resolve(false);
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

async function updateCloudFile(res: Response, file: Express.Multer.File,filePathInStorage : string, bucket: Bucket, uploadOptions: UploadOptions, resizeOptions ?: {height : number, width : number}) {
	const fileSrc = await uploadFileToCloud(res, file, bucket, uploadOptions,resizeOptions);
	const isDeleted = await deleteCloudFile(filePathInStorage, bucket);
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
