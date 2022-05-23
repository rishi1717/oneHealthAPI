import mongoose from "mongoose"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

let doctorSchema = new mongoose.Schema(
	{
		name: String,
		email: {
			type: String,
			unique: true,
		},
		department: String,
		phone: {
			type: String,
			unique: true,
		},
		qualification: String,
		expertise: String,
		experience: String,
		days: [Number],
		startTime: String,
		endTime: String,
		fee: Number,
		password: String,
		image: String,
		admin: Boolean,
		active: Boolean,
		request: Boolean,
		otp: {
			type: Number,
			expires: "5m",
		},
	},
	{ timestamps: true }
)

doctorSchema.methods.generateAuthToken = (doctor) => {
	const token = JWT.sign(
		{ _id: doctor._id, role: "doctor" },
		process.env.JWT_KEY,
		{
			expiresIn: "7d",
		}
	)
	return token
}

const Doctors = mongoose.model("doctor", doctorSchema)

export default Doctors
