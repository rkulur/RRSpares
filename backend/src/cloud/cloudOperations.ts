import { Bucket } from "@google-cloud/storage";
import { ImageResize, UploadOptions } from "../Interface/interface";
import { errorHandler } from "../Utils/errorHandler";
import { Response } from "express";
import fs from "fs";
import axios from "axios";
import resizeImage from "../imageOptmization/resize";

interface ImageResizeOptions {
	height: number;
	width: number;
}

async function uploadFileToCloud(
	file: Express.Multer.File,
	bucket: Bucket,
	uploadOptions: UploadOptions,
	resizeOptions?: ImageResizeOptions
) {
	return new Promise<string>(async (resolve, reject) => {
		try {
			let filePath = file.path;
			if (resizeOptions) {
				const folderpath = file.path.split("\\");
				const resizedPath = await resizeImage({
					imagePath: file.path,
					height: resizeOptions.height,
					width: resizeOptions.width,
					resizedImagePath: `${folderpath.slice(0, folderpath.length - 1)}`,
				});
				filePath = resizedPath;
				console.log("path", filePath);
			}
			bucket.upload(filePath, uploadOptions, async (err, uploadedFile) => {
				if (err) {
					reject(err);
				}
				await uploadedFile?.makePublic();
				const fileUrl = uploadedFile?.publicUrl();
				console.log("path inside : ", filePath);
				console.log(fileUrl);

				if (!fileUrl) {
					reject(new Error("Error while retrieving fileUrl"));
					return;
				}
				resizeOptions && fs.unlinkSync(file.path);
				fs.unlinkSync(filePath); // removing the file from upload directory
				resolve(fileUrl);
			});
		} catch (err) {
			reject(err);
			throw err;
		}
	});
}

async function uploadMultipleFilesToCloud(
	files: Express.Multer.File[],
	bucket: Bucket,
	uploadOptions: UploadOptions,
	resizeOptions: ImageResizeOptions
): Promise<string[]> {
	try {
		const fileSources: string[] = [];
		for (const file of files) {
			const fileSrc = await uploadFileToCloud(file, bucket, uploadOptions, resizeOptions);
			fileSources.push(fileSrc);
		}
		return fileSources;
	} catch (err) {
		console.log(err);
		throw err;
	}
}

async function compareCloudFile(
	reqFile: Express.Multer.File,
	compareFilePath: string
): Promise<boolean> {
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
		} catch (err) {
			reject(err);
			throw err;
		}
	});
}

async function deleteCloudFile(filePath: string, bucket: Bucket): Promise<boolean> {
	return new Promise<boolean>(async (resolve, reject) => {
		try {
			const pathInStorage = filePath.replace(
				`https://storage.googleapis.com/${process.env.STORAGE_BUCKET_NAME}/`,
				""
			); // Removing the unnecessary prefix from url
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
		} catch (err) {
			reject(err);
			throw err;
		}
	});
}

async function deleteMultipleCloudFiles(filePaths: string[], bucket: Bucket) {}

async function updateCloudFile(
	fileToUpdate: Express.Multer.File,
	currentFilePath: string,
	bucket: Bucket,
	uploadOptions: UploadOptions,
	resizeOptions?: { height: number; width: number }
): Promise<{ fileSrc: string; isDeleted: boolean }> {
	try {
		const fileSrc = await uploadFileToCloud(fileToUpdate, bucket, uploadOptions, resizeOptions);
		const isDeleted = await deleteCloudFile(currentFilePath, bucket);
		return {
			fileSrc,
			isDeleted,
		};
	} catch (err) {
		throw err;
	}
}

async function updateMultipleCloudFiles(
	filesToUpdate: Express.Multer.File[],
	currentFilePaths: string[],
	bucket: Bucket,
	uploadOptions: UploadOptions,
	resizeOptions: ImageResizeOptions
) {
	try {
		const updatedFileSrcs: { fileSrc: string }[] = [];

		const fLen = filesToUpdate.length;
		const cLen = currentFilePaths.length;
		const numOfIterations = fLen >= cLen ? fLen : cLen;

		for (let i = 0; i < numOfIterations; i++) {
			if (i < fLen) {
				const fileSrc = await uploadFileToCloud(
					filesToUpdate[i],
					bucket,
					uploadOptions,
					resizeOptions
				);
				updatedFileSrcs.push({ fileSrc });
			}
			if (i < cLen) {
				await deleteCloudFile(currentFilePaths[i], bucket);
			}
		}

		return updatedFileSrcs;
	} catch (err) {
		console.log(err);
		throw err;
	}
}

function cloudUploadOptions(destination: string, contentType: string) {
	return {
		destination,
		metadata: {
			contentType,
		},
	};
}

export {
	uploadFileToCloud,
	uploadMultipleFilesToCloud,
	compareCloudFile,
	deleteCloudFile,
	updateCloudFile,
	updateMultipleCloudFiles,
	cloudUploadOptions,
};
