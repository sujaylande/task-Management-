import generateToken from "../Config/generateToken.js";
import { generateRefreshToken } from "../Config/refreshToken.js";
import { validateMongodbId } from "../Config/validateMongodbId.js";

import userModel from "../Models/UserModel.js";

export const createUserController = async (req, res) => {
  const { email } = req.body;
  try {
    const foundEmail = await userModel.findOne({ email: email });
    if (foundEmail) {
      res.json({
        res: { message: "User Already Exists", success: false },
      });
    } else {
      const newUser = await userModel.create(req.body);
      res.json({
        registeredUser: newUser,
        res: { message: "User Registered Successfully", success: true },
      });
    }
  } catch (error) {
    res.json({
      res: { message: error, success: false },
    });
  }
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await userModel.findOne({ email });

  if (foundUser && (await foundUser.isPasswordMatched(password))) {

    res.json({
      userData: {
        _id: foundUser?._id,
        name: foundUser?.name,
        email: foundUser?.email,
        role: foundUser?.role,
        Token: generateToken(foundUser?._id),
      },
      res: {
        message: "Signed In Successfully",
        success: true,
      },
    });
  } else {
    res.json({ res: { message: "Invalid Credentials", success: false } });
  }
};

export const loginAdminController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundAdmin = await userModel.findOne({ email });

    if (foundAdmin.role !== "admin") {
      res.json({ res: { message: "You are not an Admin", success: false } });
    }

    if (foundAdmin && (await foundAdmin.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(foundAdmin?._id);
      const updateAdmin = await userModel.findByIdAndUpdate(
        foundAdmin?._id,
        { refreshToken: refreshToken },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });

      res.json({
        _id: foundAdmin?._id,
        firstName: foundAdmin?.firstName,
        lastName: foundAdmin?.lastName,
        email: foundAdmin?.email,
        mobile: foundAdmin?.mobile,
        Token: generateToken(foundAdmin?._id),
        res: {
          message: "You are an Admin",
          success: true,
        },
      });
    }
  } catch (error) {
    res.json({ res: { message: error, success: false } });
  }
};


export const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    const allUsersArray = allUsers.map((user) => {
      const userObject = {
        name: user?.name,
        email: user?.email,
        role: user?.role,
        _id: user?._id,
      };
      return userObject;
    });
    res.json({
      allUsers: allUsersArray,
      res: { message: "Success", success: true },
    });
  } catch (error) {
    res.json({
      res: { message: "Not Fetched", success: false },
    });
  }
};

export const getAUserController = async (req, res) => {
  const { UserId } = req.params;
  validateMongodbId(UserId);
  try {
    const user = await userModel.findById({ _id: UserId });

    const userObject = {
      name: user?.name,
      email: user?.email,
      role: user?.role,
      _id: user?._id,
    };
    res.json({
      gotUser: userObject,
      res: { message: "User got Successfully", success: true },
    });
  } catch (error) {
    res.json({
      res: { message: "Not Fetched", success: false },
    });
  }
};

export const deleteAUserController = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const user = await userModel.findByIdAndDelete(id);
    res.json(user);
  } catch (error) {
    res.json({
      res: { message: "Not Fetched", success: false },
    });
  }
};

export const updateAUserController = async (req, res) => {
  const { _id } = req.user;
  validateMongodbId(_id);
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      {
        name: req?.body?.name,
        email: req?.body?.email,
      },
      {
        new: true,
      }
    );
    res.json({
      updatedUser,
      res: { message: "User Data is Updated Successfully", success: true },
    });
  } catch (error) {
    res.json({ res: { message: error, success: false } });
  }
};

//Only admin can block a user
export const blockAUserController = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const blockUser = await userModel.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      { new: true }
    );
    res.json(blockUser);
  } catch (error) {
    res.json({
      res: { message: error, success: false },
    });
  }
};

//Only admin can unblock a user
export const unblockAUserController = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const unblockUser = await userModel.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: true }
    );
    res.json(unblockUser);
  } catch (error) {
    res.json({
      res: { message: error, success: false },
    });
  }
};
