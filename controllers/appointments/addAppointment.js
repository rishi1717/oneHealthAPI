import Appointment from "../../models/appointmentModel.js"
import joi from "joi"

export async function addAppointment(req, res) {
	try {
		const { error } = validate(req.body)
		if (error)
			return res.status(400).send({ message: error.details[0].message })
		await new Appointment({ ...req.body }).save()
		res.status(201).send({ message: "Appointment created succesfully" })
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ message: err.message })
	}
}

const validate = (data) => {
	const schema = joi.object({
		userId: joi.string().required().label("UserId"),
		doctorId: joi.string().required().label("doctorId"),
		paymentId: joi.string().required().label("paymentId"),
		user: joi.string().required().label("User"),
		doctor: joi.string().required().label("doctor"),
		status: joi.string().required().label("status"),
		date: joi.string().required().label("date"),
		time: joi.string().required().label("time"),
		fee: joi.number().required().label("fee"),
		active: joi.allow().label("active"),
		age: joi.number().label("age"),
		gender: joi.string().label("gender"),
		phone: joi.string().label("phone"),
		reason: joi.string().label("reason"),
	})
	return schema.validate(data)
}
