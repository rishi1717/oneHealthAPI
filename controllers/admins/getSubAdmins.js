import Doctors from '../../models/doctorModel.js'

export async function getSubAdmins (req, res) {
    try{
        if (req.userjwt.role === "admin") {
            const doctors = await Doctors.find({admin:true})
            res.status(201).send({ admins:doctors, message: "doctors found" })
        }
    }catch(err){
        console.log(err.message)
        res.status(500).send({ message: err.message })
    }
}
