import { useFormik } from "formik";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { getTask, updateTask } from "../../features/taskSlice";
import { socket } from "../../socket";
import Input from "../ReusableComponents/Input";
import Spinner from "../ReusableComponents/Spinner";

const UpdateTask = () => {
  const dispatch = useDispatch();
  const { isLoading, Token, allUsers, user } = useSelector((state) => {
    return state.user;
  });
  const location = useLocation();
  const navigate = useNavigate();
  const TaskId = location.pathname.split("/")[2];

  const stableDispatch = useCallback(() => {
    dispatch(getTask({ Token, TaskId }));
  }, [TaskId, Token, dispatch]);

  useEffect(() => {
    stableDispatch();
  }, [stableDispatch]);

  const usersArray = [];
  allUsers?.forEach((user) => {
    const obj = {
      user: user?._id,
    };
    usersArray.push(obj);
  });

  const { gotTask, isSuccess } = useSelector((state) => {
    return state.task;
  });

  let schema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    description: Yup.string().required("Description is Required"),
    assignee: Yup.string().required("Assignee is Required"),
    creator: Yup.string().required("Creator is Required"),
    priority: Yup.string().required("Priority is Required"),
    status: Yup.string().required("Status is Required"),
    creationDate: Yup.date().required("Creation date is Required"),
    dueDate: Yup.date().required("Due date is Required"),
  });

  const correctDateFormat = (inputDate) => {
    const [year, month, day] = inputDate.split("-");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };
  const changeDateFormat = (date) => {
    const newDate = new Date(date)?.toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    const inputDate = [year, month, day].join("-");
    return correctDateFormat(inputDate);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: gotTask?.title || "",
      description: gotTask?.description || "",
      assignee: gotTask?.assignee?._id || "",
      creator: gotTask?.creator?._id || "",
      priority: gotTask?.priority || "",
      status: gotTask?.status || "",
      creationDate: changeDateFormat(gotTask?.creationDate) || "",
      dueDate: changeDateFormat(gotTask?.dueDate) || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(updateTask({ body: values, Token, TaskId }));
      socket.emit("taskUpdated", {
        users: usersArray,
        message: `${values?.title} Task is Updated by ${user?.name}`,
        date: Date.now(),
      });
      setTimeout(() => {
        if (isSuccess) {
          navigate(-1);
        }
      }, 100);
      formik.handleReset();
    },
  });

  return (
    <div>
      {!isLoading ? (
        <div className="flex flex-col flex-no-wrap justify-center items-center">
          <p className="font-roboto font-medium text-2xl mx-2 mb-2 mt-4">
            Update Task
          </p>
          <form
            className="my-4 flex flex-col flex-no-wrap justify-center items-center min-[320px]:w-[280px] sm:w-[400px] md:w-[580px] rounded-[25px] pt-6 mx-4"
            onSubmit={formik.handleSubmit}
            style={{
              background: "linear-gradient(180deg, #ACE7FF 0%, #53FFB8 100%)",
            }}
          >
            <div className="flex flex-row flex-wrap justify-evenly items-start">
              <div>
                <Input
                  className=" min-[320px]:w-[250px] sm:w-[250px] text-[#141414] h-[60px] font-roboto font-[400] text-xl rounded-[15px] px-4 pr-8 m-4"
                  id="title"
                  type="text"
                  placeholder="Enter Title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                />
                <div className="text-black font-bold text-lg text-center">
                  {formik.touched.title && formik.errors.title ? (
                    <div>{formik.errors.title}</div>
                  ) : null}
                </div>
              </div>
              <div>
                <Input
                  className="min-[320px]:w-[250px] sm:w-[250px] h-[60px] font-roboto font-[400] text-xl rounded-[15px] px-4 py-2 pr-8 m-4"
                  id="description"
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                />
                <div className="text-black font-bold text-lg text-center">
                  {formik.touched.description && formik.errors.description ? (
                    <div>{formik.errors.description}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex flex-row flex-wrap justify-evenly items-center">
              {gotTask?.creator?._id === user?._id || user?.role === "admin" ? (
                <div>
                  <select
                    className="min-[320px]:w-[250px] sm:w-[250px] h-[60px] font-roboto font-[400] text-xl rounded-[15px] px-4 pr-8 m-4"
                    id="assignee"
                    type="text"
                    name="assignee"
                    value={formik.values.assignee}
                    onChange={formik.handleChange("assignee")}
                    onBlur={formik.handleBlur("assignee")}
                  >
                    <option defaultValue={gotTask?.assignee?._id}>
                      {gotTask?.assignee?.name}
                    </option>
                    {allUsers?.map((user) => {
                      if (user?.name !== gotTask?.assignee?.name) {
                        return (
                          <option key={user._id} value={user._id}>
                            {user.name}
                          </option>
                        );
                      }
                    })}
                  </select>
                  <div className="text-black font-bold text-lg text-center">
                    {formik.touched.assignee && formik.errors.assignee ? (
                      <div>{formik.errors.assignee}</div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="flex flex-row flex-wrap justify-evenly items-center">
              <div>
                <select
                  className="min-[320px]:w-[250px] sm:w-[250px] h-[60px] font-roboto font-[400] text-xl rounded-[15px] px-4 pr-8 m-4"
                  id="priority"
                  type="text"
                  name="priority"
                  value={formik.values.priority}
                  onChange={formik.handleChange("priority")}
                  onBlur={formik.handleBlur("priority")}
                >
                  <option value="">Select Priority</option>
                  <option value={"P1"}>P1</option>
                  <option value={"P2"}>P2</option>
                  <option value={"P3"}>P3</option>
                </select>
                <div className="text-black font-bold text-lg text-center">
                  {formik.touched.priority && formik.errors.priority ? (
                    <div>{formik.errors.priority}</div>
                  ) : null}
                </div>
              </div>
              <div>
                <select
                  className="min-[320px]:w-[250px] sm:w-[250px] h-[60px] font-roboto font-[400] text-xl rounded-[15px] px-4 pr-8 m-4"
                  id="status"
                  type="text"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange("status")}
                  onBlur={formik.handleBlur("status")}
                >
                  <option value="">Select Status</option>
                  <option value={"Open"}>Open</option>
                  <option value={"In Progress"}>In Progress</option>
                  <option value={"Completed"}>Completed</option>
                </select>
                <div className="text-black font-bold text-lg text-center">
                  {formik.touched.status && formik.errors.status ? (
                    <div>{formik.errors.status}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex flex-row flex-wrap justify-evenly items-center">
              <div>
                <div className="text-left mx-6">
                  <p className="font-roboto text-md mt-2 text-gray-700">
                    Creation Date :
                  </p>
                </div>
                <Input
                  className="form-control w-[250px] h-[60px] px-4 mx-4 my-2"
                  id="creationDate"
                  type="date"
                  placeholder="Creation Date"
                  name="creationDate"
                  value={formik.values.creationDate}
                  onChange={formik.handleChange("creationDate")}
                  onBlur={formik.handleBlur("creationDate")}
                />
                <div className="text-black font-bold text-lg text-center">
                  {formik.touched.creationDate && formik.errors.creationDate ? (
                    <div>{formik.errors.creationDate}</div>
                  ) : null}
                </div>
              </div>
              <div>
                <div>
                  <div className="text-left mx-6">
                    <p className="font-roboto text-md mt-2 text-gray-700">
                      Due Date :
                    </p>
                  </div>
                  <Input
                    className="form-control w-[250px] h-[60px] px-4 mx-4 my-2"
                    id="dueDate"
                    type="date"
                    placeholder="Due Date"
                    name="dueDate"
                    value={formik.values.dueDate}
                    onChange={formik.handleChange("dueDate")}
                    onBlur={formik.handleBlur("dueDate")}
                  />
                  <div className="text-black font-bold text-lg text-center">
                    {formik.touched.dueDate && formik.errors.dueDate ? (
                      <div>{formik.errors.dueDate}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row flex-wrap min-[320px]:w-[280px] sm:w-[500px] md:w-[560px] justify-between items-center mb-4">
              <button
                onClick={() => formik.resetForm()}
                type="button"
                style={{ boxShadow: "8px 8px 4px #0D103C" }}
                className="bg-[#fff] w-[100px] h-[60px] font-roboto font-bold  text-[#0D103C] text-xl rounded-[20px] px-4 mx-4 mt-4 mb-4"
              >
                Reset
              </button>
              <button
               
                type="submit"
                style={{ boxShadow: "8px 8px 4px #0D103C" }}
                className="bg-[#fff] w-[100px] h-[60px] font-roboto font-bold  text-[#0D103C] text-xl rounded-[20px] px-4 mx-4 mt-4 mb-4"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex jusfity-center my-8">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default UpdateTask;
