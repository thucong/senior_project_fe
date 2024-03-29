import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import DetailNews from "./pages/DetailNews";
import EmailActivate from "./pages/EmailActivate";
import ErrorValidate from "./pages/ErrorValidate";
import ForgotPassword from "./pages/ForgotPassword";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Consultation from "./pages/patient/Consultation";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Topic from "./pages/Topic";
import ValidateAccount from "./pages/ValidateAccount";
import DetailDoctor from "./pages/patient/DetailDoctor";
import ConsultationDoctor from "./pages/doctor/ConsultationDoctor";
import MyQuestion from "./pages/patient/MyQuestion"
import MedicalCenter from "./pages/MedicalCenter"
import DetailHospital from "./pages/DetailHospital";
import Profile from "./pages/patient/Profile";
import ProfileDoctor from "./pages/doctor/ProfileDoctor";
import IndexAdmin from "./pages/admin/IndexAdmin";
import IndexNews from "./pages/admin/IndexNews"
import IndexHospital from "./pages/admin/IndexHospital";
import IndexDoctor from "./pages/admin/IndexDoctor";
import Create from "./components/doctor/Create";
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
      } else if(role === "admin"){
        return <IndexAdmin />
      }else{
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
    path: "/q&a",
    exact: true,
    main: (props) => {
      return <Topic  {...props}/>;
    },
  },
  {
    path: "/appointment",
    exact: true,
    main: (props) => {
      const role = cookies.get("role");
      if (role === "patient") {
      return <Consultation {...props}/>
      }else if(role === "doctor"){
        return <ConsultationDoctor {...props}/>
      }
    }
  },
  {
    path: "/doctor/:id",
    exact: true,
    main: (props) => {
      return <DetailDoctor {...props}/>
    }
  },
  {
    path: "/q&a/my",
    exact: true,
    main: (props) => {return <MyQuestion {...props} />}
  },
  // {
  //   path: "/consultation/doctor",
  //   exact: true,
  //   main: (props) => {
  //     return <ConsultationDoctor {...props}/>
  //   }
  // },
  {
    path: "/hospital",
    exact: true,
    main: () => {
      return <MedicalCenter />
    }
  },
  {
    path: '/hospital/:id',
    exact: true,
    main : (props) => {return <DetailHospital {...props}/>}
  },
  {
    path: "/profile",
    exact: true,
    main: () => {
      const role = cookies.get("role");
      if (role === "patient") {
        return <Profile/>
        }else if(role === "doctor"){
          return <ProfileDoctor />
        }
      }
  },
  {
    path: "/admin/news",
    exact: true,
    main: (match) => {
        const role = cookies.get('role');
        if(role === "admin"){
            return <IndexNews />
        }else {
            return <Redirect to="/" />
        }
    }
  },
  {
    path: "/admin/hospital",
    exact: true,
    main: (match) => {
        const role = cookies.get('role');
        if(role === "admin"){
            return <IndexHospital />
        }else {
            return <Redirect to="/" />
        }
    }
  },
  {
    path: "/admin/doctor",
    exact: true,
    main: (match) => {
        const role = cookies.get('role');
        if(role === "admin"){
            return <IndexDoctor />
        }else {
            return <Redirect to="/" />
        }
    }
  },
  {
    path: "/create",
    exact: true,
    main :() => {
      return <Create />
    }
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
