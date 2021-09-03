import React, { useState, useContext, useEffect, useRef } from "react";
// import { Input, Button, Tooltip, Modal, message } from "antd";
// import Phone from "../../assests/phone.gif";
// import Teams from "../../assests/teams.mp3";
// import * as classes from "./Options.module.css";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import {usePeerSocket} from "./contexts/PrivatePeerSocket";
 import SickButton  from "./styles/SickButton";
 import styled from 'styled-components'
// import {
//   TwitterIcon,
//   TwitterShareButton,
//   WhatsappShareButton,
//   WhatsappIcon,
//   FacebookIcon,
//   FacebookShareButton,
// } from "react-share";
// import {
//   UserOutlined,
//   CopyOutlined,
//   InfoCircleOutlined,
//   PhoneOutlined,
// } from "@ant-design/icons";
 const Wrap = styled.div`
 display: flex;
flex-flow: column;
text-align: center;
 justify-content: center;
 align-items: center;
 border-radius:10px;
 padding: 10px;
 justify-self: center;
 margin: 0 auto;
 background: rgba(245,245,245,1);
 box-shadow: 0 20px 8px -10px rgba(0,0,0,.2);
  position: absolute;     
 width: 95%;
 max-width:300px;
 height: 200px;
 `
const Options = ({name, userId}) => {
  const [idToCall, setIdToCall] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const Audio = useRef();
  const {
      peerSocket,
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    yourName,
    setYourName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
    otherUser,
    setOtherUser,
    leaveCall1,
  } = usePeerSocket();
console.log(name)
  useEffect(() => {
    if (isModalVisible) {
      Audio?.current?.play();
    } else Audio?.current?.pause();
  }, [isModalVisible]);

  const showModal = (showVal) => {
    setIsModalVisible(showVal);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    leaveCall1();
    window.location.reload();
  };
  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) {
      setIsModalVisible(true);
      setOtherUser(call.from);
    } else setIsModalVisible(false);
  }, [call.isReceivingCall]);

  return (
    <Wrap >
      <div  >
        <h2 style={{transform: 'translateY(-10px)'}}>Hi {yourName}!</h2>
      

        <div >
 
          <div  >
            {/* <WhatsappShareButton
              url={`https://video-chat-mihir.vercel.app/`}
              title={`Join this meeting with the given code "${me}"\n`}
              separator="Link: "
              className={classes.share_icon}
            >
              <WhatsappIcon size={26} round />
            </WhatsappShareButton>
            <FacebookShareButton
              url={`https://video-chat-mihir.vercel.app/`}
              title={`Join this meeting with the given code "${me}"\n`}
              className={classes.share_icon}
            >
              <FacebookIcon size={26} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://video-chat-mihir.vercel.app/`}
              title={`Join this meeting with the given code  "${me}"\n`}
              className={classes.share_icon}
            >
              <TwitterIcon size={26} round className={classes.share_border} />
            </TwitterShareButton> */}
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <h2>Make a call</h2>

        <input
          placeholder="Enter code to call"
          size="large"
   
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
          style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
        //   prefix={<UserOutlined className="site-form-item-icon" />}
        //   suffix={
        //     <Tooltip title="Enter code of the other user">
        //       <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
        //     </Tooltip>
        //   }
        />

        {callAccepted && !callEnded ? (
          <SickButton
            variant="contained"
            onClick={leaveCall}
       
            tabIndex="0"
          >
            <img src={Hang} alt="hang up" style={{ height: "15px" }} />
            &nbsp; Hang up
          </SickButton>
        ) : (
          <SickButton
            type="primary"
 
            onClick={() => {
              if (name.length) callUser(idToCall);
              else message.error("Please enter your name to call!");
            }}
       
            tabIndex="0"
          >
            Call
          </SickButton>
        )}
      </div>

      {call.isReceivingCall && !callAccepted && (
        <>
          <audio src={Teams} loop ref={Audio} />
          {/* <Modal
            title="Incoming Call"
            visible={isModalVisible}
            onOk={() => showModal(false)}
            onCancel={handleCancel}
            footer={null}
          > */}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h1>
                {call.name} is calling you:{" "}
                <img
                  src={Phone}
                  alt="phone ringing"
                  
                  style={{ display: "inline-block" }}
                />
              </h1>
            </div>
            <div >
              <SickButton
          
            
                color="#29bb89"
            
                onClick={() => {
                  answerCall();
                  Audio.current.pause();
                }}
                tabIndex="0"
              >
                Answer
              </SickButton>
              <SickButton
                variant="contained"
                
                 
                onClick={() => {
                  setIsModalVisible(false);
                  Audio.current.pause();
                }}
                tabIndex="0"
              >
                Decline
              </SickButton>
            </div>
          {/* </Modal> */}
        </>
      )}
    </Wrap>
  );
};

export default Options;