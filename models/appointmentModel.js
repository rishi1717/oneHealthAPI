import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

let appointmentSchema = new mongoose.Schema({
	userId: String,
	paymentId: String,
	doctorId: String,
	user: String,
	doctor: String,
	status: String,
	reason: String,
	date: String,
	time: String,
	fee: Number,
	age: Number,
	gender: String,
	phone: String,
	active: Boolean,
})

const Appointment = mongoose.model("appointment", appointmentSchema)

export default Appointment
