import NotificationModel from "../Models/notificationModel.js";

export const getNotificationsController = async (req, res) => {
  const { UserId } = req.params;
  try {
    const notifications = await NotificationModel.find({
      "users.user": UserId,
    }).populate("users.user");
    res.json({
      res: { message: "Got All Notifications", success: true },
      allNotifications: notifications,
    });
  } catch (error) {
    res.json({
      res: { message: error, success: false },
    });
  }
};

export const createNotificationController = async (req, res) => {
  try {
    const newNotification = await NotificationModel.create(req.body);
    res.status(201).json({
      res: { message: "Notification Created Successfully", success: true },
      createdNotification: newNotification,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.json({
      res: { message: error, success: false },
    });
  }
};

export const deleteNotificationController = async (req, res) => {
  const { UserId, NotificationId } = req?.params;
  try {
    const deletedNotification = await NotificationModel.findByIdAndUpdate(
      { _id: NotificationId },
      { $pull: { users: { user: UserId } } }
    );
    res.status(201).json({
      res: { message: "Notification Deleted Successfully", success: true },
      deletedNotification: deletedNotification,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.json({
      res: { message: error, success: false },
    });
  }
};
