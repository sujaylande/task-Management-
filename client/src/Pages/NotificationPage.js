import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationItem from "../Components/NotificationComponents/NotificationItem";
import Spinner from "../Components/ReusableComponents/Spinner";
import { deleteNotification, getAllNotifications } from "../features/userSlice";
import { AiFillDelete } from "react-icons/ai";
import { socket } from "../socket";

const NotificationPage = () => {
  const [notificationsArray, setNotificationsArray] = useState([]);
  const dispatch = useDispatch();
  const { isLoading, Token, user, allNotifications } = useSelector((state) => {
    return state.user;
  });

  const stableFetchNotifications = useCallback(() => {
    dispatch(getAllNotifications({ Token, UserId: user?._id }));
  }, [Token, dispatch, user?._id]);

  const handleSocketEvent = (data) => {
    setNotificationsArray((prevNotifications) => [...prevNotifications, data]);
  };

  useEffect(() => {
    stableFetchNotifications();
  }, [stableFetchNotifications]);

  const stableSaveNotifications = useCallback(() => {
    setNotificationsArray(allNotifications);
  }, [allNotifications]);

  useEffect(() => {
    stableSaveNotifications();
  }, [stableSaveNotifications]);

  useEffect(() => {
    socket.on("taskCreatedResponse", handleSocketEvent);
    socket.on("taskDeletedResponse", handleSocketEvent);
    socket.on("taskUpdatedResponse", handleSocketEvent);
    socket.on("statusUpdatedResponse", handleSocketEvent);

    return () => {
      // Clean up the event listeners when the component unmounts
      socket.off("taskCreatedResponse", handleSocketEvent);
      socket.off("taskDeletedResponse", handleSocketEvent);
      socket.off("taskUpdatedResponse", handleSocketEvent);
      socket.off("statusUpdatedResponse", handleSocketEvent);
    };
  }, []);

  const handleClickDelete = (NotificationId) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you Sure to Delete") === true) {
      dispatch(
        deleteNotification({ Token, NotificationId, UserId: user?._id })
      );
      setTimeout(() => {
        stableFetchNotifications();
      }, 100);
    }
  };

  if (notificationsArray?.length === 0) {
    return (
      <div className="flex justify-center my-8">
        <p className="text-2xl font-medium">You don't have Notifications</p>
      </div>
    );
  }

  const NotificationList = notificationsArray?.map((notification) => {
    return (
      <NotificationItem key={notification?._id} notification={notification} />
    );
  });
  return (
    <div>
      {!isLoading && (
        <div className="flex flex-row flex-wrap justify-center items-center p-8">
          {NotificationList}
          <div className="min-[320px]:hidden sm:hidden md:hidden lg:inline-block">
            <table>
              <thead>
                <tr>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {notificationsArray?.map((notification) => (
                  <tr key={notification?._id}>
                    <td>{notification?.message}</td>
                    <td>
                      {new Date(notification?.date).toDateString()} at{" "}
                      {new Date(notification?.date).toLocaleTimeString()}
                    </td>
                    <td>
                      <button
                        onClick={() => handleClickDelete(notification?._id)}
                      >
                        <AiFillDelete size={"25px"} className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center my-8">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
