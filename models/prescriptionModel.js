import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

let prescriptionSchema = new mongoose.Schema({
	userId: String,
	doctorId: String,
	doctor: String,
	user: String,
	prescribedFor:[String],
    medicine: [String],
    date: String,
    dosage: [String],
})

const Prescription = mongoose.model("prescription", prescriptionSchema)

export default Prescription
