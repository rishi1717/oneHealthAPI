import Users from "../../models/userModel.js"

export async function deleteUser(req, res) {
	if (req.userjwt.role === "admin") {
		try {
			await Users.deleteOne({ _id: req.params.id })
			res.status(201).send({ message: "user deleted succesfully" })
		} catch (err) {
			console.log(err.message)
			res.status(500).json({ message: err.message })
		}
	} else {
		res.status(401).json({ message: "not authorized" })
	}
}
