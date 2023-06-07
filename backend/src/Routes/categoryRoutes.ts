import { Router } from "express";
import { auth, checkIfAdmin } from "../Middleware";
import {
  addBrand,
  deleteBrand,
  editBrand,
  getBrandById,
  getAllBrands,
} from "../Controller/categoryController";
import multer from "multer";

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

router
  .route("/brand")
  .post(auth, checkIfAdmin, upload.single("logo"), addBrand)
  .get(auth, checkIfAdmin, getAllBrands);

router
  .route("/brand/:id")
  .get(auth,checkIfAdmin,getBrandById)
  .put(auth, checkIfAdmin, upload.single("logo"), editBrand)
  .delete(auth, checkIfAdmin, deleteBrand);
