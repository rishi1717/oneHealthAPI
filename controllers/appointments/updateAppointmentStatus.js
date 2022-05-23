import Appointment from "../../models/appointmentModel.js"

export async function updateAppointmentStatus(req, res) {
	try {
		await Appointment.updateOne(
			{ _id: req.params.id },
			{ $set: { ...req.body, status: req.body.status } }
		)
		res.status(201).send({
			message: "Status Updated succesfully",
		})
	} catch (err) {
		res.status(500).send({ message: err.message })
	}
}
