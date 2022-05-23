import Appointment from "../../models/appointmentModel.js"
import Doctor from "../../models/doctorModel.js"
import dayjs from 'dayjs'

export async function getAppointmentDoctor(req, res) {
	try {
        const time = dayjs(req.params.date).format("DD/MM/YYYY")
		const appointment = await Appointment.find({doctorId: req.params.id, date: time},{time:1,status:1,_id:0})
		const doctorTiming = await Doctor.findOne({_id: req.params.id},{startTime:1,endTime:1,days:1,_id:0})
        const timeArray = appointment.map(appointment => {
			if (appointment.status === "Scheduled") {
				return appointment.time
			}
		})
		res.status(201).send({ doctorTiming, timeArray, message: "appointments found" })
	} catch (err) {
		res.status(500).send({ message: err.message })
	}
}
