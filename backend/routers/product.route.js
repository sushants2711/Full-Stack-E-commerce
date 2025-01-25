import expres from "express";
import { adminAuth } from "../middlewares/admin.auth.js";
import { addProduct, listProducts, removeProductByID, singleProduct, singleProductByIdParams, updateProductById } from "../controllers/product.controller.js";
import { ensureAuthentication } from "../middlewares/ensureAuth.js";
import upload from "../middlewares/multer.js";
import { deleteProductMiddleware, productMiddleWareValidation, singleProductMiddleware, updateProductMiddlewareValidation } from "../middlewares/product.middleware.js";

const productRouter = expres.Router();

productRouter.route("/add").post( adminAuth, upload.fields([
    productMiddleWareValidation, 
    {name: 'image1', maxCount:1},
    {name: 'image2', maxCount:1},
    {name: 'image3', maxCount:1},
    {name: 'image4', maxCount:1},
    {name: 'image5', maxCount:1},
    {name: 'image6', maxCount:1},
]), addProduct)

productRouter.route("/remove").delete(adminAuth, deleteProductMiddleware, removeProductByID)
productRouter.route("/single-product").post( ensureAuthentication, singleProductMiddleware, singleProduct)
productRouter.route("/single-product/productid/:id").post( ensureAuthentication, singleProductByIdParams)
productRouter.route("/list").get(ensureAuthentication, listProducts)
productRouter.route("/update-product").put(adminAuth, upload.fields([
    updateProductMiddlewareValidation, 
    {name: 'image1', maxCount:1},
    {name: 'image2', maxCount:1},
    {name: 'image3', maxCount:1},
    {name: 'image4', maxCount:1},
    {name: 'image5', maxCount:1},
    {name: 'image6', maxCount:1},
]), updateProductById )

export default productRouter