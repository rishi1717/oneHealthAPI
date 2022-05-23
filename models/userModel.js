import mongoose from "mongoose"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

let userSchema = new mongoose.Schema(
	{
		firstName: String,
		secondName: String,
		age: Number,
		gender: String,
		email: {
			type: String,
			unique: true,
		},
		phone: {
			type: String,
			unique: true,
		},
		blood: String,
		password: String,
		image: String,
		access: Boolean,
	},
	{ timestamps: true }
)

userSchema.methods.generateAuthToken = (user) => {
	const token = JWT.sign({ _id: user._id, role:'user' }, process.env.JWT_KEY, {
		expiresIn: "7d",
	})
	return token
}

const Users = mongoose.model("user", userSchema)

export default Users 
