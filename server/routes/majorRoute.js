import indexCtrl from "../controllers/indexCtrl";
import { Router } from "express";

const router = Router();

router.get("/count", indexCtrl.majorCtrl.findAllCount);

export default router;
