import { useFormik } from "formik";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerUser } from "../features/userSlice";
import Input from "./ReusableComponents/Input";
import Spinner from "./ReusableComponents/Spinner";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, registeredUser, res } = useSelector((state) => {
    return state.user;
  });
  let schema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string()
      .email("Email Should be Valid")
      .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const stableEffect = useCallback(() => {
    if (registeredUser !== undefined && res?.success) {
      navigate("/signin");
    }
  }, [navigate, registeredUser, res?.success]);

  useEffect(() => {
    stableEffect();
  }, [stableEffect]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
      formik.resetForm();
    },
  });
  return (
    <div className="flex flex-col flex-wrap justify-center items-center">
      <p className="font-roboto font-bold text-3xl m-6 my-8">Create Account</p>
      {isLoading && (
        <div className="flex justify-center my-8">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <form
          onSubmit={formik.handleSubmit}
          style={{
            background: "linear-gradient(180deg, #ACE7FF 0%, #53FFB8 100%)",
          }}
          className="flex flex-col flex-no-wrap justify-center items-center min-[320px]:w-[280px] sm:w-[360px] rounded-[25px] pt-6 "
        >
          <Input
            className=" min-[320px]:w-[250px] sm:w-[300px] h-[60px]  px-4 mx-4 my-4"
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
          />
          <div className="text-black font-bold text-lg">
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>

          <Input
            className=" min-[320px]:w-[250px] sm:w-[300px] h-[60px]  px-4 mx-4 my-4"
            id="email"
            type="text"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
          />
          <div className="text-black font-bold text-lg">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <Input
            className=" min-[320px]:w-[250px] sm:w-[300px] h-[60px]  px-4 mx-4 my-4"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
          />
          <div className="text-black font-bold text-lg">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="flex flex-row flex-no-wrap justify-between items-center">
            <button
              type="button"
              onClick={() => formik.resetForm()}
              style={{ boxShadow: "8px 8px 4px #0D103C" }}
              className="bg-[#fff] w-[100px] h-[60px] font-roboto font-bold  text-[#0D103C] text-xl rounded-[20px] px-4 mx-4 mt-4 mb-8"
            >
              Reset
            </button>
            <button
              type="submit"
              style={{ boxShadow: "8px 8px 4px #0D103C" }}
              className="bg-[#fff] w-[100px] h-[60px] font-roboto font-bold  text-[#0D103C] text-xl rounded-[20px] px-4 mx-4 mt-4 mb-8"
            >
              Register
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;
