import indexCtrl from "../controllers/indexCtrl";
import { Router } from "express";

const router = Router();

router.get("/countStudent", indexCtrl.studentCtrl.countStudent);
router.get("/", indexCtrl.studentCtrl.findAll);
router.get("/:id", indexCtrl.studentCtrl.findOne);

export default router;
