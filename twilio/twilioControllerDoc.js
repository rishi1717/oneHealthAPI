import { sendSms } from "./twilio.js"
import Doctors from "../models/doctorModel.js"

export const getTwilioOTPDoc = async (req, res) => {
	try {
		const { phone } = req.body
		const doctor = await Doctors.findOne({ phone: phone })
		if (!doctor) {
			return res.status(400).send({
				message: "doctor not found",
			})
		} else if (!doctor.active)
			return res.status(401).send({ message: "doctor blocked!" })
		else if (doctor.request)
			return res.status(401).send({ message: "Request pending!" })
		else {
			sendSms(phone)
			return res.status(200).send({
				message: "OTP sent",
			})
		}
	} catch (err) {
		console.log(err.message)
	}
}
