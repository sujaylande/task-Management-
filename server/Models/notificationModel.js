import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  users: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const NotificationModel = mongoose.model("Notification", notificationSchema);
export default NotificationModel;
