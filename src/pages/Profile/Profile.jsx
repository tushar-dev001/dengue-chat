import { Link } from "react-router-dom";
import { BsFillCameraFill } from "react-icons/bs";
import { TbStepInto } from "react-icons/tb";
import { MdSchool } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import profile from "../../assets/tushar.jpg"
import coverPhoto from "../../assets/cover.jpg"
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";

const Profile = () => {
  const auth = getAuth();

  const userTotalInfo = useSelector((state) => state.userData.userInfo);


  return (
    <>
     

      {/* Profile photo and name design start */}
      <div className="shadow-xl bg-[#242526]">
        {/* cover photo part start */}
        <div className="w-full relative">
          <img
            className="md:w-[940px] md:h-[350px] h-24 w-full mx-auto object-cover"
            src={coverPhoto}
            alt="cover Images"
          />
          <div
            // onClick={() => window.cover_photo_modal.showModal()}
            className="mt-[-60px] lg:ml-[965px]  justify-between items-center absolute"
          >
            <button className="btn glass hidden lg:flex ">
              <BsFillCameraFill className=" mr-4 text-4xl hidden md:block" />{" "}
              Edit Cover Photo
            </button>
            <BsFillCameraFill className=" mr-auto text-2xl ml-[218px] mt-7 bg-gray-100 rounded-full p-1 md:hidden" />
          </div>
        </div>

        

        <div className="max-w-[880px] mx-auto md:flex justify-between items-center border-b p-2 md:p-0 md:pb-4">
          <div className="-mt-8 md:mt-12 md:flex items-center gap-10">
            <div className="">
              <img
                // onClick={() => window.my_modal_2.showModal()}
                className="w-20 h-20 md:w-40 md:h-40 rounded-full relative object-cover transition-transform transform hover:scale-105 duration-300 ease-in-out hover:opacity-100 cursor-pointer"
                src={profile}
                alt="Profile Images"
              />
              <BsFillCameraFill className="absolute mt-[-60px] ml-[125px] text-4xl hidden md:block" />
            </div>
            <div className="font-pop">
              <h2 className="font-extrabold text-4xl">
                {userTotalInfo.displayName}
              </h2>
              <p className="text-sm mb-3 md:mb-0">
                100B followers . 0 following
              </p>
            </div>
          </div>

          <div className="gap-4 flex flex-wrap md:flex-nowrap">
            <button className="btn btn-secondary">Edit</button>
            <button className="btn btn-secondary">Add Story</button>
          </div>
        </div>

      

        <div className="max-w-[880px] mx-auto pl-2 md:pl-0 ">
          <ul className="flex gap-3 md:gap-7 py-6 flex-wrap md:flex-nowrap">
            <Link to="#post">
              {" "}
              <li>Post</li>
            </Link>
            <Link to="#">
              {" "}
              <li>About</li>
            </Link>
            <Link to="#">
              {" "}
              <li>Followers</li>
            </Link>
            <Link to="#">
              {" "}
              <li>Photos</li>
            </Link>
            <Link to="#">
              {" "}
              <li>Videos</li>
            </Link>
            <Link to="#">
              {" "}
              <li className="hidden md:block">Groups</li>
            </Link>
          </ul>
        </div>
      </div>
      {/* Profile photo and name design start */}

      {/* Profile home section design start */}
      <div className="md:flex justify-center gap-5 mt-6 mb-36 ">
        <div className="md:w-[360px] bg-[#242526] py-7 px-5">
          <h3>Intro</h3>
          <p>
            React Developer | MERN full Stack Developer (jr.) | Still learning
          </p>
          <button className="w-full bg-slate-800 p-4 rounded-xl mt-5">
            Edit bio
          </button>

          <ul className="font-pop">
            <li className="flex items-center mt-4 flex-wrap md:flex-nowrap">
              <TbStepInto className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />{" "}
              <p className="font-extrabold">Profile</p>.{" "}
              <p className="font-semibold">Entrepreneur</p>
            </li>

            <li className="flex items-center mt-4">
              <div>
                <MdSchool className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />
              </div>
              <div className="flex items-center">
                <p className="">
                  <span className="font-extrabold">Studies to </span> MERN
                  Full-Stack Web Developer at Creative IT Institute{" "}
                </p>
              </div>
            </li>

            <li className="flex items-center mt-4">
              <div>
                <MdSchool className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />
              </div>
              <div className="flex items-center">
                <p className="">
                  <span className="font-extrabold">Studies to</span>M.G Heigh
                  School
                </p>
              </div>
            </li>

            <li className="flex items-center mt-4">
              <div>
                <MdSchool className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />
              </div>
              <div className="flex items-center">
                <p className="">
                  <span className="font-extrabold">Studies at</span>at Bogura
                  Government College, Bogura
                </p>
              </div>
            </li>

            <li className="flex items-center mt-4">
              <div>
                <MdSchool className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />
              </div>
              <div className="flex items-center">
                <p className="">
                  <span className="font-extrabold">Studies at</span> Web
                  Designer| Developer and App Designer| Developer at Creative IT
                  Institute{" "}
                </p>
              </div>
            </li>

            <li className="flex items-center mt-4">
              <div>
                <AiFillGithub className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />
              </div>
              <div className="flex items-center break-all">
                <p className="">https://github.com/tushari789 </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="md:w-[500px] justify-start">
          <div className="mt-5 md:mt-0">
            {/* <ProfilePostInputBar /> */}
          </div>

          {/* Profile Post design start */}
          <div className=" col-span-6 bg-[#242526] mt-10 p-2 md:p-0">
            <div className="card w-full  mx-auto shadow-2xl">
              <div className="">
                <div className="flex items-center justify-between">
                  <div>
                    {/* <User /> */}
                  </div>
                  <div className="flex align-center gap-4">
                    <RxCross2 />
                    <BiDotsVerticalRounded />
                  </div>
                </div>

                <p className="font-pop text-base">
                  If a dog chews shoes whose shoes does he choose? Lorem, ipsum
                  dolor sit amet consectetur adipisicing elit. Veniam sapiente
                  assumenda, voluptatem atque iste dicta molestias repudiandae
                  deleniti veritatis temporibus harum aspernatur, impedit modi
                  ab libero nam accusamus inventore quam cum. Adipisci ad
                  officiis exercitationem dolores sequi eos architecto fugiat
                  fugit quo porro! Nam hic voluptas dolorum, porro ab velit.
                </p>
              </div>
              <figure className="border-b-2 pb-8">
                {/* <img src={profilePhoto} alt="Shoes" /> */}
              </figure>
              <div className="pb-5 flex justify-around">
                <div className="flex items-center gap-2 mt-5 text-lg font-medium">
                  <AiFillLike />
                  <p className="font-pop ">Like</p>
                </div>
                <div className="flex items-center gap-2 mt-5 text-lg font-medium">
                  <GoComment />
                  <p className="font-pop ">Comment</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-span-6 bg-[#242526] mt-10 p-2 md:p-0">
            <div className="card w-full  mx-auto shadow-2xl">
              <div className="">
                <div className="flex items-center justify-between">
                  <div>
                    {/* <User /> */}
                  </div>
                  <div className="flex align-center gap-4">
                    <RxCross2 />
                    <BiDotsVerticalRounded />
                  </div>
                </div>

                <p className="font-pop text-base">
                  If a dog chews shoes whose shoes does he choose? Lorem, ipsum
                  dolor sit amet consectetur adipisicing elit. Veniam sapiente
                  assumenda, voluptatem atque iste dicta molestias repudiandae
                  deleniti veritatis temporibus harum aspernatur, impedit modi
                  ab libero nam accusamus inventore quam cum. Adipisci ad
                  officiis exercitationem dolores sequi eos architecto fugiat
                  fugit quo porro! Nam hic voluptas dolorum, porro ab velit.
                </p>
              </div>
              <figure className="border-b-2 pb-8">
                {/* <img src={profilePhoto} alt="Shoes" /> */}
              </figure>
              <div className="pb-5 flex justify-around">
                <div className="flex items-center gap-2 mt-5 text-lg font-medium">
                  <AiFillLike />
                  <p className="font-pop ">Like</p>
                </div>
                <div className="flex items-center gap-2 mt-5 text-lg font-medium">
                  <GoComment />
                  <p className="font-pop ">Comment</p>
                </div>
              </div>
            </div>
          </div>
          {/* Profile Post design end */}
        </div>
      </div>
      {/* Profile home section design end */}
    </>
  );
};

export default Profile;
