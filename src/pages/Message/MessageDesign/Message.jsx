import Friends from "../../Home/Friends/Friends";
import MessageBox from "../MessageBox/MessageBox";
import MessageGroup from "../MessageGroup/MessageGroup";

const Message = () => {
  return (
    <div className=" px-10 gap-3 mb-24">
      {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 */}
      <div className="flex ">
        <div className="w-[30%]">
          <Friends button='msg'/>
          <MessageGroup />
        </div>
        <div className="w-[70%]">
          <MessageBox />
        </div>
      </div>
      {/* <div className="">
          <Friends />
        </div>

        <div className="">
        </div>
        <div className="">
        </div>
        <div className="">
          <MessageGroup />
        </div>
        <div className="">
        </div>
        <div className="">
          <MessageBox/>
        </div> */}
    </div>
  );
};

export default Message;
