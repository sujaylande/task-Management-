import React, { useCallback, useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { BsFillBellFill, BsFillPersonFill } from "react-icons/bs";
import { SiPolymerproject } from "react-icons/si";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { socket } from "../socket";

const Header = () => {
  const { user } = useSelector((state) => {
    return state.user;
  });
  const [notificationAlert, setNotificationAlert] = useState(false);

  const stableEffect = useCallback(() => {
    socket.on("taskCreatedResponse", (data) => {
      setNotificationAlert(true);
    });
    socket.on("taskDeletedResponse", (data) => {
      setNotificationAlert(true);
    });
    socket.on("taskUpdatedResponse", (data) => {
      setNotificationAlert(true);
    });
    socket.on("statusUpdatedResponse", (data) => {
      setNotificationAlert(true);
    });
  }, []);

  useEffect(() => {
    stableEffect();
  }, [stableEffect]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.pathname = "/";
    toast.info("Logged Out Successfully");
  };

  return (
    <nav>
      <div className="flex flex-row flex-wrap justify-evenly items-center pt-2 pb-1 shadow-md">
        <Link to="/" className="mb-2 min-[320px]:hidden sm:inline-block">
          <div className="flex flex-row flex-no-wrap justify-center items-center text-blue-500">
            <SiPolymerproject size={"25px"} className="mx-2" />
            <p className="font-roboto font-bold text-2xl mx-1 ">Task Management App</p>
          </div>
        </Link>
        <div className=" flex flex-row flex-wrap justify-evenly items-center sm:min-w-[400px] md:min-w-[600px] mb-2">
          <Link to="/my-tasks">
            <p className="font-roboto font-medium text-xl m-2">My Tasks</p>
          </Link>
          <Link to="/dashboard">
            <p className="font-roboto font-medium text-xl m-2">Dashboard</p>
          </Link>
          <Link to="/create-task">
            <p className="font-roboto font-medium text-xl m-2">Create Task</p>
          </Link>
        </div>
        <div className="flex flex-row flex-no-wrap justify-evenly items-center mb-2">
          <Link
            to={"/"}
            className="my-2 mx-4 min-[320px]:inline-block sm:inline-block md:hidden lg:hidden xl:hidden"
          >
            <AiFillHome size={"30px"} />
          </Link>
          <Link to="/notifications" className="my-2 mx-4 relative">
            {notificationAlert && (
              <div
                className="flex justify-center"
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "10px",
                  backgroundColor: "blue",
                  position: "absolute",
                  left: "16px",
                  bottom: "16px",
                }}
              >
                <p className="text-white font-bold">1</p>
              </div>
            )}
            <BsFillBellFill
              onClick={() => setNotificationAlert(false)}
              size={"25px"}
            />
          </Link>
          <Link
            to={user === null ? "/signin" : "/my-profile"}
            className="my-2 mx-4"
          >
            {user === null ? (
              <BsFillPersonFill size={"30px"} />
            ) : (
              <div className="w-[40px] h-[40px] bg-blue-200 flex row justify-center items-center rounded-full">
                <p className="font-roboto font-bold text-xl text-center">
                  {user?.name?.substr(0, 1)}
                </p>
              </div>
            )}
          </Link>
          {user !== null && (
            <button
              className="font-roboto font-bold text-xl text-center mx-4"
              onClick={handleLogout}
            >
              <BiLogOutCircle size={"35px"} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
