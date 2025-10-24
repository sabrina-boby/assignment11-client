import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddTutorials from "../pages/AddTutorials/AddTutorials";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import FindTutors from "../pages/FindTutors/FindTutors";
import TutorDetails from "../pages/FindTutors/TutorDetails";
import MyBookedTutors from "../pages/MyBookedTutors/MyBookedTutors";
import MyTutorials from "../pages/MyTutorials/MyTutorials";
import UpdateTutorial from "../pages/MyTutorials/UpdateTutorial";
import LanguageCategory from "../pages/Home/LanguageCategory";
import FindTutorsByLanguage from "../pages/Home/FindTutorsByLanguage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/find-tutors/:language",
        element: (
            <FindTutorsByLanguage></FindTutorsByLanguage>
        ),
      },
      {
        path: "/add-tutorials",
        element: (
          <PrivateRoute>
            <AddTutorials></AddTutorials>
          </PrivateRoute>
        ),
      },
      {
        path: "/tutor/:id",
        element: (
          <PrivateRoute>
            <TutorDetails></TutorDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/find-tutors",
        element: <FindTutors></FindTutors>,
      },
      {
        path: "/my-booked-tutors",
        element: (
          <PrivateRoute>
            <MyBookedTutors></MyBookedTutors>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-tutorials",
        element: (
          <PrivateRoute>
            <MyTutorials></MyTutorials>
          </PrivateRoute>
        ),
      },
       {
        path: "/update-tutorial/:id",
        element: (
            <UpdateTutorial></UpdateTutorial>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "*",
        Component: <ErrorPage></ErrorPage>,
      },
    ],
  },
]);
