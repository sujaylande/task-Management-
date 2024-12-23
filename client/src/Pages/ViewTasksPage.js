import React from "react";
import { Outlet } from "react-router-dom";

const ViewTasksPage = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ViewTasksPage;
