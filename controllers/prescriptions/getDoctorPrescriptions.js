import Prescriptions from "../../models/prescriptionModel.js"

export async function getDoctorPrescriptions(req, res) {
	try {
		let prescription = await Prescriptions.find({ doctorId: req.params.id })
		res.status(201).send({ prescription, message: "got prescriptions" })
	} catch (err) {
		res.status(500).send({ message: err.message })
	}
}
