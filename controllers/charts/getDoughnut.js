import Departments from "../../models/departmentModel.js"

export async function getDoughnut(req, res) {
    
	try {
	if (req.userjwt.role === "doctor" || req.userjwt.role === "admin") {
		const departments = await Departments.aggregate([
			{
				$project: { count: { $size: "$doctors" }, _id: 0, name: 1 },
			},
		])
		let depName = [],
			depCount = []
		departments.forEach((department) => {
			depName.push(department.name)
			depCount.push(department.count)
		})
		res.status(201).send({
			depName,
			depCount,
			message: "DoughnutChart fetched succesfully",
		})
	} else {
		res.status(401).send({ message: "unauthorized" })
	}
	} catch (err) {
        console.log(err.message);
		res.status(500).json({ message: err.message })
	}
}
