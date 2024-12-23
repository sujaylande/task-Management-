import React from "react";
import { Outlet } from "react-router-dom";

const MyTaskPage = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MyTaskPage;
