import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import MyTaskList from "../MyTaskComponents/MyTaskList";
import Spinner from "../ReusableComponents/Spinner";

const ViewAllStausTasks = () => {
  const location = useLocation();
  const paramStatus = location.pathname.split("/")[2];

  const { tasks, isLoading } = useSelector((state) => {
    return state.task;
  });

  let status;
  if (paramStatus === "open") {
    status = "Open";
  } else if (paramStatus === "complete") {
    status = "Completed";
  } else if (paramStatus === "in-progress") {
    status = "In Progress";
  }

  const taskListArray = tasks?.filter((task) => {
    return task.status === status;
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

export default ViewAllStausTasks;
