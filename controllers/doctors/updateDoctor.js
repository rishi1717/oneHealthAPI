import Doctors from "../../models/doctorModel.js"
import Departments from "../../models/departmentModel.js"
import joi from "joi"

export async function updateDoctor(req, res) {
	try {
		const isJsonParsable = (string) => {
			try {
				JSON.parse(string)
			} catch (e) {
				return false
			}
			return true
		}

		const parsable = isJsonParsable(req.body.days)

		const parsableReq = isJsonParsable(req.body.request)

		let dayArray, requestBoolean

		if (parsableReq) {
			requestBoolean = JSON.parse(req.body.request)
		} else {
			requestBoolean = req.body.request
		}

		if (parsable) {
			dayArray = JSON.parse(req.body.days)
		} else {
			dayArray = req.body.days
		}

		if (req.userjwt.role === "doctor" || req.userjwt.role === "admin") {
			const updateData = {
				name: req.body.name,
				email: req.body.email,
				department: req.body.department,
				qualification: req.body.qualification,
				expertise: req.body.expertise,
				experience: req.body.experience,
				days: dayArray,
				startTime: req.body.startTime,
				endTime: req.body.endTime,
				fee: req.body.fee,
				request: requestBoolean,
				image: req.file ? req.file.path : req.body.image,
			}
			const { error } = validate(updateData)
			if (error) {
				console.log(error.details[0].message)
				return res.status(400).send({ message: error.details[0].message })
			}

			const res1 = await Doctors.updateOne(
				{ _id: req.params.id },
				{ ...updateData, active: req.body.active, admin: req.body.admin }
			)

			if (req.body.oldDepartment) {
				if (req.body.department === req.body.oldDepartment) {
					res.status(201).send({ message: "doctor Updated succesfully" })
				} else {
					await Departments.findOneAndUpdate(
						{ name: req.body.oldDepartment },
						{ $pull: { doctors: req.params.id } }
					)
					await Departments.findOneAndUpdate(
						{ name: req.body.department },
						{ $push: { doctors: req.params.id } }
					)
					res.status(201).send({ message: "doctor Updated succesfully" })
				}
			}
		} else {
			res.status(401).json({ message: "not authorized" })
		}
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ message: err.message })
	}
}

const validate = (data) => {
	const schema = joi.object({
		name: joi.string().required().label("name"),
		email: joi.string().required().label("email"),
		department: joi.string().required().label("department"),
		qualification: joi.string().required().label("qualification"),
		expertise: joi.string().required().label("expertise"),
		experience: joi.string().required().label("experience"),
		days: joi.array().required().label("days"),
		startTime: joi.string().required().label("startTime"),
		endTime: joi.string().required().label("endTime"),
		fee: joi.number().required().label("fee"),
		image: joi.allow().label("image"),
		active: joi.allow(),
		request: joi.allow(),
	})
	return schema.validate(data)
}
