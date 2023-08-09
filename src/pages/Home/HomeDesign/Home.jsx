import { useSelector } from "react-redux";
import LogOut from "../../../Components/LogOut/LogOut";
import BlockList from "../BlockList/BlockList";
import FriendRequest from "../FriendRequest/FriendRequest";
import Friends from "../Friends/Friends";
import Group from "../Group/Group";
import MyGroup from "../MyGroup/MyGroup";
import People from "../People/People";
import { Link } from "react-router-dom";

const Home = () => {
  const userTotalInfo = useSelector((state) => state.userData.userInfo);

  return (
    <div className="mt-2">
      <div className="mx-10 flex justify-between">
        <Link
          to="/home"
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-bold rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2"
        >
          Dengue Chat
        </Link>

        <Link
          to="/profile"
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-bold rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2"
        >
          Hello, {userTotalInfo.displayName}
        </Link>

        <button
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-bold rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2"
        >
          <LogOut />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 gap-3 mb-24">
        <div className="">
          <People />
        </div>

        <div className="">
          <FriendRequest />
        </div>
        <div className="">
          <Friends />
        </div>
        <div className="">
          <BlockList />
        </div>
        <div className="">
          <Group />
        </div>
        <div className="">
          <MyGroup />
        </div>
      </div>
    </div>
  );
};

export default Home;
