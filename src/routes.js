import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import DetailNews from "./pages/DetailNews";
import EmailActivate from "./pages/EmailActivate";
import ErrorValidate from "./pages/ErrorValidate";
import ForgotPassword from "./pages/ForgotPassword";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ValidateAccount from "./pages/ValidateAccount";

const cookies = new Cookies();
const routes = [
  {
    path: "/",
    exact: true,
    main: () => {
      const role = cookies.get("role");
      if (role === "doctor") {
        return <Index />;
      } else if (role === "patient") {
        return <Index />;
      } else {
        return <Index />;
      }
    },
  },
  {
    path: "/news/:id",
    exact: true,
    main: (props) => {
      return <DetailNews {...props}/>
    },
  },
  {
    path: "/login",
    exact: true,
    main: () => {
      return !cookies.get("role") ? <Login /> : <Redirect to="/" />;
    },
  },
  {
    path: "/register",
    exact: true,
    main: () => {
      return !cookies.get("role") ? <Register /> : <Redirect to="/" />;
    },
  },
  {
    path: "/forgot-password",
    exact: true,
    main: () => {
      return !cookies.get("role") ? <ForgotPassword /> : <Redirect to="/" />;
    },
  },
  {
    path: "/forgot-password/email-activate",
    exact: true,
    main: () => {
      return !cookies.get("role") ? <EmailActivate /> : <Redirect to="/" />;
    },
  },
  {
    path: "/forgot-password/reset-password",
    exact: true,
    main: () => {
      return !cookies.get("role") ? <ResetPassword /> : <Redirect to="/" />;
    },
  },
  {
    path: "/register/email-activate",
    exact: true,
    main: () => {
      return !cookies.get("role") ? <EmailActivate /> : <Redirect to="/" />;
    },
  },
  {
    path: "/register/activate-account",
    exact: true,
    main: () => {
      return !cookies.get("role") ? <ValidateAccount /> : <Redirect to="/" />;
    },
  },
  {
    path: "/register/activate-account/error",
    exact: true,
    main: () => {
      return !cookies.get("role") ? <ErrorValidate /> : <Redirect to="/" />;
    },
  },
];

export default routes;