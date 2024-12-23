import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../ReusableComponents/Spinner";
import KanbanboardItem from "./KanbanboardItem";

const Kanbanboard = () => {
  const { tasks, isLoading } = useSelector((state) => {
    return state.task;
  });

  const openTaskListArray = [];
  const inProgressTaskListArray = [];
  const completedTaskListArray = [];

  tasks?.forEach((task) => {
    if (task.status === "Open") {
      openTaskListArray.push(task);
    } else if (task.status === "In Progress") {
      inProgressTaskListArray.push(task);
    } else if (task.status === "Completed") {
      completedTaskListArray.push(task);
    }
  });

  const kanbanboardArray = [
    {
      status: "Open",
      tasks: openTaskListArray,
    },
    {
      status: "In Progress",
      tasks: inProgressTaskListArray,
    },
    {
      status: "Completed",
      tasks: completedTaskListArray,
    },
  ];

  const kanbanboardList = kanbanboardArray.map((kanbanItem) => {
    return <KanbanboardItem key={kanbanItem.status} kanbanItem={kanbanItem} />;
  });
  return (
    <div>
      {isLoading && (
        <div className="flex justify-center my-8">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-row flex-wrap justify-evenly items-start p-4">
          {kanbanboardList}
        </div>
      )}
    </div>
  );
};

export default Kanbanboard;
