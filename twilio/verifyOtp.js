import Users from "../models/userModel.js"
import twilio from "twilio"
import dotenv from "dotenv"
dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const serviceId = process.env.TWILIO_SERVICE_SID

export const verifyOtp = async (req, res) => {
	try {
		const { otpVerify, phone } = req.body
		const client = new twilio(accountSid, authToken)
		const check = await client.verify
			.services(serviceId)
			.verificationChecks.create({ to: phone, code: otpVerify })

		if(check.status === 'approved'){
			const user = await Users.findOne({ phone })
			const token = user.generateAuthToken(user)
			return res.status(200).send({
				message: "OTP verified",
				user:user,
				token
			})
		}
		else{
			return res.status(400).send({
				message: "OTP verification failed"
			})
		}
	} catch (err) {
		console.log(err.message)
	}
}
