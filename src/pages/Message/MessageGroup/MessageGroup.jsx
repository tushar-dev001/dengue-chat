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
import profileImg from '../../../assets/p2.png'
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { activeChat } from "../../../Slices/ActioveChatSlice/ActiveChatSlice";

const MessageGroup = () => {

    const [myGroups, setMyGroups] = useState([]);
    const [myGroupsRequest, setMyGroupsRequest] = useState([]);
    const [myGroupMembers, setMyGroupMembers] = useState([]);
  
    const db = getDatabase();
    const dispatch = useDispatch()
    const notify = () => toast();
    const userTotalInfo = useSelector((state) => state.userData.userInfo);
  
    useEffect(() => {
      const groupsRef = ref(db, "groups/");
      onValue(groupsRef, (snapshot) => {
        let arr = [];
        snapshot.forEach((item) => {
          if (userTotalInfo.uid === item.val().groupAdminId) {
            arr.push({ ...item.val(), groupInfoId: item.key });
          }
        });
        setMyGroups(arr);
      });
    }, []);
  
    const handleRejectGroup = (rejectGroup) => {
      console.log(rejectGroup.rejectGroupId);
      remove(ref(db, "groupsRequest/" + rejectGroup.rejectGroupId)).then(()=>{
        toast("Group Request Cancel Successfully!");
      })
    };
  
    const handleGroupAccept = (acceptGroup) => {
      set(push(ref(db, "groupMembers")), {
        ...acceptGroup,
      }).then(() => {
        remove(ref(db, "groupsRequest")).then(() => {
          toast("Group Request Accept Successfully!");
        });
      });
    };
  
    const handleMembers = (members)=>{
      window.member_list.showModal()
      const groupsRef = ref(db, "groupMembers");
      onValue(groupsRef, (snapshot) => {
        let arr = [];
        snapshot.forEach((item) => {
          // console.log(item.val());
          if (
            userTotalInfo.uid === item.val().groupAdminId &&
            item.val().groupInfoId === members.groupInfoId
          ) {
            arr.push({ ...item.val(), membersId: item.key });
          }
        });
        setMyGroupMembers(arr);
      });
    }
  
    const handleGroupRemove =(groupRemove)=>{
      console.log(groupRemove);
      remove(ref(db, "groupMembers/" + groupRemove.membersId )).then(()=>{
        toast("Member Remove Successfully!");
      })
    }

    const handleMsg =(msg)=>{
      dispatch(
        activeChat({
          type: "groupMsg",
          name: msg.groupInfoName,
          id: msg.groupInfoId,
        })
      )
    }

  return (
    <div className="w-full h-96 bg-gray-700 shadow-lg rounded-lg mt-4 overflow-auto">
      <h2 className="font-bold text-xl px-2 pt-2">Group Message</h2>
      {/* People start */}
      {myGroups.length > 0 ? (
        myGroups.map((myGroup) => (
          <>
            <div className="flex justify-between px-5 mt-5 border-b">
              <div className="flex items-center space-x-4">
                <img src={profile} alt="profile" />

                <div className="font-medium dark:text-white">
                  <h4>{myGroup.groupInfoName}</h4>
                  <p>{myGroup.groupInfoTagline}</p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                  {myGroup.groupAdminName}
                  </div>
                </div>
              </div>
              <div>
                <button
                onClick={()=>handleMsg(myGroup)}
                  type="button"
                  className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Message
                </button>
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
      {/* Group Modal start */}
      <dialog id="my_group_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Member Request</h3>
          <p className="py-4">
            {/* Profile List start */}
            {myGroupsRequest.map((groupReq) => (
              <>
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={profileImg}
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium  truncate dark:text-white">
                          {groupReq.userName}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          Wants to be your friend
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold  dark:text-white">
                        <div>
                          <button
                            onClick={() => handleGroupAccept(groupReq)}
                            type="button"
                            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Accept
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => handleRejectGroup(groupReq)}
                            type="button"
                            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </>
            ))}

            {/* Profile List end */}
          </p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* Group Modal end */}
      {/* Member list modal start */}
      <dialog id="member_list" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Member List</h3>
          <p className="py-4">
            {/* Profile List start */}
            {myGroupMembers.map((groupReq) => (
              <>
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={profileImg}
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium  truncate dark:text-white">
                          {groupReq.userName}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          Wants to be your friend
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold  dark:text-white">
                        <div>
                          <button
                            onClick={() => handleGroupRemove(groupReq)}
                            type="button"
                            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </>
            ))}

            {/* Profile List end */}
          </p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* Member list modal end */}
    </div>
  )
}

export default MessageGroup