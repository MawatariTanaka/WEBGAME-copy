import { useState, useEffect } from "react";
import {
    collection,
    doc,
    onSnapshot,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../../../../App";
import {
    Avatar,
    Layout,
    Typography,
    Row,
    Col,
    Form,
    Input,
    Button,
    message,
} from "antd";
import { UserOutlined, MailOutlined, TrophyOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Profile() {
    const [userData, setUserData] = useState({});
    const [form] = Form.useForm();

    useEffect(() => {
        const unsub = onSnapshot(
            doc(db, "users", auth.currentUser.uid),
            (doc) => {
                setUserData(doc.data());
            }
        );
        return unsub;
    }, []);

    const onFinish = async (values) => {
        try {
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                photoURL: values.photoURL,
            });
            await updateProfile(auth.currentUser, {
                photoURL: values.photoURL,
            });
            const roomsRef = collection(db, "rooms");
            const q = query(
                roomsRef,
                where("host_id", "==", auth.currentUser.uid)
            );
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((room) => {
                    const roomRef = doc(db, "rooms", room.id);
                    updateDoc(roomRef, {
                        coverPhotoURL: values.photoURL,
                    });
                });
            });
            message.success("Profile photo updated!");
        } catch (error) {
            console.error(error);
            message.error(error.message);
        }
    };

    return (
        <Layout>
            <Content style={{ padding: "1rem" }}>
                <Row gutter={[16, 16]}>
                    <Col
                        flex={1}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Avatar size={200} src={userData.photoURL} />
                        <Form
                            form={form}
                            initialValues={{ photoURL: userData.photoURL }}
                            onFinish={onFinish}
                            style={{
                                marginTop: "1rem",
                                width: "100%",
                                display: "flex",
                            }}
                        >
                            <Form.Item
                                style={{ width: "100%" }}
                                name="photoURL"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input placeholder="Profile photo URL (absolute path)" />
                            </Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form>
                    </Col>

                    <Col flex={2}>
                        <div>
                            <Title level={3}>{userData.username}</Title>
                            <Text
                                type="secondary"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <MailOutlined style={{ marginRight: 10 }} />{" "}
                                {userData.email}
                            </Text>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <TrophyOutlined
                                style={{ fontSize: "32px", color: "black" }}
                            />
                            <Title level={4} style={{ margin: "0 0 0 8px" }}>
                                {userData.point} points.
                            </Title>
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}
