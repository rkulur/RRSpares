import { Request, Response } from "express";
import { errorHandler, successHandler } from "../../Utils/errorHandler";
import { PartsCategorySchema } from "../../Model";
import { checkDuplicateValue } from "../../Utils/checkDuplicateValue";

export const addPartsCategory = async (req: Request, res: Response) => {
	try {
		const { categoryName } = req.body;

		console.log(req.body);
		const categories = (await PartsCategorySchema.find()).map((category) => category.categoryName);

		if (!checkDuplicateValue(categoryName, categories)) {
			const addPartsCategory = await new PartsCategorySchema({
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
		const categories = await PartsCategorySchema.find();
		successHandler(res, 200, "Category retirieved successfully!!", { categories });
	} catch (e) {
		errorHandler(res, 500, `Error while retrieving parts category\n ${e}`);
	}
};

export const updatePartsCategory = async (req: Request, res: Response) => {
	try {
		const categoryId = req.params.id;
		const updatedCategoryName = req.body.updatedCategoryName;
		console.log(req.body)


		const categories = (await PartsCategorySchema.find()).map((category) => category.categoryName);

		if (checkDuplicateValue(updatedCategoryName, categories)) {
			errorHandler(res, 403, `${updatedCategoryName} is already present`);
            return;
		}

        const result = await PartsCategorySchema.findByIdAndUpdate(
            categoryId,
            { $set: { categoryName: updatedCategoryName } },
            { runValidators: true, new: true }
        );

        if (!result) {
            errorHandler(res, 403, `Invalid category Id`);
			return;
        }

        successHandler(res, 200, "Category updated successfully!!", { result });
	} catch (e) {
		errorHandler(res, 500, `Error while retrieving parts category!!!\n ${e}`);
	}
};

export const deletePartsCategory = async (req: Request, res: Response) => {
	try {
		const categoryId = req.params.id;

		const result = await PartsCategorySchema.findByIdAndDelete(categoryId);

		if (!result) {
			errorHandler(res, 403, `Invalid category Id`);
			return;
		}

		successHandler(res, 200, "Category deleted successfully!!!");
	} catch (e) {
		errorHandler(res, 500, `Error while retrieving parts category!!!\n ${e}`);
	}
};
