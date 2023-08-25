import React, { useEffect, useState } from "react";
import profile from "../../../assets/p2.png";
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
import { activeChat } from "../../../Slices/ActioveChatSlice/ActiveChatSlice";
import { useDispatch } from "react-redux";

const Friends = ({ button }) => {
  const [friends, setFriends] = useState([]);

  const db = getDatabase();
  const dispatch = useDispatch();
  const notify = () => toast();
  const userTotalInfo = useSelector((state) => state.userData.userInfo);

  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          item.val().senderId === userTotalInfo.uid ||
          item.val().receverId === userTotalInfo.uid
        ) {
          arr.push({ ...item.val(), unfriendId: item.key });
        }
      });
      setFriends(arr);

      if (arr[0].senderId == userTotalInfo.uid) {
        dispatch(
          activeChat({
            type: "singlemsg",
            name: arr[0].receverName,
            id: arr[0].receverId,
          })
        );
        localStorage.setItem(
          "activeChat",
          JSON.stringify(
            activeChat({
              type: "singleMsg",
              name: arr[0].receverName,
              id: arr[0].receverId,
            })
          )
        );
      }else{
        dispatch(
          activeChat({
            type: "singlemsg",
            name: arr[0].senderName,
            id: arr[0].senderId,
          })
        );
        localStorage.setItem(
          "activeChat",
          JSON.stringify(
            activeChat({
              type: "singleMsg",
              name: arr[0].senderName,
              id: arr[0].senderId,
            })
          )
        );
      }
    });
  }, []);

  const handleUnfriend = (unfriend) => {
    console.log(unfriend);
    remove(ref(db, "friends/" + unfriend.unfriendId)).then(() => {
      toast("Unfriend Successfully!");
    });
  };

  const handleBlock = (block) => {
    if (userTotalInfo.uid === block.senderId) {
      set(push(ref(db, "block")), {
        blockSenderId: block.senderId,
        blockSenderName: block.senderName,
        blockRecevidId: block.receverId,
        blockRecevidName: block.receverName,
      })
        .then(() => {
          remove(ref(db, "friends/" + block.unfriendId));
        })
        .then(() => {
          toast("Block Successfully!");
        });
    } else {
      set(push(ref(db, "block")), {
        blockSenderId: block.receverId,
        blockSenderName: block.receverName,
        blockRecevidId: block.senderId,
        blockRecevidName: block.senderName,
      })
        .then(() => {
          remove(ref(db, "friends/" + block.unfriendId));
        })
        .then(() => {
          toast("Block Successfully!");
        });
    }
  };

  const handleMessage = (msg) => {
    console.log(msg.receverName);
    if (msg.senderId == userTotalInfo.uid) {
      console.log(msg.receverId);
      dispatch(
        activeChat({
          type: "singlemsg",
          name: msg.receverName,
          id: msg.receverId,
        })
      );
      localStorage.setItem(
        "activeChat",
        JSON.stringify(
          activeChat({
            type: "singleMsg",
            name: msg.receverName,
            id: msg.receverId,
          })
        )
      );
    } else {
      console.log(msg.senderId);
      dispatch(
        activeChat({
          type: "singlemsg",
          name: msg.senderName,
          id: msg.senderId,
        })
      );
      localStorage.setItem(
        "activeChat",
        JSON.stringify(
          activeChat({
            type: "singleMsg",
            name: msg.receverName,
            id: msg.receverId,
          })
        )
      );
    }
  };

  return (
    <div className="w-full h-96 bg-gray-700 shadow-lg rounded-lg mt-4 overflow-auto">
      <div className="flex justify-between px-4 pt-4">
        <h3 className="text-lg font-bold">Friends</h3>
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
      {friends.length > 0 ? (
        friends.map((friend) => (
          <>
            <div className="flex justify-between px-5 mt-5 border-b">
              <div className="flex items-center space-x-4">
                <img src={profile} alt="profile" />

                <div className="font-medium dark:text-white">
                  {friend.receverId === userTotalInfo.uid ? (
                    <h3>{friend.senderName}</h3>
                  ) : (
                    <h3>{friend.receverName}</h3>
                  )}
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Joined in August 2014
                  </div>
                </div>
              </div>

              {button == "msg" ? (
                <div>
                  <button
                    onClick={() => handleMessage(friend)}
                    type="button"
                    className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Message
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <button
                      onClick={() => handleUnfriend(friend)}
                      type="button"
                      className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Unfriend
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => handleBlock(friend)}
                      type="button"
                      className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Block
                    </button>
                  </div>
                </>
              )}
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
            <span className="font-medium">No Friends Available!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Friends;
