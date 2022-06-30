import Department from "../../models/departmentModel.js"

export async function updateDepartment(req, res) {
	try {

		if (req.userjwt.role === "doctor" || req.userjwt.role === "admin") {
			await Department.updateOne({ _id: req.params.id }, { $set: { name: req.body.name } })
			res.status(201).send({ message: "department Updated succesfully" })
		} else {
			res.status(401).send({ message: "unauthorized" })
		}
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ message: err.message })
	}
}
