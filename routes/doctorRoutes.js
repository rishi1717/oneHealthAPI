import { Router } from "express"
const router = Router()
import { doctorRegister } from "../controllers/doctors/doctorRegister.js"
import { doctorLogin } from "../controllers/doctors/doctorLogin.js"
import { getDoctors } from "../controllers/doctors/getDoctors.js"
import { updateDoctor } from "../controllers/doctors/updateDoctor.js"
import { deleteDoctor } from "../controllers/doctors/deleteDoctor.js"
import authVerify from "../middlewares/authVerify.js"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { changePassword } from "../controllers/doctors/changePassword.js"
import { getTwilioOTPDoc } from "../twilio/twilioControllerDoc.js"
import { verifyOtpDoc } from "../twilio/verifyOtpDoc.js"

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "Profile",
	},
})

const upload = multer({ storage: storage })

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})



router.post("/login", doctorLogin)

router.post("/", upload.single("image"), doctorRegister)

router.get("/:id?",authVerify, getDoctors)

router.put("/:id", authVerify,  upload.single('image'), updateDoctor)

router.put("/changepassword/:id", authVerify,  upload.single('image'), changePassword)

router.post("/otplogin", getTwilioOTPDoc)

router.post("/otpverify", verifyOtpDoc)

router.delete("/:id", authVerify, deleteDoctor)

export default router
