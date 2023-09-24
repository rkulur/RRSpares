import { Request, Response } from "express";
import fs from "fs";
import { BrandSchema, ModelSchema } from "../Model";
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
import { Mongoose, Schema } from "mongoose";


// ADD MODEL
export const addModel = async (req: Request, res: Response) => {
	try {
		const { name,brandId,description, variants } = req.body;
		const modelImg = req.file;
		if (!name || !modelImg || !variants || !brandId) {
			return errorHandler(res, 404, "Missing required fields");
		}

		const brandPresent = await BrandSchema.findById(brandId);
		if(!brandPresent){
			return errorHandler(res,404,"Invalid brand id");
		}

		const searchModel = await ModelSchema.find({ name }); // returns array
		const modelPresent = searchModel.length >= 1;
		if (modelPresent) {
			return errorHandler(res, 404, "Model is already present");
		}

		const uploadOptions = cloudUploadOptions(`models/${modelImg.filename}`, modelImg.mimetype);
		const resizeOptions = {height : 100, width : 100}
		const fileSrc = await uploadFileToCloud(res, modelImg, bucket, uploadOptions, resizeOptions);

		const variantsInArr = variants.split(',');
		console.log(variantsInArr)
		const addedModel = await new ModelSchema({
			name,
			brand : brandId,
			modelImg: fileSrc,
			description,
			variants : variantsInArr,
		}).save();

		successHandler(res, 201, "Model created successfully", { addedModel });
	} catch (error: any) {
		console.log(error.message, error.stack);
		errorHandler(res, 500, "Error while creating Model", error);
	}
};

// GET MODELS
export const getAllModels = async (req: Request, res: Response) => {
	try {
		const models = await ModelSchema.find().populate('brand');
		successHandler(res, 200, "Model fetched successfully", { models });
	} catch (error: any) {
		console.log(error.message, error.stack);
		errorHandler(res, 500, "Error while fetching Model");
	}
};

// // GET Model BY ID
// export const getModelById = async (req: Request, res: Response) => {
// 	const ModelId = req.params.id;
// 	try {
// 		const Model = await ModelSchema.findById(ModelId);
// 		if (!Model) {
// 			return errorHandler(res, 404, "Model not found");
// 		}
// 		successHandler(res, 200, `Fetched Model from id : ${ModelId} successfully`, { Model });
// 	} catch (error: any) {
// 		errorHandler(res, 500, error.message);
// 	}
// };

// UPDATE Model
export const editModel = async (req: Request, res: Response) => {
	try {
		const { name, description, brandId, variants } = req.body;
		const modelImg = req.file;
		const modelId = req.params.id;

		const Model = await ModelSchema.findById(modelId);
		if (!Model) {
			return errorHandler(res, 404, "Model not found");
		}
		
		const isDataMatching =
			name === Model.name &&
			description === Model.description &&
			brandId === Model.brand._id &&
			variants === Model.variants

		if (isDataMatching) {
			return successHandler(res, 200, "Model updated successfully !", { Model });
		}

		type ModelFields = {
			brand : Schema.Types.ObjectId,
			name : string,
			modelImg : string
			description : string, 
			variants : string[]
		}
		const variantsInArray = variants.split(' ');
		const fieldsToUpdate : ModelFields = { brand : brandId, name , description, variants : variantsInArray, modelImg : Model.modelImg };
		console.log(variants, variantsInArray)
		// Updating the model in cloud
		if (modelImg) {
			const uploadOptions = cloudUploadOptions(`models/${modelImg.filename}`, modelImg.mimetype);
			const { fileSrc, isDeleted } = await updateCloudFile(
				res,
				modelImg,
				Model.modelImg,
				bucket,
				uploadOptions
			);
			if (!isDeleted) {
				return errorHandler(res, 500, "An error occurred while attempting to edit the Model", {
					oldModelDeleted: false,
				});
			}
			fieldsToUpdate.modelImg = fileSrc;
		}

		const updatedModel = await ModelSchema.findByIdAndUpdate(
			Model._id,
			{ $set: fieldsToUpdate },
			{ new: true, runValidators: true }
		);

		successHandler(res, 200, "Model updated successfully!", {
			updatedModel,
			oldModelDeleted: true,
		});
	} catch (error: any) {
		console.log(error.message, error.stack);
		errorHandler(res, 500, "Error while editing Model");
	}
};

// DELETE Model
export const deleteModel = async (req: Request, res: Response) => {
	try {
		const modelId = req.params.id;
		const Model = await ModelSchema.findById(modelId);

		if (!Model) {
			return errorHandler(res, 404, "Model not found");
		}

		await Model.deleteOne();
		await deleteCloudFile(Model.modelImg, bucket);
		successHandler(res, 200, "Model deleted successfully!");
	} catch (error: any) {
		console.log(error.message, error.stack);
		errorHandler(res, 500, "Error while deleting Model");
	}
};
