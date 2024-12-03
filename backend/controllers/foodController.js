// import foodModel from '../models/foodModel.js'
// import fs from 'fs'


// // add food item

// const addFood = async (req,res) => {

//     let image_filename = `${req.file.filename}`;

//     const food = new foodModel({
//         name:req.body.name,
//         description:req.body.description,
//         price:req.body.price,
//         category:req.body.category,
//         image:image_filename
//     })
//     try {
//         await food.save();
//         res.json({success:true,message:"Food Added"})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"Error"})
//     }
// }
// const listFood = async (req,res) => {
//     try {
//         const foods = await foodModel.find({});
//         res.json({success:true,data:foods})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

// const removeFood = async (req,res) => {
//     try {
//         const food = await foodModel.findById(req.body.id);
//         fs.unlink(`uploads/${food.image}`,()=>{})

//         await foodModel.findByIdAndDelete(req.body.id);
//         res.json({success:true,message:"Food Removed"})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }
import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";

// Helper to delete files
const deleteFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) console.error(`Error deleting file: ${filePath}`, err);
        });
    } else {
        console.warn(`File not found: ${filePath}`);
    }
};

// Add a new food item
const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const imageFilename = req.file.filename;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: imageFilename,
        });

        await food.save();
        res.status(201).json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        const foodsWithFullImagePath = foods.map((food) => ({
            ...food.toObject(),
            image: `${req.protocol}://${req.get("host")}/uploads/${food.image}`, // Full URL for the image
        }));

        res.status(200).json({ success: true, data: foodsWithFullImagePath });
    } catch (error) {
        console.error("Error listing food:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Remove a food item
const removeFood = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Food ID is required" });
        }

        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Delete the associated image file
        const filePath = path.join("uploads", food.image);
        deleteFile(filePath);

        // Remove the food item from the database
        await foodModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Food item removed successfully" });
    } catch (error) {
        console.error("Error removing food:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { addFood, listFood, removeFood };


// export {addFood,listFood,removeFood}
