import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Registrition from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import ForgotPage from "./Components/ForgotPage/ForgotPage";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/HomeDesign/Home";
import RootLayOut from "./RootLayOut/RootLayOut";
import { Children } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Message from "./pages/Message/Message";
import Settings from "./pages/Settings/Settings";
import Profile from "./pages/Profile/Profile";
import DarkMode from "./Components/DarkMode/DarkMode";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Registrition />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgot",
      element: <ForgotPage />,
    },
    
    {
      path: "/",
      element: <RootLayOut />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "message",
          element: <Message/>
        },
        {
          path: "settings",
          element: <Settings/>
        },
        {
          path: "profile",
          element: <Profile/>
        },
        {
          path: "darkmode",
          element: <DarkMode/>
        }
      ],
    },
  ]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

      <RouterProvider router={router} />
    </>
  );
}

export default App;
