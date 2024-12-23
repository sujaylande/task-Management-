import React, { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllTasks } from "../../features/taskSlice";
import Spinner from "../ReusableComponents/Spinner";

const TasksStausWise = ({ statusWiseTasks }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { Token } = useSelector((state) => {
    return state?.user;
  });
  const dispatch = useDispatch();

  const handleClickReload = () => {
    setIsLoading(true);
    dispatch(getAllTasks({ Token }));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <div className="shadow-md shadow-blue-500/50 border border-gray-300 rounded-md p-4 my-2 flex flex-col flex-no-wrap justify-center items-center min-[320px]:w-[280px] sm:w-[400px]">
      <div className="flex flex-row flex-no-wrap justify-between items-center min-[320px]:w-[260px] sm:w-[360px] min-[320px]:mb-6 sm:mb-8">
        <p className="font-roboto text-lg font-medium">
          All Tasks - Status Wise
        </p>
        <button onClick={handleClickReload}>
          <BiRefresh size="25px" />
        </button>
      </div>
      {isLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col flex-no-wrap">
          <div className="flex flex-row flex-no-wrap justify-between items-center min-[320px]:w-[260px] sm:w-[360px] shadow-md p-2 rounded-md bg-orange-100 mb-2 ">
            <div className="flex flex-col flex-no-wrap justify-center items-start my-4 px-2">
              <p className="font-roboto text-lg font-normal">Status - Open</p>
              <p className="font-roboto text-md font-medium">
                {statusWiseTasks.openTasksCount}
              </p>
            </div>
            <Link to={"/all-tasks/open"} className="px-2">
              <BsFillEyeFill size="20px" className="text-blue-500" />
            </Link>
          </div>
          <div className="flex flex-row flex-no-wrap justify-between items-center min-[320px]:w-[260px] sm:w-[360px] shadow-md p-2 rounded-md bg-blue-100 mb-2">
            <div className="flex flex-col flex-no-wrap justify-center items-start my-4 px-2">
              <p className="font-roboto text-lg font-normal">
                Status - In Progress
              </p>
              <p className="font-roboto text-md font-medium">
                {statusWiseTasks.inProgressTasksCount}
              </p>
            </div>
            <Link to={"/all-tasks/in-progress"} className="px-2">
              <BsFillEyeFill size="20px" className="text-blue-500" />
            </Link>
          </div>
          <div className="flex flex-row flex-no-wrap justify-between items-center min-[320px]:w-[260px] sm:w-[360px] shadow-md p-2 rounded-md bg-green-100 mb-2">
            <div className="flex flex-col flex-no-wrap justify-center items-start my-4 px-2">
              <p className="font-roboto text-lg font-normal">
                Status - Completed
              </p>
              <p className="font-roboto text-md font-medium">
                {statusWiseTasks.completedTasksCount}
              </p>
            </div>
            <Link to={`/all-tasks/complete`} className="px-2">
              <BsFillEyeFill size="20px" className="text-blue-500" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksStausWise;
