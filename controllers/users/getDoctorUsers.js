import Appointment from "../../models/appointmentModel.js"

export async function getDoctorUsers(req, res) {
	try {
		let appointment = await Appointment.aggregate([
			{
				$match: { doctorId: req.params.id },
			},
			{ $addFields: { userIdObj: { $toObjectId: "$userId" } } },
			{
				$lookup: {
					from: "users",
					localField: "userIdObj",
					foreignField: "_id",
					as: "users",
				},
			},
		])
		const users = appointment.map((appointment) => appointment.users[0])
		const uniqueUsers = []
		users.forEach((user) => {
			let count = 0
            let insert = 0
			users.forEach((user2) => {
				if (user.email === user2.email) {
					count++
				}
			})
			if (count <= 1) {
				uniqueUsers.push(user)
			} else {
                uniqueUsers.forEach((user3) => {
                    if (user.email === user3.email) {
                        insert++
                    }
                })
                if(insert === 0){
                    uniqueUsers.push(user)
                }
            }
		})
		res.send({ users: uniqueUsers, message: "users found" })
	} catch (err) {
		console.log(err.message)
		res.send({ message: err.message })
	}
}
