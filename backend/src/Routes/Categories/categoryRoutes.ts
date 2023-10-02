import { Router } from "express";
import { auth, checkIfAdmin } from "../../Middleware";
import {
	addBrand,
	deleteBrand,
	editBrand,
	getBrandById,
	getAllBrands,
} from "../../Controller/brandController";
import { addModel, deleteModel, editModel, getAllModels } from "../../Controller/modelController";
import {
	addPartsCategory,
	deletePartsCategory,
	getAllPartsCategories,
	updatePartsCategory,
} from "../../Controller/Parts/partsCategoryController";
import { upload } from "../../Utils/multerStorage";

export const router = Router();

// BRAND
router
	.route("/brand")
	.post(auth, checkIfAdmin, upload.single("logo"), addBrand)
	.get(auth, checkIfAdmin, getAllBrands);

router
	.route("/brand/:id")
	.get(auth, checkIfAdmin, getBrandById)
	.put(auth, checkIfAdmin, upload.single("logo"), editBrand)
	.delete(auth, checkIfAdmin, deleteBrand);

// MODEL
router
	.route("/model")
	.post(auth, checkIfAdmin, upload.single("modelImg"), addModel)
	.get(auth, checkIfAdmin, getAllModels);

router
	.route("/model/:id")
	.get(auth, checkIfAdmin, getBrandById)
	.put(auth, checkIfAdmin, upload.single("modelImg"), editModel)
	.delete(auth, checkIfAdmin, deleteModel);

// PARTS

// PARTS CATEGORIES

router
	.route("/pcats")
	.post(auth, checkIfAdmin, addPartsCategory)
	.get(auth, checkIfAdmin, getAllPartsCategories);

router
	.route("/pcats/:id")
	.put(auth, checkIfAdmin, updatePartsCategory)
	.delete(auth, checkIfAdmin, deletePartsCategory);
