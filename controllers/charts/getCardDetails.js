import Doctors from "../../models/doctorModel.js"
import Users from "../../models/userModel.js"

export async function getCardDetails(req, res) {
	try {
		
	if (req.userjwt.role === "doctor" || req.userjwt.role === "admin") {
		const docCount = await Doctors.countDocuments({})
		const docActive = await Doctors.countDocuments({ active: true })
		const docInactive = await Doctors.countDocuments({ active: false })
		const doctor = [docCount, docActive, docInactive]
		let userCount = await Users.countDocuments({})
		const userActive = await Users.countDocuments({ access: true })
		const userInactive = await Users.countDocuments({ access: false })
		const user = [userCount, userActive, userInactive]
		res.status(201).send({ doctor, user, message: "details fetched" })
	} else {
		res.status(401).send({ message: "unauthorized" })
	}
	} catch (err) {
		console.log(err.message)
		res.status(500).send({ message: err.message })
	}
}
