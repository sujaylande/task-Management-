import React from "react";
import { useSelector } from "react-redux";
import MyTaskList from "../MyTaskComponents/MyTaskList";

const ViewAllMyTasks = () => {
  const { tasks } = useSelector((state) => {
    return state.task;
  });

  const { user } = useSelector((state) => {
    return state.user;
  });

  const taskListArray = tasks?.filter((task) => {
    return task?.assignee?._id === user?._id;
  });

  return (
    <div>
      <MyTaskList taskListArray={taskListArray} />
    </div>
  );
};

export default ViewAllMyTasks;
