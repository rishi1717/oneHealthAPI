import Department from "../../models/departmentModel.js"
import joi from "joi"

export async function addDepartment(req, res) {
	try {
		
	if (req.userjwt.role === "doctor" || req.userjwt.role === "admin") {
		const { error } = validate(req.body)
		if (error)
			return res.status(400).send({ message: error.details[0].message })
		const department = await Department.findOne({ name: req.body.name })
		if (department)
			return res.status(409).send({ message: "department already exist!" })

		await new Department({ ...req.body }).save()
		res.status(201).send({ message: "department created succesfully" })
	} else {
		res.status(401).send({ message: "unauthorized" })
	}
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}

const validate = (data) => {
	const schema = joi.object({
		name: joi.string().required().label("name"),
		doctors: joi.allow()
	})
	return schema.validate(data)
}
