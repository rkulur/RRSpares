import { Request, Response } from "express";
import { errorHandler, successHandler } from "../../Utils/errorHandler";
import PartsCategoryModel from "../../Model/categories/Part/partsCategories";
import { checkDuplicateValue } from "../../Utils/checkDuplicateValue";

export const addPartsCategory = async (req: Request, res: Response) => {
	try {
		const { categoryName } = req.body;

		const categories = (await PartsCategoryModel.find()).map((category) => category.categoryName);

		if (!checkDuplicateValue(categoryName, categories)) {
			const addPartsCategory = await new PartsCategoryModel({
				categoryName,
			}).save();
			successHandler(res, 200, "Category added successfully", { addPartsCategory });
		} else {
			errorHandler(res, 403, `${categoryName} category is already present`);
		}
	} catch (e) {
		errorHandler(res, 500, `Error while adding parts category\n ${e}`);
	}
};

export const getAllPartsCategories = async (req: Request, res: Response) => {
	try {
		const allCategories = await PartsCategoryModel.find();
		successHandler(res, 200, "Category retirieved successfully!!", { allCategories });
	} catch (e) {
		errorHandler(res, 500, `Error while retrieving parts category\n ${e}`);
	}
};

export const updatePartsCategory = async (req: Request, res: Response) => {
	try {
		const categoryId = req.params.id;
		const updatedCategoryName = req.body.categoryName;

		const categories = (await PartsCategoryModel.find()).map((category) => category.categoryName);

		if (checkDuplicateValue(updatedCategoryName, categories)) {
			errorHandler(res, 403, `${updatedCategoryName} is already present`);
            return;
		}

        const result = await PartsCategoryModel.findByIdAndUpdate(
            categoryId,
            { $set: { categoryName: updatedCategoryName } },
            { runValidators: true, new: true }
        );

        if (!result) {
            errorHandler(res, 403, `Invalid category Id`);
        }

        successHandler(res, 200, "Category updated successfully!!", { result });
	} catch (e) {
		errorHandler(res, 500, `Error while retrieving parts category!!!\n ${e}`);
	}
};

export const deletePartsCategory = async (req: Request, res: Response) => {
	try {
		const categoryId = req.params.id;

		const result = await PartsCategoryModel.findByIdAndDelete(categoryId);

		if (!result) {
			errorHandler(res, 403, `Invalid category Id`);
		}

		successHandler(res, 200, "Category deleted successfully!!!");
	} catch (e) {
		errorHandler(res, 500, `Error while retrieving parts category!!!\n ${e}`);
	}
};
