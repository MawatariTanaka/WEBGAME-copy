import React, { useState, useEffect, useContext } from "react";
import { List, Avatar, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
    collection,
    where,
    onSnapshot,
    doc,
    query,
    or,
    and,
} from "firebase/firestore";
import { auth, db } from "../../../../App";
import { ChatContext } from "../../../../contexts/chatContext";

export default function Contact() {
    const [availableRooms, setAvailableRooms] = useState([]);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (!userId) {
            return;
        }

        const q = query(
            collection(db, "rooms"),
            and(
                or(
                    where("host_id", "==", userId),
                    where("player_id", "==", userId),
                    where("private", "==", false)
                )
            )
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const rooms = querySnapshot.docs
                .filter((doc) => !doc.data().ban.includes(auth.currentUser.uid))
                .map((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    return data;
                });
            setAvailableRooms(rooms);
        });

        return () => unsubscribe();
    }, [auth.currentUser]);

    return (
        <div>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ width: "100%" }}
                onClick={() => {
                    dispatch({
                        type: "CHANGE_ROOM",
                        payload: "add-room",
                    });
                }}
            >
                Create room
            </Button>
            <List
                itemLayout="horizontal"
                dataSource={availableRooms}
                renderItem={({ host, roomName, coverPhotoURL, id }) => (
                    <List.Item
                        className="list-room"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "left",
                        }}
                        onClick={() => {
                            dispatch({
                                type: "CHANGE_ROOM",
                                payload: id,
                            });
                        }}
                    >
                        <Avatar
                            src={coverPhotoURL}
                            size={32}
                            style={{ margin: "0 1rem" }}
                        />
                        <div style={{ color: "white" }}>
                            <div style={{ fontWeight: 700 }}>
                                {host.length > 8
                                    ? `${host.slice(0, 8)}...`
                                    : host}
                            </div>
                            <div>
                                {roomName.length > 8
                                    ? `${roomName.slice(0, 8)}...`
                                    : roomName}
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
}
