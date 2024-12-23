import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import MyTaskList from "../MyTaskComponents/MyTaskList";
import Spinner from "../ReusableComponents/Spinner";

const ViewAllAssigneeTasks = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];

  const { tasks, isLoading } = useSelector((state) => {
    return state.task;
  });

  const taskListArray = tasks?.filter((task) => {
    return task?.assignee?._id === userId;
  });

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center my-8">
          <Spinner />
        </div>
      )}
      {!isLoading && <MyTaskList taskListArray={taskListArray} />}
    </div>
  );
};

export default ViewAllAssigneeTasks;
