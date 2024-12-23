import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../Components/ReusableComponents/Input";
import { updateUserProfile } from "../features/userSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, Token } = useSelector((state) => state.user);

  let schema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string()
      .email("Email Should be Valid")
      .required("Email is Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(updateUserProfile({ body: values, Token: Token }));
    },
  });
  return (
    <div className="flex flex-col flex-wrap justify-center items-center">
      <p className="font-roboto font-normal text-center text-2xl m-6">
        You can update your Profile
      </p>
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
        <div className="flex flex-row flex-no-wrap justify-between items-center">
          <button
            type="submit"
            style={{ boxShadow: "8px 8px 4px #0D103C" }}
            className="bg-[#fff] w-[135px] h-[75px] text-[#0D103C] rounded-[20px] font-roboto font-bold text-2xl px-4 mx-4 mt-4 mb-8"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
