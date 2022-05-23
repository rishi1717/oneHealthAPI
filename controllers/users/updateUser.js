import Users from "../../models/userModel.js"
import joi from "joi"

export async function updateUser(req, res) {
	try {
		const updateData = {
			firstName: req.body.firstName,
			secondName: req.body.secondName,
			age: req.body.age,
			email: req.body.email,
			phone: req.body.phone,
			blood: req.body.blood,
			gender: req.body.gender,
			image: req.file ? req.file.path : req.body.image,
		}
		const { error } = validate(updateData)
		if (error){
			console.log(error.details[0].message)
			return res.status(400).send({ message: error.details[0].message })
		}
			
		await Users.updateOne(
			{ _id: req.params.id },
			{ ...updateData, access:req.body.access }
		)
		const user = await Users.find({ _id: req.params.id })
		res.status(201).send({ user, message: "User Updated succesfully" })
	} catch (err) {
		console.log(err.message)
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
		phone: joi.string().required().label("phone"),
		blood: joi.string().label("blood"),
		image: joi.allow().label("image"),
	})
	return schema.validate(data)
}
