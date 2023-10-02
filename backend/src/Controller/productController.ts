import { Request, Response } from "express";
import { errorHandler, successHandler } from "../Utils/errorHandler";
import { BrandSchema, ModelSchema, PartsCategorySchema, ProductSchema } from "../Model";

export const addProduct = async (req: Request, res: Response) => {
	try {
		const {
			pName,
			pColor,
			pDescription,
			pCurrentPrice,
			pPreviousPrice,
			pCategory,
			pModel,
			pBrand,
		} = req.body;
		
		const pImages = req.files;
		console.log(pImages)

		if (!(await BrandSchema.findById(pBrand))) {
			errorHandler(res, 403, "Invalid Brand Id");
			return;
		}

		if (!(await ModelSchema.findById(pModel))) {
			errorHandler(res, 403, "Invalid Model Id");
			return;
		}

		if (!(await PartsCategorySchema.findById(pCategory))) {
			errorHandler(res, 403, "Invalid category Id");
			return;
		}

		const addedProduct = await new ProductSchema({
			pName,
			pDescription,
			pImages,
			pCurrentPrice,
			pPreviousPrice,
			pCategory,
			pModel,
			pBrand,
			pColor,
		}).save();

		successHandler(res, 201, "Product added successfully!!!", { addedProduct });
	} catch (err) {
		console.log(err);
		errorHandler(res, 500, "Something went wrong while adding product!!!");
	}
};

export const getAllProducts = async (req: Request, res: Response) => {
	try {
		const products = await ProductSchema.find();
		successHandler(res, 200, "Products retrieved successfully!!!", { products });
	} catch (err) {
		console.log(err);
		errorHandler(res, 500, "Something went wrong while retrieving all products");
	}
};

export const getProductById = async (req: Request, res: Response) => {
	try {
		const pId = req.params.id;
		const product = await ProductSchema.findById(pId);

		if (!product) {
			errorHandler(res, 404, "Product not found");
			return;
		}

		successHandler(res, 200, "Product retrieved successfully!!);", { product });
	} catch (err) {
		console.log(err);
		errorHandler(res, 500, "Something went wrong while retrieving the product");
	}
};

export const editProduct = async (req: Request, res: Response) => {
	try {
		const pId = req.params.id;
		const {
			pName,
			pColor,
			pDescription,
			pCurrentPrice,
			pPreviousPrice,
			pCategory,
			pModel,
			pBrand,
		} = req.body;
		const pImages = req.files;
		console.log(req.file)
		const fieldsToUpdate = {
			pName,
			pColor,
			pDescription,
			pCurrentPrice,
			pPreviousPrice,
			pCategory,
			pModel,
			pBrand,
		};

		const updatedProduct = await ProductSchema.findByIdAndUpdate(
			pId,
			{ $set: fieldsToUpdate },
			{ new: true, runValidators: true }
		);

		if (!updatedProduct) {
			return errorHandler(res, 404, "Product not found");
		}

		successHandler(res, 200, "Product updated successfully", { product: updatedProduct });
	} catch (err) {
		console.log(err);
		errorHandler(res, 500, "Something went wrong while retrieving the product");
	}
};

export const deleteProduct = async (req: Request, res: Response) => {
	try {
		const pId = req.params.id;

		const product = await ProductSchema.findByIdAndDelete(pId);
		if (!product) {
			errorHandler(res, 404, "Product not found");
			return;
		}

		successHandler(res, 200, "Product deleted successfully!!!", { product });
	} catch (err) {
		console.log(err);
		errorHandler(res, 500, "Something went wrong while deleting the product");
	}
};
