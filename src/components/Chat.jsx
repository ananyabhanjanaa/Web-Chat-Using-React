import React, { useContext } from "react";
import {Messages} from "./Messages";
import { Inpu } from './Inpu'
import { ChatContext } from "../context/ChatContext";

export const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatinfo">
        
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
        <img width="45" height="45" src="https://img.icons8.com/dusk/64/apple-camera.png" alt="apple-camera"/>
        <img width="45" height="45" src="https://img.icons8.com/dusk/64/add-user-group-man-man.png" alt="add-user-group-man-man"/>
        <img width="45" height="45" src="https://img.icons8.com/dusk/64/more.png" alt="more"/>
        </div>
      </div>
      <Messages />
      <Inpu/>
    </div>
  );
};

