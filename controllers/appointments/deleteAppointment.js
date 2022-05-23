import Appointment from "../../models/appointmentModel.js"

export async function deleteAppointment (req, res) {
	if (req.userjwt.role === "doctor" || req.userjwt.role === "admin") {
		try {
			await Appointment.deleteOne({ _id: req.params.id })
			res.status(201).send({ message: "appointment deleted succesfully" })
		} catch (err) {
			console.log(err.message)
			res.status(500).json({ message: err.message })
		}
	} else {
		res.status(401).send({ message: "unauthorized" })
	}
}
