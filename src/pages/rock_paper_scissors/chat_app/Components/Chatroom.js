import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";
import Message from "./Message";
import { ChatContext } from "../../../../contexts/chatContext";
import GoingToBan from "./GoingToBan";
import "../App.css";

export default function Chatroom({ user }) {
    const { goingToBan } = useContext(ChatContext);

    return (
        <div className="chatroom-container" style={{ height: "91vh" }}>
            <Contact />
            <Message />
            {goingToBan && <GoingToBan goingToBan={goingToBan} />}
        </div>
    );
}
