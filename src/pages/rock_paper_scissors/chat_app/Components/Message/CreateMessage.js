import React, { useState, useContext } from 'react';
import { Form, Input, Select, Switch, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../../App';
import {
    collection,
    query,
    doc,
    getDoc,
    getDocs,
    setDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { ChatContext } from '../../Context/chatContext';

const { Option } = Select;

export default function CreateMessage() {
    const [form] = Form.useForm();
    const [options, setOptions] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [otherPlayer, setOtherPlayer] = useState(['', '']);
    const [privateRoom, setPrivateRoom] = useState(false);
    const { dispatch } = useContext(ChatContext);

    const onFinish = async () => {
        const currentBan = await getDoc(
            doc(db, 'users', auth.currentUser.uid)
        ).then((doc) => {
            if (doc.exists()) {
                const fullBan = doc.data().ban || [];
                const chatBan = doc.data().ban_chat || [];
                return { fullBan, chatBan };
            } else {
                throw new Error(
                    `No user found with uid ${auth.currentUser.uid}`
                );
            }
        });

        const otherPlayerName = await getDoc(
            doc(db, 'users', otherPlayer)
        ).then((doc) => {
            if (doc.exists()) {
                return doc.data().username;
            } else {
                throw new Error(`No user found with uid ${otherPlayer}`);
            }
        });
        const roomId = uuidv4();
        const timestamp = serverTimestamp();

        const roomData = {
            ban: currentBan.fullBan,
            ban_chat: currentBan.chatBan,
            coverPhotoURL: auth.currentUser.photoURL,
            createdAt: timestamp,
            host: auth.currentUser.displayName,
            host_id: auth.currentUser.uid,
            in_chat: [
                {
                    id: auth.currentUser.uid,
                    username: auth.currentUser.displayName,
                    photoURL: auth.currentUser.photoURL,
                },
            ],
            messages: [],
            player: otherPlayerName,
            player_id: otherPlayer,
            private: privateRoom,
            roomName: roomName,
        };

        await setDoc(doc(db, 'rooms', roomId), roomData).then(() => {
            dispatch({
                type: 'CHANGE_ROOM',
                payload: roomId,
            });
        });
    };

    const onSearch = async (value) => {
        const q = query(collection(db, 'users'));
        const querySnapshot = await getDocs(q);
        const newOptions = querySnapshot.docs.slice(0, 5).map((doc) => ({
            label: doc.data().username,
            value: doc.id,
        }));
        setOptions(newOptions);
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item name="roomName" label="Room Name">
                <Input
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
            </Form.Item>
            <Form.Item name="otherPlayer" label="Other Player">
                <Select
                    showSearch
                    placeholder="Select Other Player"
                    optionFilterProp="children"
                    onSearch={onSearch}
                    value={otherPlayer}
                    onChange={(value) => {
                        setOtherPlayer(value);
                    }}
                >
                    {options.map((option) => (
                        <Option key={option.value} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="private" label="Private" valuePropName="checked">
                <Switch
                    checked={privateRoom}
                    onChange={(value) => setPrivateRoom(value)}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
