import userModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await userModel.findById(decoded.id);
      req.user = user;
      next();
    } catch (error) {
      res.json({
        res: {
          message: "Not Authorized , Token Expired , Please Login Again",
          success: false,
          unauthorized: true,
        },
      });
    }
  } else {
    res.json({
      res: {
        message: "There is no token attached to the Header",
        unauthorized: false,
        success: false,
      },
    });
  }
};

export const isAdminMiddleware = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await userModel.findOne({ email });

  if (adminUser.role !== "admin") {
    res.json({ res: { message: "You are not a Admin", success: false } });
  } else {
    next();
  }
};
