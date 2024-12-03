import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
const app=express();

const port=process.env.port||4000;

app.use(express.json());
app.use(cors());
app.use(cors({ origin: "https://food-delivery-01fronteend.onrender.com" }));

connectDB();

app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("API Working");
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

// mongodb+srv://himanshukr:098890@cluster0.mpkg7xj.mongodb.net/?
