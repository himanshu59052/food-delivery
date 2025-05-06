import mongoose from "mongoose";

export const connectDB = async()=>{
   await mongoose.connect('mongodb+srv://himanshu09:himanshu0987@cluster0.7ysmaie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DataBase Connected"));
}
