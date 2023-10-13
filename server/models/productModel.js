import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the product name'],
    },
    description: {
        type: String,
        required: [true, 'Please enter the product description'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter the product price'],
        max: 10000, // Change this value as needed
    },
    images: {
        type: String,
        required: [true, 'Please enter the product images'],
    },
    BedRooms: {
        type: Number,
        required: [true, 'Please enter the number of bedrooms'],
    },
    Baths: {
        type: Number,
        required: [true, 'Please enter the number of baths'],
    },
    FlatSize: {
        type: Number,
        required: [true, 'Please enter the flat size'],
    },
    address: {
        type: String,
        required: [true, 'Please enter the product address'],
    },
    reviews: [
        {
            reviewImage: {
                type: String,
                required: true,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                required: true,
            },
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
