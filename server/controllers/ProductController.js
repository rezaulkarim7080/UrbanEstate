import Product from "../models/productModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import ApiFeatures from "../utils/apiFeatures.js";
import mongoose from "mongoose"; // Import mongoose to check ObjectId validity

// Create Product -- Admin
export const createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

// Get all products

export const getAllProduct = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 20;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        message: "Products retrieved successfully",
        success: true,
        productCount,
        products,
        resultPerPage,
    });
});

// Get product details by ID

export const productDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Product details retrieved successfully",
        product,
    });
});


// Create or update a product review

export const createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { comment, productId } = req.body;

    // Make sure the productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler("Invalid product ID", 400));
    }

    const review = {
        reviewImage: req.user.userImage,
        user: req.user._id,
        name: req.user.name,
        comment,
    };

    // Use the valid `productId` to query the product
    const product = await Product.findById(productId).populate('reviews.user');

    // Handle existing reviews
    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
    }

    // Save the product with the updated reviews
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        status: true,
        message: "Review added successfully",
        review,
    });
});



// Get all reviews of a product
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        status: true,
        message: "Reviews retrieved successfully",
        data: product.reviews,
    });
});
