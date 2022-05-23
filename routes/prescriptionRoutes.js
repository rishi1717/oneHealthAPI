import { Router } from "express"
const router = Router()

import { addPrescription } from "../controllers/prescriptions/addPrescription.js"
import { deletePrescription } from "../controllers/prescriptions/deletePrescription.js"
import { getDoctorPrescriptions } from "../controllers/prescriptions/getDoctorPrescriptions.js"
import { getPrescriptions } from "../controllers/prescriptions/getPrescriptions.js"
import authVerify from "../middlewares/authVerify.js"

router.get("/:id?", authVerify, getPrescriptions)

router.get("/doctor/:id", authVerify, getDoctorPrescriptions)

router.post("/", authVerify, addPrescription)

router.delete("/:id", authVerify, deletePrescription)

export default router
