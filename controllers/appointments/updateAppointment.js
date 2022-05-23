import Appointment from "../../models/appointmentModel.js"
import dayjs from "dayjs"

export async function updateAppointment(req, res) {
	try {
		const date = dayjs(req.body.date).format("DD/MM/YYYY")
		await Appointment.updateOne({ _id: req.params.id }, {$set:{...req.body, date: date}})
		const appointment = await Appointment.find({ _id: req.params.id })
		res.status(201).send({ appointment, message: "Appointment Updated succesfully" })
	} catch (err) {
		res.status(500).send({ message: err.message })
	}
}
