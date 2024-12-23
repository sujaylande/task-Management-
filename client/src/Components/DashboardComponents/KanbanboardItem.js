import React, { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { BsFillEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllTasks } from "../../features/taskSlice";
import Spinner from "../ReusableComponents/Spinner";

const KanbanboardItem = ({ kanbanItem }) => {
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
  const taskList = kanbanItem?.tasks?.map((task, index) => {
    return (
      <div
        key={task?._id}
        className="flex flex-row flex-no-wrap justify-between items-center min-[320px]:w-[260px] sm:w-[360px] shadow-md p-2 rounded-md px-4"
      >
        <div className="flex flex-col flex-no-wrap justify-center items-start my-2">
          <p className="font-roboto text-lg font-normal py-2">{task?.title}</p>
          <p className="font-roboto text-[14px] font-normal py-2">
            Assigned to -{" "}
            <span className="font-roboto text-[16px] font-medium py-2">
              {task?.assignee?.name}
            </span>
          </p>
          <p className="font-roboto text-[14px] font-normal py-2">
            Due date -{" "}
            <span className="font-roboto text-[16px] font-medium py-2">
              {new Date(task?.dueDate).toDateString()}
            </span>
          </p>
        </div>
        <Link to={`/task/${task?._id}`}>
          <BsFillEyeFill size="20px" className="text-blue-500" />
        </Link>
      </div>
    );
  });
  return (
    <div>
      {isLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <div className="shadow-md shadow-blue-500/50 border border-gray-300 rounded-md p-4 my-2 flex flex-col flex-no-wrap justify-center items-center min-[320px]:w-[280px] sm:w-[400px]">
          <div className="flex flex-row flex-no-wrap justify-between items-center min-[320px]:w-[260px] sm:w-[360px]">
            <p className="font-roboto text-lg font-medium mb-4">
              {kanbanItem?.status} - {kanbanItem?.tasks?.length}
            </p>
            <button onClick={handleClickReload}>
              <BiRefresh size="25px" />
            </button>
          </div>
          <div className="flex flex-col flex-no-wrap">{taskList}</div>
        </div>
      )}
    </div>
  );
};

export default KanbanboardItem;
