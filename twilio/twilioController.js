import { sendSms } from "./twilio.js"
import Users from "../models/userModel.js"

export const getTwilioOTP = async (req, res) => {
	try {
		const { phone } = req.body
        const user = await Users.findOne({ phone })
        if(!user){
            return res.status(400).send({
                message: "User not found"
            })
        }
        else if(!user.access)
			return res.status(401).send({ message: "User blocked!" })

        else{
            sendSms(phone)
            return res.status(200).send({
                message: "OTP sent"
            })
        }
        
	} catch (err) {
		console.log(err.message)
	}
}
