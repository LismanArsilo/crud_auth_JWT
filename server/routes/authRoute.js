import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl";

const router = Router();

router.post("/registrasi", indexCtrl.authCtrl.registrasi);
router.post("/login", indexCtrl.authCtrl.login);

export default router;
