import Admins from "../../models/adminModel.js"
import Doctors from "../../models/doctorModel.js"
import bcrypt from "bcrypt"
import joi from "joi"

export async function adminLogin(req, res) {
	try {
		const { error } = validate(req.body)
		if (error)
			return res.status(400).send({ message: error.details[0].message })
		let admin = await Admins.findOne({ email: req.body.email })
		if (!admin) {
			admin = await Doctors.findOne({ email: req.body.email })
			if (!admin) {
				return res.status(401).send({ message: "Invalid email!" })
			}
			if (!admin.admin) {
				return res.status(401).send({ message: "No Admin access!" })
			}
		}

		const validPassword = await bcrypt.compare(
			req.body.password,
			admin.password
		)

		if (!validPassword)
			return res.status(401).send({ message: "Invalid password!" })

		const token = admin.generateAuthToken(admin)

		res.status(200).send({
			adminId: admin._id,
			adminName: admin.name,
			token: token,
			message: "Logged in succesfully",
		})
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: error.message })
	}
}

const validate = (data) => {
	const schema = joi.object({
		email: joi.string().required().label("email"),
		password: joi.string().required().label("password"),
	})
	return schema.validate(data)
}
