import Prescription from "../../models/prescriptionModel.js"

export async function deletePrescription(req, res) {
	if (req.userjwt.role === "doctor" || req.userjwt.role === "admin") {
		try {
			await Prescription.deleteOne({ _id: req.params.id })
			res.status(201).send({ message: "prescription deleted succesfully" })
		} catch (err) {
			console.log(err.message)
			res.status(500).json({ message: err.message })
		}
	}
}
