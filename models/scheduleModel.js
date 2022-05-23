import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

let scheduleSchema = new mongoose.Schema({
	doctorId: String,
    detail: String,
	status: String,
	date: String,
})

const Schedule = mongoose.model("schedule", scheduleSchema)

export default Schedule