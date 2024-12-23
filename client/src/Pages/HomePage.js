import React from "react";
import { useSelector } from "react-redux";
import DonutChart from "../Components/HomeComponents/DonutChart";
import TasksAssigneeWise from "../Components/HomeComponents/TasksAssigneeWise";
import { TasksPriorityWise } from "../Components/HomeComponents/TasksPriorityWise";
import TasksStausWise from "../Components/HomeComponents/TasksStausWise";
import TotalTasks from "../Components/HomeComponents/TotalTasks";

const HomePage = () => {
  const { tasks } = useSelector((state) => {
    return state?.task;
  });
  const { allUsers } = useSelector((state) => {
    return state?.user;
  });

  const openTasksArray = tasks?.filter((task) => {
    return task.status === "Open";
  });

  const inProgressTasksArray = tasks?.filter((task) => {
    return task.status === "In Progress";
  });

  const completedTasksArray = tasks?.filter((task) => {
    return task.status === "Completed";
  });

  const statusWiseTasks = {
    openTasksCount: openTasksArray?.length,
    inProgressTasksCount: inProgressTasksArray?.length,
    completedTasksCount: completedTasksArray?.length,
  };

  let p1PriorityTasks = 0;
  let p2PriorityTasks = 0;
  let p3PriorityTasks = 0;

  tasks?.forEach((task) => {
    if (task?.priority === "P1") {
      p1PriorityTasks++;
    } else if (task?.priority === "P2") {
      p2PriorityTasks++;
    } else {
      p3PriorityTasks++;
    }
  });

  const priorityWiseTasks = {
    p1PriorityTasks,
    p2PriorityTasks,
    p3PriorityTasks,
  };

  const chartData = {
    labels: ["Open", "In Progress", "Completed"],
    datasets: [
      {
        label: "Total Tasks",
        data: [
          statusWiseTasks?.openTasksCount,
          statusWiseTasks?.inProgressTasksCount,
          statusWiseTasks?.completedTasksCount,
        ],
        backgroundColor: ["#FF5733", "#3498DB", "#4CAF50"],
      },
    ],
    hoverOffset: 4,
  };

  const assigneeWiseTasks = [];

  allUsers?.forEach((user) => {
    const UserId = user?._id;
    const userName = user?.name;
    const userTasks = tasks?.filter((task) => {
      return task?.assignee?._id === UserId;
    });
    const obj = {
      userId: UserId,
      userName,
      userTasks,
    };
    assigneeWiseTasks.push(obj);
  });

  return (
    <div className="flex flex-row flex-wrap justify-evenly items-start p-6">
      <div className="flex flex-col flex-no-wrap justify-center items-center">
        <TotalTasks totalTasksCount={tasks?.length} />
        <DonutChart data={chartData} />
      </div>
      <div className="flex flex-col flex-no-wrap justify-center items-center">
        <TasksStausWise statusWiseTasks={statusWiseTasks} />
        <TasksPriorityWise priorityWiseTasks={priorityWiseTasks} />
      </div>
      <TasksAssigneeWise assigneeWiseTasks={assigneeWiseTasks} />
    </div>
  );
};

export default HomePage;
