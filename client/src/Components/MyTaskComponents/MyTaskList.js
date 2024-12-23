import React from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import MyTaskItem from "./MyTaskItem";

const MyTaskList = ({ taskListArray }) => {
  const navigate = useNavigate();

  if (taskListArray?.length === 0) {
    return (
      <div className="flex justify-center my-8">
        <p className="text-2xl font-medium">You don't have any tasks</p>
      </div>
    );
  }

  const TaskList = taskListArray?.map((task) => {
    return <MyTaskItem key={task._id} task={task} />;
  });
  return (
    <div className="flex flex-row flex-wrap justify-center items-center p-8">
      {TaskList}
      <div className="min-[320px]:hidden sm:hidden md:hidden lg:inline-block">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Priority</th>
              <th>View Task</th>
            </tr>
          </thead>
          <tbody>
            {taskListArray?.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{new Date(task.dueDate).toDateString()}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>
                  <button onClick={() => navigate(`/task/${task._id}`)}>
                    <BsFillEyeFill
                      className="text-blue-500 mx-2"
                      size={"25px"}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTaskList;
