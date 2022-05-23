import Appointment from "../../models/appointmentModel.js"
import dayjs from "dayjs"

export async function getAppointmentByDate(req, res) {
	try {
		if (req.userjwt.role === "doctor" || req.userjwt.role === "admin") {
			const date = dayjs(req.params.date).format("DD/MM/YYYY")
			const appointment = await Appointment.find({
				date: date,
				doctorId: req.params.id,
			}).sort({ time: 1 })
			res.status(201).send({
				appointment,
				message: "appointments found",
			})
		}
		else{
			res.status(401).send({ message: "unauthorized" })
		}
	} catch (err) {
		console.log(err.message)
		res.status(500).send({ message: err.message })
	}
}
