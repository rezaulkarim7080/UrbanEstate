import express from "express";

import { isAuthenticatedUser, } from "../middleware/auth.js";

import { createProduct, createProductReview, getAllProduct, getProductReviews, productDetails, } from "../controllers/ProductController.js";



const router = express.Router();

// MARN PART 

//create product

router.get("/products", getAllProduct);
router.post("/products/new", createProduct);
router.get("/products/:id", productDetails);
router.put("/review", isAuthenticatedUser, createProductReview);
router.get("/reviews", getProductReviews);










// router.get("/products", getAllProduct);
// router.post("/products/new", isAuthenticatedUser, createProduct);
// router.patch("products/:id", isAuthenticatedUser, updateProduct);
// router.delete("/products/:id", isAuthenticatedUser, deleteProduct);
// router.get("/products/:id", productDetails);
// router.put("/review", isAuthenticatedUser, createProductReview);
// router.get("/reviews", getProductReviews);




















// MARN PART 

// //create product
// router.get("/products", getAllProduct);
// // router.post("/products", isAuthenticatedUser, authorizeRoles("admin"), createProduct);
// router.post("/admin/products/new", isAuthenticatedUser, authorizeRoles("admin"), createProduct);
// router.patch("/admin/products/:id", isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
// router.delete("/admin/products/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
// router.get("/products/:id", productDetails);
// router.put("/review", isAuthenticatedUser, createProductReview);
// router.get("/reviews", getProductReviews);
// router.delete("/reviews", isAuthenticatedUser, deleteProductReview);


export default router;

