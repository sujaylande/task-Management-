import React, { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTasks } from "../../features/taskSlice";
import Spinner from "../ReusableComponents/Spinner";

const TotalTasks = ({ totalTasksCount }) => {
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

  const navigate = useNavigate();
  return (
    <div className="shadow-md shadow-blue-500/50 border border-gray-300 rounded-md p-4 my-2 flex flex-col flex-no-wrap justify-center items-center min-[320px]:w-[280px] sm:w-[400px]">
      <div className="flex flex-row flex-no-wrap justify-between items-center min-[320px]:w-[260px] sm:w-[360px] min-[320px]:mb-6 sm:mb-8">
        <p className="font-roboto text-lg font-medium">
          Total Count of Tasks created
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
        <div className="flex flex-row flex-no-wrap justify-between items-center min-[320px]:w-[260px] sm:w-[360px]">
          <div className="flex flex-col flex-no-wrap justify-center items-center my-2">
            <p className="font-roboto text-lg font-normal">Total</p>
            <p className="font-roboto text-md font-medium">{totalTasksCount}</p>
          </div>
          <button
            className="bg-blue-300 py-2 px-4 rounded-md my-2"
            onClick={() => navigate("/all-tasks")}
          >
            <p className="font-roboto font-medium text-sm">View All</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default TotalTasks;
