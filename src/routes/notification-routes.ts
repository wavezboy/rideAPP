import express from "express";
import * as notificationController from "../controller/notification-controller";

const router = express.Router();

router.post("/send-notification", notificationController.sendNotification);
router.get("/get-notification", notificationController.getNotification);

export default router;
