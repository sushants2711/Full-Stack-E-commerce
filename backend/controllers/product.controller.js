import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.model.js";
import mongoose from "mongoose";

// function for add the product
export const addProduct = async (req, res) => {
    try {
        const { name, description, extrainformation, seller, price, category, subcategory, sizes, bestseller, brand } = req.body;
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]
        const image5 = req.files.image5 && req.files.image5[0]
        const image6 = req.files.image6 && req.files.image6[0]

        const images = [image1, image2, image3, image4, image5, image6].filter((item) => item !== undefined)

        let imagesurl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {
                    folder: "productfile",
                    resource_type: 'auto',
                    quality: 'auto:low'
                });
                return result.secure_url;
            })
        )

        const newproductData = new productModel({
            name,
            description,
            extrainformation,
            seller,
            price,
            category,
            subcategory,
            sizes: JSON.parse(sizes),
            bestseller,
            brand,
            image: imagesurl,
            date: Date.now()
        })
        const productsave = await newproductData.save();
        return res
            .status(201)
            .json({
                success: true,
                message: "Product added successfully",
                productsave
            })

    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ success: false, message: "Internal Server error" })
    }
}

// function for list all the product
export const listProducts = async (req, res) => {
    try {
        const product = await productModel.find({})
        if (product.length <= 0) {
            return res
                .status(400)
                .json({ success: false, message: "No products available" })
        }
        return res
            .status(200)
            .json({ success: true, product })

    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" })
    }
}

// function for remove the product
export const removeProductByID = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Validation failed. Please provide a valid product ID.",
            });
        }

        // Check if the product exists
        const productExist = await productModel.findById(id);
        if (!productExist) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Delete images from Cloudinary
        try {
            const images = productExist.image; // Assuming 'image' is an array of URLs
            if (images && images.length > 0) {
                await Promise.all(
                    images.map(async (imageUrl) => {
                        const publicId = imageUrl
                            .split('/')
                            .slice(-2)
                            .join('/')
                            .split('.')[0]; // Extract the public ID from the URL
                        await cloudinary.uploader.destroy(publicId);
                    })
                );
            }
        } catch (cloudinaryError) {
            return res.status(500).json({
                success: false,
                message: "Error deleting images from Cloudinary",
                error: cloudinaryError.message,
            });
        }

        // Delete product from the database
        await productModel.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// function for single product info
export const singleProduct = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Id is missing" })
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Validation failed. Please provide a valid product ID.",
            });
        }

        const productFind = await productModel.findById(id)
        if (!productFind) {
            return res
                .status(400)
                .json({ success: false, message: "Product not listed" })
        }
        return res
            .status(200)
            .json({ success: true, productFind })

    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" })
    }

}

// function for single product by id
export const singleProductByIdParams = async (req, res) => {
    try {
        const { id } = req.params; // Extracting 'id' from req.params

        if (!id) {
            return res
                .status(400)
                .json({ success: false, message: "Product ID is required" });
        }

        const productFind = await productModel.findById(id);
        if (!productFind) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }

        return res
            .status(200)
            .json({ success: true, product: productFind });
    } catch (error) {
        console.error("Internal Error:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

// update the product by ID
export const updateProductById = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "ID is missing" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Validation failed. Please provide a valid product ID.",
            });
        }

        const productExist = await productModel.findById(id);
        if (!productExist) {
            return res.status(404).json({
                success: false,
                message: "Product not found with the provided ID.",
            });
        }

        const productUpdate = req.body;

        if (req.files) {
            if (productExist.image && productExist.image.length > 0) {
                await Promise.all(
                    productExist.image.map(async (imageUrl) => {
                        const publicId = imageUrl.split('/').pop().split('.')[0];
                        await cloudinary.uploader.destroy(`productfile/${publicId}`);
                    })
                );
            }

            const imageFiles = [
                req.files.image1?.[0],
                req.files.image2?.[0],
                req.files.image3?.[0],
                req.files.image4?.[0],
                req.files.image5?.[0],
                req.files.image6?.[0],
            ].filter(Boolean);

            const uploadedImages = await Promise.all(
                imageFiles.map(async (currEle) => {
                    const result = await cloudinary.uploader.upload(currEle.path, {
                        folder: "productfile",
                        resource_type: 'auto',
                        quality: 'auto:low',
                    });
                    return result.secure_url;
                })
            );

            productUpdate.image = uploadedImages; // Add new images to update object
        }
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            productUpdate,
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


// filter the product when user search from backend 
export const filterProductByUserInput = async (req, res) => {
    try {
        const searchKey = req.params.key;
        const productFilterIs = await productModel.find({
            "$or": [
                { "name": { $regex: searchKey } },
                { "category": { $regex: searchKey } },
                { "brand": { $regex: searchKey } }
            ]
        });
        return res.status(200)
            .json({
                success: true,
                data: productFilterIs.length>0 ? productFilterIs : "No product available that you want to find it",
            });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};