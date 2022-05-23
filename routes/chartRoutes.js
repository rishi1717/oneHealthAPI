import { Router } from "express"
import dotenv from "dotenv"
import authVerify from "../middlewares/authVerify.js"
import { getBarDetails } from "../controllers/charts/getBarDetails.js"
import { getPieDetails } from "../controllers/charts/getPieDetails.js"
import { getCardDetails } from "../controllers/charts/getCardDetails.js"
import { getDoughnut } from "../controllers/charts/getDoughnut.js"
import { getLine } from "../controllers/charts/getLineDetails.js"
dotenv.config()
const router = Router()

router.get('/bar',authVerify, getBarDetails)

router.get('/pie',authVerify, getPieDetails)

router.get('/doughnut',authVerify, getDoughnut)

router.get('/line',authVerify, getLine)

router.get('/card',authVerify, getCardDetails)

export default router
