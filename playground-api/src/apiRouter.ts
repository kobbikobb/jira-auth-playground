import express from "express";
import {getSettings, putSettings} from "./settingsController";

const router = express.Router();

router.get("/settings/", getSettings);
router.put("/settings/", putSettings);

export default router;