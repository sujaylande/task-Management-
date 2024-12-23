import axios from "axios";
import { base_url } from "../utils/base_url";

const registerUser = async (userData) => {
  const response = await axios.post(`${base_url}/user/register-user`, userData);
  return response.data;
};

const loginUser = async (data) => {
  const response = await axios.post(`${base_url}/user/login-user`, data);
  return response.data;
};

const getAllUsers = async (data) => {
  const response = await axios.get(`${base_url}/user/get/all-users`, {
    headers: {
      Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
      Accept: "application/json",
    },
  });
  return response.data;
};

const getUser = async (data) => {
  const response = await axios.get(`${base_url}/user/get/${data?.UserId}`, {
    headers: {
      Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
      Accept: "application/json",
    },
  });
  if (
    response.data?.res?.unauthorized === true &&
    response.data?.res?.success === false &&
    data?.Token !== undefined
  ) {
    return false;
  } else {
    return response.data;
  }
};

const updateUserProfile = async (data) => {
  const response = await axios.put(
    `${base_url}/user/update-user-profile`,
    data?.body,
    {
      headers: {
        Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
        Accept: "application/json",
      },
    }
  );
  if (
    response.data?.res?.unauthorized === true &&
    response.data?.res?.success === false
  ) {
    return false;
  } else {
    return response.data;
  }
};

const deleteNotification = async (data) => {
  const response = await axios.delete(
    `${base_url}/user/delete-notification/${data?.UserId}/${data?.NotificationId}`,
    {
      headers: {
        Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const getAllNotifications = async (data) => {
  const response = await axios.get(
    `${base_url}/user/all-notifications/${data?.UserId}`,
    {
      headers: {
        Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const userService = {
  registerUser,
  loginUser,
  getUser,
  updateUserProfile,
  getAllUsers,
  getAllNotifications,
  deleteNotification,
};

export default userService;
