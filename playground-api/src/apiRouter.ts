import express from "express";
import {getSettings, putSettings} from "./settings/settingsController";
import {getAuthLink, setAuthCode, getAuthTokens} from "./auth/authController";

const router = express.Router();

router.get("/settings/", getSettings);
router.put("/settings/", putSettings);

router.get("/auth/link/", getAuthLink);
router.post("/auth/code/", setAuthCode);
router.get("/auth/tokens/", getAuthTokens);

export default router;