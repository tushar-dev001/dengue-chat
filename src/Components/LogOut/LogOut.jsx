import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../../Slices/UserSlices";
import { toast } from "react-toastify";

const LogOut = () => {
    const auth = getAuth();
  const navigate = useNavigate();
  const userTotalInfo = useSelector((state) => state.userData.userInfo);
  const dispatch = useDispatch();
  const notify = () => toast();

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("userTotalInfo");
      dispatch(activeUser(null));
      toast("Logout Successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    });
    console.log("clisk");
  };

  useEffect(() => {
    if (!userTotalInfo) {
      navigate("/login");
    }
  }, []);


  return (
    <div>
        <button
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-bold rounded-lg text-lg text-center mr-2 mb-2"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  )
}

export default LogOut