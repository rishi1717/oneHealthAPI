import Appointment from "../../models/appointmentModel.js"

export async function getDoctorAppointments(req, res) {
	try {
		const appointment = await Appointment.find({
			doctorId: req.params.id,
		}).sort({ date:-1,time: 1 })
		res.status(201).send({
			appointment,
			message: "appointments found",
		})
	} catch (err) {
		console.log(err.message)
		res.status(500).send({ message: err.message })
	}
}
