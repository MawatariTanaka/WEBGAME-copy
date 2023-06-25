import { ChatContext } from '../../Context/chatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../App';
import { useEffect, useContext, useState } from 'react';
import { Layout, Button, Avatar, Divider } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

export default function MessageDetail() {
    const { currentRoomId, showRoomDetail, dispatch } = useContext(ChatContext);
    const [roomData, setRoomData] = useState(null);
    const [hostData, setHostData] = useState(null);

    useEffect(() => {
        const roomDocRef = doc(db, 'rooms', currentRoomId);
        const unsubscribe = onSnapshot(roomDocRef, (d) => {
            const data = d.data();
            setRoomData(data);
            const userDocRef = doc(db, 'users', data.host_id);
            const unsub = onSnapshot(userDocRef, (d) => {
                setHostData(d.data());
            });
            return unsub;
        });
        return () => {
            unsubscribe();
        };
    }, [currentRoomId]);

    function renderBanButtons(user) {
        if (
            hostData.id === auth.currentUser.uid &&
            user.id !== auth.currentUser.uid
        ) {
            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        danger
                        onClick={() =>
                            dispatch({
                                type: 'CHANGE_GOING_TO_BAN',
                                payload: {
                                    id: user.id,
                                    type: 'full',
                                    username: user.username,
                                },
                            })
                        }
                    >
                        Ban
                    </Button>
                    <Button
                        danger
                        onClick={() =>
                            dispatch({
                                type: 'CHANGE_GOING_TO_BAN',
                                payload: {
                                    id: user.id,
                                    type: 'chat',
                                    username: user.username,
                                },
                            })
                        }
                    >
                        Ban Chat
                    </Button>
                </div>
            );
        }
    }

    if (!roomData || !showRoomDetail || !auth.currentUser || !hostData) {
        return null;
    }

    return (
        <Layout className="messaging-detail-layout">
            <Header className="messaging-detail-header">
                <Button
                    type="text"
                    icon={<LeftOutlined />}
                    onClick={() => {
                        dispatch({
                            type: 'CHANGE_SHOW_STATUS',
                            payload: false,
                        });
                    }}
                />
                {roomData.roomName}
            </Header>
            <Content>
                {hostData && (
                    <div style={{ padding: '0.5rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Avatar src={hostData.photoURL} size={64} />
                        </div>
                        <div
                            style={{
                                fontWeight: 'bold',
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            {hostData.username}
                        </div>
                    </div>
                )}
                <p style={{ padding: '0.5rem' }}>Player: {roomData.player}</p>
                <Divider style={{ width: '100%' }} />
                <div>
                    {roomData.in_chat.map((user) => (
                        <div
                            key={user.id}
                            style={{
                                padding: '0.5rem',
                            }}
                        >
                            <div>{user.username}</div>
                            {renderBanButtons(user)}
                        </div>
                    ))}
                </div>
            </Content>
        </Layout>
    );
}
