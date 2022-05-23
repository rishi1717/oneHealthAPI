import { Router } from "express"
const router = Router()

import { addDepartment } from "../controllers/departments/addDepartment.js"
import { getDepartments } from "../controllers/departments/getDepartments.js"
import { updateDepartment } from "../controllers/departments/updateDepartment.js"
import { deleteDepartment } from "../controllers/departments/deleteDepartment.js"
import authVerify from "../middlewares/authVerify.js"

router.post("/", authVerify, addDepartment)

router.get("/:id?", getDepartments)

router.put("/:id", authVerify, updateDepartment)

router.delete("/:id", authVerify, deleteDepartment)

export default router
