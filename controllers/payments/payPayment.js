import Payment from "../../models/paymentModel.js"

export async function payPayment(req, res) {
	try {
		const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
			req.body
		const newOrder = Payment({
			isPaid: true,
			amount: amount/100,
			razorpay: {
				appointmentId: razorpayOrderId,
				paymentId: razorpayPaymentId,
				signature: razorpaySignature,
			},
		})
		let orderDet = await newOrder.save()
		res.send({
			msg: "Payment was successfull",
            paymentId:orderDet._id
		})
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
}
