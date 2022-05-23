import { Router } from "express"
const router = Router()

import { addAppointment } from "../controllers/appointments/addAppointment.js"
import { getAppointments } from "../controllers/appointments/getAppointments.js"
import { getAppointmentDoctor } from "../controllers/appointments/getAppointmentDoctor.js"
import { updateAppointment } from "../controllers/appointments/updateAppointment.js"
import { deleteAppointment } from "../controllers/appointments/deleteAppointment.js"
import authVerify from "../middlewares/authVerify.js"
import { getAppointmentByDate } from "../controllers/appointments/getAppointmentByDate.js"
import { getAppointmentHistory } from "../controllers/appointments/getAppointmentHistory.js"
import { getAppointmentDetail } from "../controllers/appointments/getAppointmentDetail.js"
import { getDoctorAppointments } from "../controllers/appointments/getDoctorAppointemtns.js"
import { updateAppointmentStatus } from "../controllers/appointments/updateAppointmentStatus.js"

router.post("/", authVerify, addAppointment)

router.get("/:id?",authVerify, getAppointments)

router.get("/doctor/:id", authVerify, getDoctorAppointments)

router.get("/detail/:id",authVerify, getAppointmentDetail)

router.get("/:id/:date",authVerify, getAppointmentDoctor)

router.get("/date/:date/:id", authVerify, getAppointmentByDate)

router.get("/history/:userId/:doctorId", authVerify, getAppointmentHistory)

router.put("/:id", authVerify, updateAppointment)

router.put("/status/:id", authVerify, updateAppointmentStatus)

router.delete("/:id", authVerify, deleteAppointment)

export default router