import Doctors from "../models/doctorModel.js"
import twilio from "twilio"
import dotenv from "dotenv"
dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const serviceId = process.env.TWILIO_SERVICE_SID

export const verifyOtpDoc = async (req, res) => {
	try {
		const { otpVerify, phone } = req.body
		const client = new twilio(accountSid, authToken)
		const check = await client.verify
			.services(serviceId)
			.verificationChecks.create({ to: phone, code: otpVerify })

		if (check.status === "approved") {
			const doctor = await Doctors.findOne({ phone })
			const token = doctor.generateAuthToken(doctor)
			return res.status(200).send({
				message: "OTP verified",
				doctor,
				token,
			})
		} else {
			return res.status(400).send({
				message: "OTP verification failed",
			})
		}
	} catch (err) {
		console.log(err.message)
	}
}
