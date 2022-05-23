import Departments from "../../models/departmentModel.js"

export async function getDepartments(req, res) {
	try {
		let department = await Departments.find()
		res.status(201).send({ department, message: "departments found" })
	} catch (err) {
		res.status(500).send({ message: err.message })
	}
}
