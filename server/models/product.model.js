const mongoose = require('mongoose');

// Creates the Schema for Products
const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            minlength: [5, "Title must be at least 5 characters long."]
        },

        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [1, "Price must be at least $1."]
        },

        description: {
            type: String,
            required: [true, "Description required"],
            minlength: [10, "Description must be at least 10 characters long."]
        }
    },

    { timestamps: true }
);

// Creates the constructor function for a Product
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
