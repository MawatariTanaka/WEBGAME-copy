import { useContext } from "react";
import { ChatContext } from "../Context/chatContext";
import CurrentMessage from "./Message/CurrentMessage";
import BlankMessage from "./Message/BlankMessage";
import CreateMessage from "./Message/CreateMessage";
import MessageDetail from "./Message/MessageDetail";

export default function Message() {
    const { currentRoomId } = useContext(ChatContext);
    return (
        <div className="messaging-container">
            <div className="messaging-space">
                {currentRoomId === "add-room" ? (
                    <CreateMessage />
                ) : currentRoomId ? (
                    <CurrentMessage />
                ) : (
                    <BlankMessage />
                )}
            </div>
            {currentRoomId && currentRoomId !== "add-room" && <MessageDetail />}
        </div>
    );
}
