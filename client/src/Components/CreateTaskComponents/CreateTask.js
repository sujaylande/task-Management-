import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createATask } from "../../features/taskSlice";
import { getUser } from "../../features/userSlice";
import { socket } from "../../socket";
import { base_url } from "../../utils/base_url";
import Input from "../ReusableComponents/Input";
import Spinner from "../ReusableComponents/Spinner";

const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, Token, allUsers, user, isSuccess } = useSelector(
    (state) => {
      return state.user;
    }
  );

  const usersArray = [];
  allUsers?.forEach((user) => {
    const obj = {
      user: user?._id,
    };
    usersArray.push(obj);
  });

  const notifyCreatedTask = async (values) => {
    const response = await axios.get(
      `${base_url}/user/get/${values?.assignee}`,
      {
        headers: {
          Authorization: `Bearer ${Token !== null ? Token : ""}`,
          Accept: "application/json",
        },
      }
    );
    const { gotUser } = response?.data;
    socket.emit("taskCreated", {
      users: usersArray,
      message: `${values?.title} Task is assigned to ${gotUser?.name} by ${user?.name}`,
      date: Date.now(),
    });
  };

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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      assignee: "",
      creator: user?._id,
      priority: "",
      status: "Open",
      creationDate: "",
      dueDate: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createATask({ body: values, Token: Token }));
      notifyCreatedTask(values);
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
      {isLoading && (
        <div className="flex justify-center my-8">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col flex-no-wrap justify-center items-center">
          <p className="font-roboto font-medium text-2xl mx-2 mb-2 mt-4">
            Create Task
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
                  <option defaultValue={""} value="">
                    Select Assignee
                  </option>
                  {allUsers?.map((user) => {
                    return (
                      <option key={user?._id} value={user?._id}>
                        {user?.name}
                      </option>
                    );
                  })}
                </select>
                <div className="text-black font-bold text-lg text-center">
                  {formik.touched.assignee && formik.errors.assignee ? (
                    <div>{formik.errors.assignee}</div>
                  ) : null}
                </div>
              </div>
  
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
            </div>
            <div className="flex flex-row flex-wrap justify-evenly items-center">
              {/*For Priority */}
              {/* <div>
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
              </div> */}
              {/*For Status */}
              {/* <div>
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
              </div> */}
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
                // style={{
                //   background:
                //     "linear-gradient(90deg, #4DD4FF 0%, #F5F5F5 100%)",
                // }}
                onClick={() => formik.resetForm()}
                type="button"
                style={{ boxShadow: "8px 8px 4px #0D103C" }}
                className="bg-[#fff] w-[100px] h-[60px] font-roboto font-bold  text-[#0D103C] text-xl rounded-[20px] px-4 mx-4 mt-4 mb-4"
              >
                Reset
              </button>
              <button
                // style={{
                //   background:
                //     "linear-gradient(90deg, #4DD4FF 0%, #F5F5F5 100%)",
                // }}
                type="submit"
                style={{ boxShadow: "8px 8px 4px #0D103C" }}
                className="bg-[#fff] w-[100px] h-[60px] font-roboto font-bold  text-[#0D103C] text-xl rounded-[20px] px-4 mx-4 mt-4 mb-4"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
