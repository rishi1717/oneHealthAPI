import Appointment from "../../models/appointmentModel.js"

export async function getAppointmentHistory(req, res) {
	try {
		const appointment = await Appointment.find({
			userId: req.params.userId,
			doctorId: req.params.doctorId,
		}).sort({ date: -1, time: -1 })
		res.status(201).send({
			appointment,
			message: "appointments found",
		})
	} catch (err) {
		console.log(err.message)
		res.status(500).send({ message: err.message })
	}
}
