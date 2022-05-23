import { Router } from "express"
import dotenv from "dotenv"
dotenv.config()
const router = Router()

import { addPayment } from "../controllers/payments/addPayment.js"
import { getPayments } from "../controllers/payments/getPayments.js"
import { payPayment } from "../controllers/payments/payPayment.js"
// import { updatePayment } from "../controllers/payments/updatePayment.js"
import authVerify from '../middlewares/authVerify.js'

router.post("/create", addPayment)

router.post("/pay", payPayment)

router.get("/:id?", getPayments)

router.get("/get-razor-key", (req,res)=>{
    res.send({key: process.env.RAZOR_KEY})
})

export default router
