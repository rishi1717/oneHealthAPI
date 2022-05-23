import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

let paymentSchema = new mongoose.Schema({
    amount:Number,
    isPaid:Boolean,
    razorpay:{
        appointmentId:String,
        paymentId:String,
        signature:String,
    }
})

const Payment = mongoose.model("payment", paymentSchema)

export default Payment
