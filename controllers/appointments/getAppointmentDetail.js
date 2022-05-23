import Appointment from "../../models/appointmentModel.js"

export async function getAppointmentDetail(req, res) {
	try {
		let appointment = await Appointment.findOne({
			_id: req.params.id,
		})
		res.status(201).send({ appointment, message: "appointment found" })
	} catch (err) {
		console.log(err.message)
		res.status(500).send({ message: err.message })
	}
}
