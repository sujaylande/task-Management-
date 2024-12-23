import { useFormik } from "formik";
import React, { useCallback, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { deleteTask, getTask, updateTask } from "../../features/taskSlice";
import { socket } from "../../socket";
import Spinner from "../ReusableComponents/Spinner";

const MyTaskDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const TaskId = location.pathname.split("/")[2];

  const { Token, user, allUsers } = useSelector((state) => {
    return state.user;
  });
  const { gotTask, isLoading, isSuccess } = useSelector((state) => {
    return state.task;
  });

  const usersArray = [];
  allUsers?.forEach((user) => {
    const obj = {
      user: user?._id,
    };
    usersArray.push(obj);
  });

  let schema = Yup.object().shape({
    status: Yup.string().required("Status is Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      status: gotTask?.status || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(updateTask({ body: values, Token: Token, TaskId }));
      if (values?.status === "In Progress") {
        socket.emit("statusUpdated", {
          users: usersArray,
          message: `${user?.name} started implementing ${gotTask?.title} Task`,
          date: Date.now(),
        });
      } else if (values?.status === "Completed") {
        socket.emit("statusUpdated", {
          users: usersArray,
          message: `${user?.name} has Completed ${gotTask?.title} Task`,
          date: Date.now(),
        });
      }
      setTimeout(() => {
        if (isSuccess) {
          navigate(-1);
        }
      }, 100);
    },
  });

  const stableDispatch = useCallback(() => {
    dispatch(getTask({ TaskId, Token }));
  }, [TaskId, Token, dispatch]);
  useEffect(() => {
    stableDispatch();
  }, [stableDispatch]);

  const handleClickDelete = (TaskId) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you Sure to Delete") === true) {
      dispatch(deleteTask({ Token, TaskId }));
      socket.emit("taskDeleted", {
        users: usersArray,
        message: `${gotTask?.title} is Deleted by ${user?.name}`,
        date: Date.now(),
      });
      setTimeout(() => {
        if (isSuccess) {
          navigate(-1);
        }
      }, 100);
    }
  };

  return (
    <div className="flex flex-col flex-no-wrap justify-center items-center">
      {isLoading && (
        <div className="flex justify-center my-8">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col flex-no-wrap justify-center items-center min-[320px]:w-[300px] sm:w-[500px] md:w-[700px] my-8 p-4 shadow-md shadow-blue-500">
          <div className="flex flex-row flex-wrap justify-between items-center min-[320px]:w-[280px] sm:w-[480px] md:w-[680px] px-2 mb-4">
            <p className="font-roboto text-xl font-medium py-2 w-[50%]">
              {gotTask?.title}
            </p>
            {gotTask?.assignee?._id === user?._id ||
            user?.role === "admin" ||
            gotTask?.creator?._id === user?._id ? (
              <div className="flex flex-row flex-no-wrap justify-betweeen items-center py-2">
                <Link to={`/update-task/${gotTask?._id}`} className="mx-6">
                  <BiEdit size={"25px"} />
                </Link>
                <button onClick={() => handleClickDelete(gotTask?._id)}>
                  <AiFillDelete size={"25px"} className="text-red-500" />
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col flex-no-wrap justify-center items-start min-[320px]:w-[270px] sm:w-[460px] md:w-[660px] px-4 py-2 mb-4 shadow-md border border-gray-200 ">
            <p className="font-roboto text-lg font-normal py-2">
              {gotTask?.description}
            </p>
            <p className="font-roboto text-lg font-normal py-2">
              Status -{" "}
              <span className="font-roboto text-lg font-medium py-2">
                {gotTask?.status}
              </span>
            </p>
            <p className="font-roboto text-lg font-normal py-2">
              Priority -{" "}
              <span className="font-roboto text-lg font-medium py-2">
                {gotTask?.priority}
              </span>
            </p>
            <div className="flex flex-row flex-wrap justify-between items-center md:w-[500px]">
              <p className="font-roboto text-lg font-normal py-2">
                Creation Date -{" "}
                <span className="font-roboto text-lg font-medium py-2">
                  {new Date(gotTask?.creationDate).toDateString()}
                </span>
              </p>
              <p className="font-roboto text-lg font-normal py-2">
                Due Date -{" "}
                <span className="font-roboto text-lg font-medium py-2">
                  {new Date(gotTask?.dueDate).toDateString()}
                </span>
              </p>
            </div>
            <div className="flex flex-row flex-wrap justify-between items-center md:w-[500px]">
              <p className="font-roboto text-lg font-normal py-2">
                Assignee -{" "}
                <span className="font-roboto text-lg font-medium py-2">
                  {gotTask?.assignee?.name}
                </span>
              </p>
              <p className="font-roboto text-lg font-normal py-2">
                Creator-{" "}
                <span className="font-roboto text-lg font-medium py-2">
                  {gotTask?.creator?.name}
                </span>
              </p>
            </div>
            {gotTask?.assignee?._id === user?._id || user?.role === "admin" ? (
              <div className="flex flex-row flex-wrap justify-between items-center md:w-[580px]">
                <div className="font-roboto text-lg font-normal py-2 flex flex-row flex-wrap justify-start items-center">
                  <p className="font-roboto text-lg font-normal py-2">
                    Change Staus :{" "}
                  </p>
                  <select
                    className="border border-gray-500 min-[320px]:w-[170px] sm:w-[170px] h-[40px] font-roboto font-[400] text-md rounded-[15px] px-4 pr-8 m-2"
                    id="status"
                    type="text"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange("status")}
                    onBlur={formik.handleBlur("status")}
                  >
                    <option defaultValue>{gotTask?.status}</option>
                    {gotTask?.status !== "Open" && (
                      <option value={"Open"}>Open</option>
                    )}
                    {gotTask?.status !== "In Progress" && (
                      <option value={"In Progress"}>In Progress</option>
                    )}
                    {gotTask?.status !== "Completed" && (
                      <option value={"Completed"}>Completed</option>
                    )}
                  </select>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          {gotTask?.assignee?._id === user?._id || user?.role === "admin" ? (
            <button
              type="button"
              className="bg-blue-500 px-4 py-2 rounded-md"
              onClick={formik.handleSubmit}
            >
              <p className="font-roboto text-md">Save</p>
            </button>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default MyTaskDetail;
