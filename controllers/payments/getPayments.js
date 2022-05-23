import Payment from "../../models/paymentModel.js"

export async function getPayments (req, res) {
	const orders = await Payment.find()
	res.send(orders)
}
