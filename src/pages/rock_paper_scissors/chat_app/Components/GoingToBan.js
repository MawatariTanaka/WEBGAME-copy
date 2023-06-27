import { useContext } from "react";
import { Button, Col, Row } from "antd";
import { ChatContext } from "../../../../contexts/chatContext";
import { auth, db } from "../../../../App";
import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function GoingToBan({ goingToBan }) {
    const { dispatch } = useContext(ChatContext);
    const auth = getAuth();

    const handleBan = async (act) => {
        if (act) {
            const userUid = auth.currentUser.uid;
            const userRef = doc(db, "users", userUid);
            const q = query(
                collection(db, "rooms"),
                where("host_id", "==", userUid)
            );
            const querySnapshot = await getDocs(q);

            switch (goingToBan.type) {
                case "full":
                    await updateDoc(userRef, {
                        ban: arrayUnion(goingToBan.id),
                    });

                    for (const docRef of querySnapshot.docs) {
                        const roomRef = doc(db, "rooms", docRef.id);
                        const roomSnapshot = await getDoc(roomRef);
                        const inChat = roomSnapshot.data().in_chat;
                        await updateDoc(roomRef, {
                            ban: arrayUnion(goingToBan.id),
                            in_chat: inChat.filter(
                                (obj) => obj.id !== goingToBan.id
                            ),
                        });
                    }
                    break;

                case "chat":
                    await updateDoc(userRef, {
                        ban_chat: arrayUnion(goingToBan.id),
                    });
                    for (const docRef of querySnapshot.docs) {
                        const roomRef = doc(db, "rooms", docRef.id);
                        await updateDoc(roomRef, {
                            ban_chat: arrayUnion(goingToBan.id),
                        });
                    }
                    break;
                default:
                    break;
            }
        }
        dispatch({ type: "CHANGE_GOING_TO_BAN", payload: "" });
    };

    return (
        <Row justify="center" align="middle" className="going-to-ban-alert">
            <Col>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                    Do you want to remove {goingToBan.username} from this room
                    and all subsequent rooms?
                </div>
                <Row justify="center">
                    <Button
                        type="primary"
                        danger
                        style={{ marginRight: 20 }}
                        onClick={() => {
                            handleBan(true);
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        onClick={() => {
                            handleBan(false);
                        }}
                    >
                        No
                    </Button>
                </Row>
            </Col>
        </Row>
    );
}
