import Users from "../../models/userModel.js"
import joi from "joi"
import passwordComplexity from "joi-password-complexity"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

export async function userRegister(req, res) {
	try {
		let userData = {
			firstName: req.body.firstName,
			secondName: req.body.secondName,
			age: req.body.age,
			gender: req.body.gender,
			email: req.body.email,
			password: req.body.password,
			phone: req.body.phone,
			blood: req.body.blood,
			image: req.file.path,
		}
		const { error } = validate(userData)
		if (error) {
			return res.status(400).send({ message: error.details[0].message })
		}

		const user = await Users.findOne({ email: req.body.email })
		if (user)
			return res
				.status(409)
				.send({ message: "User with this email already exist!" })

		const salt = await bcrypt.genSalt(Number(process.env.SALT))
		const hashPassword = await bcrypt.hash(req.body.password, salt)

		let phone = req.body.phone.trim().replace(/ +/g, "")

		console.log(phone)

		phone = phone.startsWith("+91") ? phone : "+91" + phone

		await new Users({
			...userData,
			phone,
			password: hashPassword,
			access: true,
		}).save()
		res.status(201).send({ message: "User created succesfully" })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const validate = (data) => {
	const schema = joi.object({
		firstName: joi.string().required().label("firstName"),
		secondName: joi.string().required().label("secondName"),
		age: joi.number().required().label("age"),
		gender: joi.string().required().label("gender"),
		email: joi.string().required().label("email"),
		phone: joi.string().label("phone"),
		password: passwordComplexity().required().label("password"),
		blood: joi.allow("blood"),
		image: joi.allow("image"),
	})
	return schema.validate(data)
}
