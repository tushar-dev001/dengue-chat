import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import profile from "../../../assets/p1.png";
import registrationimg from "../../../assets/cover.jpg"
import ModalImage from "react-modal-image";
import Button from '@mui/material/Button';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const MessageBox = () => {
  const [msg, setMsg] = useState("")
  const [text, setText] = useState("")

  const userTotalInfo = useSelector((state) => state.userData.userInfo);
    const activeChat = useSelector((state) => state.activeChat.activeChat);
   
    const db = getDatabase()


    const handleMsgSend =()=>{
      // console.log(userTotalInfo);
      console.log(activeChat.type);
      // console.log(msg);
      // const data ={
      //   senderName: userTotalInfo.displayName,
      //   senderId: userTotalInfo.uid,
      //   receverName: activeChat.name,
      //   receverId: activeChat.id,
      //   msg: msg
      // }

      if(activeChat.type === 'singlemsg'){

        set(push(ref(db, 'singleMsg')),{
          senderName: userTotalInfo.displayName,
          senderId: userTotalInfo.uid,
          receverName: activeChat.name,
          receverId: activeChat.id,
          msg: msg
        }).then(()=>{
          console.log("data send");
        })
      }else{
        set(push(ref(db, 'groupMsg')),{
          senderName: userTotalInfo.displayName,
          senderId: userTotalInfo.uid,
          receverName: activeChat.name,
          receverId: activeChat.id,
          msg: msg
        }).then(()=>{
          console.log("data send");
        })
      }

    }

    // useEffect(() => {
    //   const singleMsgRef = ref(db, "singleMsg");
    //   onValue(singleMsgRef, (snapshot) => {
    //     // let arr = [];
    //     snapshot.forEach((item) => {
    //       console.log(item.val());
    //       // arr.push(item.val().blockRecevidId + item.val().blockSenderId
    //       // );
    //     });
    //     setText();
    //   });
    // }, []);



  return (
    <div className='chatbox'>

    <div className='msgprofile'>
        {/* <div className='signal'>
            <img width="50" src={profile} />
            
            <div className='round'></div>
        </div> */}
        <div>
           <Stack direction="row" spacing={2}>
             <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <img width='50' src={profile} alt="" />
            </StyledBadge>
          </Stack>
        </div>
        <div>
            <h3>{activeChat.name}</h3>
        <p>Online</p>
        </div>
    </div>
    <div className='msgbox'>
        {/* <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div> */}
        <div className='msg'>
            <p className='getimg'>

                <ModalImage
                small={registrationimg}
                large={registrationimg}
                />
            </p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendimg'>
                
                <ModalImage
                small={registrationimg}
                large={registrationimg}
                />
            </p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getaudio'>
                <audio controls></audio>
            </p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendaudio'>
                <audio controls></audio>
            </p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getaudio'>
               <video width="320" height="240" controls></video>
            </p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendaudio'>
               <video width="320" height="240" controls></video>
            </p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>{text}</p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        
    </div>
    <div className='msgcontainer'>
       <div className='msgwritecon'>
        <input onChange={(e)=>setMsg(e.target.value)} className='msgwrite'/>
       </div>
       <Button onClick={handleMsgSend} variant="contained">Send</Button>
    </div>




    </div>
  )
}

export default MessageBox