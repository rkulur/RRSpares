import { Request, Response } from "express";
import fs from "fs";
import BrandSchema from "../Model/categories/brand";
import { errorHandler } from "../Utils/errorHandler";
import { successHandler } from "../Utils/errorHandler";
import { bucket } from "../cloud/cloudInitialization";
import {
	uploadFileToCloud,
	cloudUploadOptions,
	compareCloudFile,
	updateCloudFile,
	deleteCloudFile,
} from "../cloud/cloudOperations";

// ADD BRAND
export const addBrand = async (req: Request, res: Response) => {
	try {
		const { name, description, countryOfOrigin } = req.body;
		const logo = req.file;
		if (!name || !logo || !countryOfOrigin) {
			return errorHandler(res, 404, "Missing required fields");
		}

		const searchBrand = await BrandSchema.find({ name }); // returns array
		console.log(searchBrand.entries())
		const brandPresent = searchBrand.length >= 1;
		if (brandPresent) {
			return errorHandler(res, 404, "Brand is already present");
		}

		const uploadOptions = cloudUploadOptions(`brands/${logo.filename}`, logo.mimetype);
		const resizeOptions = {height : 100, width : 100}
		const fileSrc = await uploadFileToCloud(logo, bucket, uploadOptions,resizeOptions);
		const addedBrand = await new BrandSchema({
			name,
			logo: fileSrc,
			description,
			countryOfOrigin,
		}).save();

		successHandler(res, 201, "Brand created successfully", { addedBrand });
	} catch (error: any) {
		console.log(error.message, error.stack);
		errorHandler(res, 500, "Error while creating brand", error);
	}
};

// GET BRANDS
export const getAllBrands = async (req: Request, res: Response) => {
	try {
		const brands = await BrandSchema.find();
		successHandler(res, 200, "Brand fetched successfully", { brands });
	} catch (error: any) {
		console.log(error.message, error.stack);
		errorHandler(res, 500, "Error while fetching Brand");
	}
};

// GET BRAND BY ID
export const getBrandById = async (req: Request, res: Response) => {
	const brandId = req.params.id;
	try {
		const brand = await BrandSchema.findById(brandId);
		if (!brand) {
			return errorHandler(res, 404, "Brand not found");
		}
		successHandler(res, 200, `Fetched brand from id : ${brandId} successfully`, { brand });
	} catch (error: any) {
		errorHandler(res, 500, error.message);
	}
};

// UPDATE BRAND
export const editBrand = async (req: Request, res: Response) => {
	try {
		const { name, description, countryOfOrigin } = req.body;
		const logo = req.file;
		const brandId = req.params.id;

		const brand = await BrandSchema.findById(brandId);
		if (!brand) {
			return errorHandler(res, 404, "Brand not found");
		}

		let isLogoMatched = false;
		if (logo) {
			isLogoMatched = await compareCloudFile(logo, brand.logo);
		}

		const isDataMatching =
			name === brand.name &&
			description === brand.description &&
			countryOfOrigin === brand.countryOfOrigin &&
			isLogoMatched;

		if (isDataMatching) {
			return successHandler(res, 200, "Brand updated successfully!", { brand });
		}

		const fieldsToUpdate: {
			name: string;
			description: string;
			countryOfOrigin: string;
			logo?: string;
		} = { name, description, countryOfOrigin };

		// Updating the logo in cloud
		if (!isLogoMatched && logo) {
			const uploadOptions = cloudUploadOptions(`brands/${logo.filename}`, logo.mimetype);
			const resizeOptions = {height : 100, width : 100};
			const { fileSrc, isDeleted } = await updateCloudFile(
				logo,
				brand.logo,
				bucket,
				uploadOptions,
				resizeOptions
			);
			if (!isDeleted) {
				return errorHandler(res, 500, "An error occurred while attempting to edit the brand", {
					oldLogoDeleted: false,
				});
			}
			fieldsToUpdate.logo = fileSrc;
		}

		const updatedBrand = await BrandSchema.findByIdAndUpdate(
			brandId,
			{ $set: fieldsToUpdate },
			{ new: true, runValidators: true }
		);

		successHandler(res, 200, "Brand updated successfully!", {
			updatedBrand,
			oldLogoDeleted: true,
		});
	} catch (error: any) {
		console.log(error.message, error.stack);
		errorHandler(res, 500, "Error while editing Brand");
	}
};

// DELETE BRAND
export const deleteBrand = async (req: Request, res: Response) => {
	try {
		const brandId = req.params.id;
		const brand = await BrandSchema.findById(brandId);

		if (!brand) {
			return errorHandler(res, 404, "Brand not found");
		}

		await brand.deleteOne();
		await deleteCloudFile(brand.logo, bucket);
		successHandler(res, 200, "Brand deleted successfully!");
	} catch (error: any) {
		console.log(error.message, error.stack);
		errorHandler(res, 500, "Error while deleting Brand");
	}
};
