import Users from "../../models/userModel.js"
import joi from "joi"
import bcrypt from "bcrypt"

export async function userLogin(req, res) {
	try {
		const { error } = validate(req.body)
		if (error)
			return res.status(400).send({ message: error.details[0].message })
		const user = await Users.findOne({ email: req.body.email })
		if (!user) return res.status(401).send({ message: "Invalid email!" })

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		)

		if (!validPassword)
			return res.status(401).send({ message: "Invalid password!" })

		if(!user.access)
			return res.status(401).send({ message: "Account Blocked!" })

		const token = user.generateAuthToken(user)

		res.status(200).send({
			user: user,
			token: token,
			message: "Logged in succesfully",
		})
	} catch (error) {
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
