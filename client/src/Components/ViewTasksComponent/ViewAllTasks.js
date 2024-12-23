import React from "react";
import { useSelector } from "react-redux";
import MyTaskList from "../MyTaskComponents/MyTaskList";
import Spinner from "../ReusableComponents/Spinner";

const ViewAllTasks = () => {
  const { tasks, isLoading } = useSelector((state) => {
    return state.task;
  });

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center my-8">
          <Spinner />
        </div>
      )}
      {!isLoading && <MyTaskList taskListArray={tasks} />}
    </div>
  );
};

export default ViewAllTasks;
