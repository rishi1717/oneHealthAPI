import Users from "../../models/userModel.js"

export async function getUsers(req, res) {
	try {
		let user
		if (req.params.id) {
			user = await Users.findById(req.params.id)
		} else {
			user = await Users.find()
		}
		res.send({ user, message: "users found" })
	} catch (err) {
		res.send({ message: err.message })
	}
}
