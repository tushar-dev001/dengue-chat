import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Registrition from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import ForgotPage from "./Components/ForgotPage/ForgotPage";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/Home";

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
      path: "/home",
      element: <Home />,
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
