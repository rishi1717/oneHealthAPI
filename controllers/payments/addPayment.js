import Razorpay from 'razorpay'
import dotenv from "dotenv"
dotenv.config()

export async function addPayment(req, res) {
	try {
		const instance = new Razorpay({
			key_id: process.env.RAZOR_KEY,
			key_secret: process.env.RAZOR_SECRET,
		})
		const options = {
			amount: req.body.amount,
			currency: "INR",
		}
		const payment = await instance.orders.create(options)
		if (!payment) return res.status(500).send("Some error occured")
		res.send(payment)
	} catch (error) {
		res.status(500).send(error)
	}
}
