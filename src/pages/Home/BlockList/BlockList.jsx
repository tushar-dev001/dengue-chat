import React, { useEffect, useState } from "react";
import profile from "../../../assets/p1.png";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useSelector } from "react-redux";

const BlockList = () => {
  const [block, setBlock] = useState([])

  const db = getDatabase()
  const userTotalInfo = useSelector((state) => state.userData.userInfo);


  useEffect(() => {
    const starCountRef = ref(db, "block/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
          arr.push({...item.val(), blockId:item.key});
      });
      setBlock(arr);
    });
  }, []);

  const handleUnblock =(unblock)=>{
    console.log(unblock);
    remove(ref(db, "block/" + unblock.blockId))
  }


  return (
    <div className="w-full h-96 bg-gray-700 shadow-lg rounded-lg mt-4 overflow-auto">
      <div className="flex justify-between px-4 pt-4">
        <h3 className="text-lg font-bold">Block</h3>
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
      {block.length > 0 
      ?
      block.map((blockPeople)=>(
        <>
          <div className="flex justify-between px-5 mt-5 border-b">
        <div className="flex items-center space-x-4">
          <img src={profile} alt="profile" />

          <div className="font-medium dark:text-white">
            {blockPeople.blockSenderId === userTotalInfo.uid 
            ?
            <h3>{blockPeople.blockRecevidName}</h3>
            :
            <h3>{blockPeople.blockSenderName}</h3>
            }
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Joined in August 2014
            </div>
          </div>
        </div>
        <div>
          {blockPeople.blockSenderId === userTotalInfo.uid &&
          <button
          onClick={()=>handleUnblock(blockPeople)}
          type="button"
          className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Unblock
        </button>
          }
          
        </div>
      </div>
        </>
      ))
      :
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
            <span className="font-medium">No Block Available!</span>
          </div>
        </div>
      }
      {}
      
      {/* People end */}
    </div>
  );
};

export default BlockList;
