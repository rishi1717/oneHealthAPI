import Doctors from "../../models/doctorModel.js"
import Departments from "../../models/departmentModel.js"
import Appointment from "../../models/appointmentModel.js"

export async function deleteDoctor(req, res) {
	if (req.userjwt.role === "admin") {
		try {
			const doc = await Doctors.findOne(
				{
					_id: req.params.id,
				},
				{ department: 1, _id: 0 }
			)
			const dep = doc.department
			await Departments.updateOne({ name: dep }, { $pull: { doctors: req.params.id } })
			await Appointment.deleteMany({ doctorId: req.params.id })
			await Doctors.deleteOne({ _id: req.params.id })
			res.status(201).send({ message: "Doctor deleted succesfully" })
		} catch (err) {
			console.log(err.message)
			res.status(500).json({ message: err.message })
		}
	} else {
		res.status(401).json({ message: "not authorized" })
	}
}
