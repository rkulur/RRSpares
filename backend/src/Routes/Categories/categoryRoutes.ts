import { Router } from "express";
import { auth, checkIfAdmin } from "../../Middleware";
import multer from "multer";
import {
	addBrand,
	deleteBrand,
	editBrand,
	getBrandById,
	getAllBrands,
} from "../../Controller/brandController";
import { addModel, deleteModel, editModel, getAllModels } from "../../Controller/modelController";
import { addPartsCategory, deletePartsCategory, getAllPartsCategories, updatePartsCategory } from "../../Controller/Parts/partsCategoryController";

export const router = Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		const uniquePrefix = Date.now() + Math.round(Math.random() * 1e5);
		cb(null, uniquePrefix + file.originalname);
	},
});

const upload = multer({ storage });

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
  
router.route("/pcats/:id")
  .put(auth, checkIfAdmin, updatePartsCategory)
  .delete(auth, checkIfAdmin, deletePartsCategory)
