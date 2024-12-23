import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./Components/MainLayout";
import MyTaskDetail from "./Components/MyTaskComponents/MyTaskDetail";
import UpdateTask from "./Components/UpdateTask/UpdateTask";
import ViewAllMyTasks from "./Components/ViewTasksComponent/ViewAllMyTasks";
import ViewAllPriorityTasks from "./Components/ViewTasksComponent/ViewAllPriorityTasks";
import ViewAllStausTasks from "./Components/ViewTasksComponent/ViewAllStausTasks";
import ViewAllTasks from "./Components/ViewTasksComponent/ViewAllTasks";
import { getAllTasks } from "./features/taskSlice";
import { getAllUsers } from "./features/userSlice";
import CreateTaskPage from "./Pages/CreateTaskPage";
import DashboardPage from "./Pages/DashboardPage";
import HomePage from "./Pages/HomePage";
import MyTaskPage from "./Pages/MyTaskPage";
import NotificationPage from "./Pages/NotificationPage";
import ProfilePage from "./Pages/ProfilePage";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";
import ViewTasksPage from "./Pages/ViewTasksPage";
import { PrivateRoute } from "./Routing/PrivateRoute";
import ViewAllAssigneeTasks from "./Components/ViewTasksComponent/ViewAllAssigneeTasks";
import { socket } from "./socket";

const App = () => {
  const dispatch = useDispatch();
  const { Token } = useSelector((state) => {
    return state.user;
  });

  const handleSocketEvent = useCallback(() => {
    dispatch(getAllTasks({ Token }));
  }, [Token, dispatch]);

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
  }, [handleSocketEvent]);

  const stableDispatch = useCallback(() => {
    dispatch(getAllTasks({ Token: Token }));
    dispatch(getAllUsers({ Token }));
  }, [Token, dispatch]);

  useEffect(() => {
    stableDispatch();
  }, [stableDispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="my-tasks"
            element={
              <PrivateRoute>
                <MyTaskPage />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={
                <PrivateRoute>
                  <ViewAllMyTasks />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="task/:id"
            element={
              <PrivateRoute>
                <MyTaskDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="create-task"
            element={
              <PrivateRoute>
                <CreateTaskPage />
              </PrivateRoute>
            }
          />
          <Route
            path="update-task/:id"
            element={
              <PrivateRoute>
                <UpdateTask />
              </PrivateRoute>
            }
          />
          <Route
            path="notifications"
            element={
              <PrivateRoute>
                <NotificationPage />
              </PrivateRoute>
            }
          />
          <Route path="signin" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route
            path="my-profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="all-tasks"
            element={
              <PrivateRoute>
                <ViewTasksPage />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={
                <PrivateRoute>
                  <ViewAllTasks />
                </PrivateRoute>
              }
            />
            <Route
              path=":status"
              element={
                <PrivateRoute>
                  <ViewAllStausTasks />
                </PrivateRoute>
              }
            />
            <Route
              path="priority/:priority"
              element={
                <PrivateRoute>
                  <ViewAllPriorityTasks />
                </PrivateRoute>
              }
            />
            <Route
              path="assignee/:assigneeId"
              element={
                <PrivateRoute>
                  <ViewAllAssigneeTasks />
                </PrivateRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
