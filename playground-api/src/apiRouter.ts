import express from "express";
import {getSettings, putSettings} from "./settings/settingsController";
import {getAuthLink, setAuthCode, getAuthTokens, getNewestAuthToken} from "./auth/authController";

const router = express.Router();

router.get("/settings/", getSettings);
router.put("/settings/", putSettings);

router.get("/auth/link/", getAuthLink);
router.post("/auth/code/", setAuthCode);
router.get("/auth/tokens/", getAuthTokens);
router.get("/auth/tokens/newest", getNewestAuthToken);

export default router;