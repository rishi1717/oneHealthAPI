import twilio from "twilio"
import dotenv from "dotenv"
dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const serviceId = process.env.TWILIO_SERVICE_SID

export const sendSms = (phone) => {
	const client = new twilio(accountSid, authToken)
	try {
		client.verify
			.services(serviceId)
			.verifications.create({ to: phone, channel: "sms" })
			.then((verification_check) => console.log(verification_check.status))
			.catch((err) => {
				console.log(err)
			})
	} catch (err) {
		console.log(err.message)
	}
}
