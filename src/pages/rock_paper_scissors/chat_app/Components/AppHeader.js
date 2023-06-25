import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Dropdown, Space } from 'antd';
import {
    UserOutlined,
    LogoutOutlined,
    PlusOutlined,
    DownOutlined,
} from '@ant-design/icons';
import { auth } from '../App';
import { ChatContext } from '../Context/chatContext';

const { Header } = Layout;

function AppHeader() {
    const { dispatch } = useContext(ChatContext);
    const handleSignOut = () => {
        dispatch({
            type: 'CHANGE_ROOM',
            payload: '',
        });
        auth.signOut();
    };

    const authenticatedMenuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: <Link to="/profile">Profile</Link>,
        },
        {
            key: 'create-room',
            icon: <PlusOutlined />,
            label: (
                <Link
                    to="/"
                    onClick={() => {
                        dispatch({
                            type: 'CHANGE_ROOM',
                            payload: 'add-room',
                        });
                    }}
                >
                    Add Room
                </Link>
            ),
        },
        {
            key: 'sign-out',
            icon: <LogoutOutlined />,
            label: <span onClick={handleSignOut}>Sign Out</span>,
        },
    ];

    const unauthenticatedMenuItems = [
        {
            key: 'sign-in',
            label: <Link to="/signin">Sign In</Link>,
        },
        {
            key: 'register',
            label: <Link to="/register">Register</Link>,
        },
    ];

    const items = auth.currentUser
        ? authenticatedMenuItems
        : unauthenticatedMenuItems;

    return (
        <Header>
            <h1 style={{ color: 'white' }}>Chat app 🔥</h1>
            <Dropdown menu={{ items }}>
                <div
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                    style={{ color: 'white' }}
                >
                    <Space>
                        {auth.currentUser ? auth.currentUser.email : 'Menu'}
                        <DownOutlined />
                    </Space>
                </div>
            </Dropdown>
        </Header>
    );
}

export default AppHeader;
