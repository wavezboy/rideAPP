import { RequestHandler } from "express";
import notificationModel from "../models/notification-model";

interface notBody {
  message: string;
}

interface reqBody {
  userId: string;
}
export const sendNotification: RequestHandler<
  reqBody,
  unknown,
  notBody,
  unknown
> = async (req, res, next) => {
  const userId = "";
  const message = req.body;

  // Logic to send a real-time notification to the user with userId
  // Example: Send the notification through WebSockets or a notification service

  try {
    const newNotification = await notificationModel.create({
      user_id: userId,
      message: message,
      isRead: false,
    });

    res
      .status(200)
      .json({ message: "notification sent succesfully", newNotification });
  } catch (error) {
    next(error);
  }
};

export const getNotification: RequestHandler<
  reqBody,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const notification = notificationModel
      .find({ user_id: userId })
      .sort({ timestamp: -1 });

    if (!notification || (await notification).length == 0) {
      return res.status(404).json("no notification found for this user");
    }

    res.status(200).json({ notification });
  } catch (error) {
    next(error);
  }
};
