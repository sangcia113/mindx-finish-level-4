import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Avatar,
    Button,
    Col,
    Drawer,
    Dropdown,
    Flex,
    Layout,
    Menu,
    Row,
    Space,
    Typography,
} from 'antd';
import {
    BellOutlined,
    CalendarFilled,
    DashboardFilled,
    DatabaseFilled,
    LockFilled,
    LogoutOutlined,
    MenuOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;
const items = [
    {
        key: '',
        label: (
            <Text strong style={{ fontSize: 24 }}>
                Dashboard
            </Text>
        ),
        icon: <DashboardFilled size={20} />,
    },
    {
        key: 'project',
        label: (
            <Text strong style={{ fontSize: 24 }}>
                Projects
            </Text>
        ),
        icon: <CalendarFilled size={18} />,
    },
    {
        key: 'task',
        label: (
            <Text strong style={{ fontSize: 24 }}>
                Tasks
            </Text>
        ),
        icon: <DatabaseFilled size={18} />,
    },
];

const HeaderComponent = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();
    return (
        <Header style={{ backgroundColor: '#ebdfd7', padding: '10px 30px 0 30px' }}>
            <Row align="middle">
                <Col span={8}>
                    <Flex align="center" justify="start" gap="large">
                        <MenuOutlined
                            onClick={() => setOpenDrawer(prevState => !prevState)}
                            style={{ fontSize: 28 }}
                        />
                        {/* <Text strong style={{ fontSize: 36 }}>
                            DASHBOARD
                        </Text> */}
                    </Flex>
                </Col>
                <Col span={16}>
                    <Flex align="center" justify="end" gap="small">
                        <Button shape="circle" icon={<BellOutlined />} />
                        <Dropdown
                            arrow
                            menu={{
                                items: [
                                    { key: 1, label: 'Update info', icon: <UserOutlined /> },
                                    { key: 2, label: 'Change password', icon: <LockFilled /> },
                                    {
                                        key: 3,
                                        label: 'Sign out',
                                        icon: <LogoutOutlined />,
                                        onClick: () => {
                                            sessionStorage.removeItem('accessToken');
                                            localStorage.removeItem('accessToken');
                                            navigate('/signin');
                                        },
                                    },
                                ],
                            }}
                            placement="bottom"
                        >
                            <Avatar src={require('../../assets/images/avt-2.jpeg')} />
                        </Dropdown>
                    </Flex>
                </Col>
            </Row>
            <Drawer
                footer={
                    <Text style={{ fontSize: 16 }}>
                        Version <b>1.0.0</b>
                    </Text>
                }
                onClose={() => setOpenDrawer(prevState => !prevState)}
                open={openDrawer}
                placement="left"
                title="Menu"
                width={280}
                style={{ backgroundColor: '#f2eae5' }}
                styles={{ footer: { textAlign: 'center' } }}
            >
                <Space direction="vertical" size="large">
                    <Menu
                        defaultSelectedKeys={''}
                        inlineIndent={10}
                        items={items}
                        mode="inline"
                        onClick={e => {
                            setOpenDrawer(prevState => !prevState);
                            navigate(`/${e.key}`);
                        }}
                        style={{ backgroundColor: '#f2eae5', fontSize: 20 }}
                    />
                </Space>
            </Drawer>
        </Header>
    );
};

export default HeaderComponent;
