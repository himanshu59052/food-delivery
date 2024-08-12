import mongoose from "mongoose";

export const connectDB = async()=>{
   await mongoose.connect('mongodb+srv://himanshukr:098890@cluster0.mpkg7xj.mongodb.net/food-del').then(()=>console.log("DataBase Connected"));
}