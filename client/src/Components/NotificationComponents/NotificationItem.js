import React from "react";

const NotificationItem = ({ notification }) => {
  return (
    <div>
      <div className="lg:hidden shadow-md shadow-blue-500/50 border border-gray-300 rounded-md min-[320px]:w-[280px] sm:w-[300px] p-4 my-2 flex flex-col flex-no-wrap justify-center items-center m-4">
        <div className="flex flex-row flex-wrap justify-between items-center">
          <p className="font-roboto text-sm font-normal py-2">
            Message -{" "}
            <span className="font-roboto text-sm font-medium py-2">
              {notification?.message}
            </span>
          </p>
          <p className="font-roboto text-sm font-normal py-2">
            Date -{" "}
            <span className="font-roboto text-sm font-medium py-2">
              {new Date(notification?.date).toDateString()} at{" "}
              {new Date(notification?.date).toLocaleTimeString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
