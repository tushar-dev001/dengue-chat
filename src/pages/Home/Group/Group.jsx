import { useEffect, useState } from "react";
import profile from "../../../assets/p1.png";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Group = () => {
  const [groupDetails, setGroupDetails] = useState([]);
  const [groupMemberList, setGroupMemberList] = useState([]);
  const [groupMember, setGroupMember] = useState([]);

  const db = getDatabase();
  const notify = () => toast();
  const userTotalInfo = useSelector((state) => state.userData.userInfo);

  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userTotalInfo.uid !== item.val().groupAdminId) {
          arr.push({ ...item.val(), groupId: item.key });
        }
      });
      setGroupDetails(arr);
    });
  }, []);

  useEffect(() => {
    const groupsRef = ref(db, "groupsRequest");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().userId === userTotalInfo.uid) {
          arr.push(item.val().groupInfoId);
        }
      });
      setGroupMemberList(arr);
    });
  }, []);

  // useEffect(() => {
  //   const groupsRef = ref(db, "groupMembers");
  //   onValue(groupsRef, (snapshot) => {
  //     let arr = [];
  //     snapshot.forEach((item) => {
  //       console.log(item.val());
  //     if(item.val().userId === userTotalInfo.uid){
  //       arr.push(item.val());
  //     }
  //     });
  //     setGroupMember(arr);
  //   });
  //   console.log(groupMember);
  // }, []);

  const handleJoinGroup = (info) => {
    set(push(ref(db, "groupsRequest")), {
      groupAdminId: info.groupAdminId,
      groupAdminName: info.groupAdminName,
      groupInfoId: info.groupId,
      groupInfoName: info.groupInfoName,
      userId: userTotalInfo.uid,
      userName: userTotalInfo.displayName,
    }).then(() => {
      toast("Group join request Successfully!");
    });
  };

  const handleCancelGroup = (cancelGroup) => {
    console.log(cancelGroup);
    const groupsRef = ref(db, "groupsRequest");
    let gid = "";
    onValue(groupsRef, (snapshot) => {
      snapshot.forEach((item) => {
        console.log(item.val());
        if (
          item.val().userId === userTotalInfo.uid &&
          cancelGroup.groupInfoId === item.val().groupInfoId
        ) {
          gid = item.key;
        }
      });
    });
    remove(ref(db, "groupsRequest/" + gid)).then(() => {
      toast("Group join request Cancel Successfully!");
    });
  };

  return (
    <div className="w-full h-96 bg-gray-700 shadow-lg rounded-lg mt-4 overflow-auto">
      <div className="flex justify-between px-4 pt-4">
        <h3 className="text-lg font-bold">Groups</h3>
        <button
          onClick={() => window.my_modal_2.showModal()}
          type="button"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Create Group
        </button>
      </div>
      <div className="px-7">
        <form>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
            />

            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* People start */}
      {groupDetails.length > 0 ? (
        groupDetails.map((group) => (
          <>
            <div className="flex justify-between px-5 mt-5 border-b">
              <div className="flex items-center space-x-4">
                <img src={profile} alt="profile" />

                <div className="font-medium dark:text-white">
                  <h4>{group.groupInfoName}</h4>
                  <p>{group.groupInfoTagline}</p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {group.groupAdminName}
                  </div>
                </div>
              </div>
              <div>
                {groupMemberList.indexOf(group.groupId) !== -1 ? (
                  <>
                    <button
                      onClick={() => handleCancelGroup(group)}
                      type="button"
                      className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleJoinGroup(group)}
                    type="button"
                    className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Join
                  </button>
                )}
              </div>
            </div>
          </>
        ))
      ) : (
        <div
          className="flex items-center p-4 mb-4 mt-3 mx-7 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 mr-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">No Groups Available!</span>
          </div>
        </div>
      )}

      {/* People end */}
    </div>
  );
};

export default Group;
