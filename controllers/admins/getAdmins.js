import Admin from "../../models/adminModel.js"

export async function getAdmins (req, res) {
	try{
	if (req.userjwt.role === "admin") {
		const admin = await Admin.findOne({ _id: req.userjwt._id })
		res.status(201).send({ admin, message: "admin found" })
	} else {
		res.status(401).send({ message: "unauthorized" })
	}

	}catch(err){
		console.log(err.message)
		res.status(500).send({ message: err.message })
	}
}
