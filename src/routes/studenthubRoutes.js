import { Router } from "express";
import { createStudenthubElement, getAllCollegeStudenthubElement } from "../controller/studenthubController.js";

const router = Router();

router.route('/create').post(createStudenthubElement)
router.route('/get').post(getAllCollegeStudenthubElement)

export default router