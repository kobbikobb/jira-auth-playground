import express from "express";
import {getSettings, postSettings} from "./settingsController";

const router = express.Router();

router.get("/settings/", getSettings);
router.post("/settings/", postSettings);

export default router;