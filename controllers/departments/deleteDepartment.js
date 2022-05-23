import Department from "../../models/departmentModel.js"

export async function deleteDepartment(req, res) {
	try{
		
	if (req.userjwt.role === "doctor" || req.userjwt.role === "admin") {
		await Department.findOneAndDelete({ _id: req.params.id })
		res.status(201).send({ message: "department deleted succesfully" })
	} else {
		res.status(401).send({ message: "unauthorized" })
	}
	}catch(err){
		console.log(err.message)
		res.status(500).json({ message: err.message })
	}
}
