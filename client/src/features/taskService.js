import axios from "axios";
import { base_url } from "../utils/base_url";

const createATask = async (data) => {
  const response = await axios.post(`${base_url}/task/create`, data?.body, {
    headers: {
      Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
      Accept: "application/json",
    },
  });
  if (response.data?.res?.unauthorized === true) {
    return false;
  } else {
    return response.data;
  }
};

const getAllTasks = async (data) => {
  const response = await axios.get(`${base_url}/task/allTasks`, {
    headers: {
      Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
      Accept: "application/json",
    },
  });
  if (response.data?.res?.unauthorized === true) {
    return false;
  } else {
    return response.data;
  }
};

const getTask = async (data) => {
  const response = await axios.get(`${base_url}/task/get/${data?.TaskId}`, {
    headers: {
      Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
      Accept: "application/json",
    },
  });
  return response.data;
};

const updateTask = async (data) => {
  const response = await axios.put(
    `${base_url}/task/update/${data?.TaskId}`,
    {
      title: data?.body?.title,
      description: data?.body?.description,
      assignee: data?.body?.assignee,
      creator: data?.body?.creator,
      creationDate: data?.body?.creationDate,
      dueDate: data?.body?.dueDate,
      priority: data?.body?.priority,
      status: data?.body?.status,
    },
    {
      headers: {
        Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const deleteTask = async (data) => {
  const response = await axios.delete(
    `${base_url}/task/delete/${data?.TaskId}`,
    {
      headers: {
        Authorization: `Bearer ${data?.Token !== null ? data?.Token : ""}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const taskService = {
  createATask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};

export default taskService;
