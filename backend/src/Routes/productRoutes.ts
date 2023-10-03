import { Router } from "express";
import { auth, checkIfAdmin } from "../Middleware";
import { addProduct, deleteProduct, editProduct, getAllProducts, getProductById } from "../Controller/productController";
import { upload } from "../Utils/multerStorage";


const router = Router();

router.route("/")
    .post(auth, checkIfAdmin,upload.array("pImages", 5),addProduct)
    .get(auth, checkIfAdmin, getAllProducts)

router.route("/:id")
    .get(auth, checkIfAdmin, getProductById)
    .delete(auth, checkIfAdmin, deleteProduct)
    .put(auth, checkIfAdmin,upload.array("pImages"), editProduct)
    

export { router };
