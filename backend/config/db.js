import mongoose from "mongoose";

export const connectDB = async()=>{
   await mongoose.connect('mongodb+srv://himanshu09:himanshu0987@cluster0.mpkg7xj.mongodb.net/food-del').then(()=>console.log("DataBase Connected"));
}
