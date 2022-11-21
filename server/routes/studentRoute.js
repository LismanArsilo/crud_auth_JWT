import indexCtrl from "../controllers/indexCtrl";
import { Router } from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken";

const router = Router();

router.get("/countStudent", indexCtrl.studentCtrl.countStudent);
router.get("/", verifyAdmin, indexCtrl.studentCtrl.findAll);
router.get("/:id", verifyUser, indexCtrl.studentCtrl.findOne);
router.put("/:id", indexCtrl.studentCtrl.updateStudent);

export default router;
