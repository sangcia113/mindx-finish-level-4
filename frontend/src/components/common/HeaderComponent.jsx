import React, { useState } from 'react';
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
    MenuOutlined,
    PlusCircleFilled,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;
const { Text } = Typography;
const items = [
    { key: '', label: 'Dashboard', icon: <DashboardFilled size={20} /> },
    { key: 'project', label: 'Projects', icon: <CalendarFilled size={18} /> },
    { key: 'task', label: 'Tasks', icon: <DatabaseFilled size={18} /> },
];
const HeaderComponent = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();
    return (
        <Header style={{ backgroundColor: '#ebdfd7' }}>
            <Row align="middle">
                <Col span={8}>
                    <Flex align="center" justify="start" gap="large">
                        <MenuOutlined
                            onClick={() => setOpenDrawer(prevState => !prevState)}
                            style={{ fontSize: 28 }}
                        />
                        <Text strong style={{ fontSize: 36 }}>
                            TRANG CHỦ
                        </Text>
                    </Flex>
                </Col>
                <Col span={16}>
                    <Flex align="center" justify="end" gap="small">
                        <Button shape="circle" icon={<BellOutlined />} />
                        <Dropdown
                            arrow
                            menu={{
                                items: [
                                    { key: 1, label: 'Đổi mật khẩu' },
                                    { key: 2, label: 'Đăng xuất' },
                                ],
                            }}
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
                width={300}
                styles={{ footer: { textAlign: 'center' } }}
            >
                <Space direction="vertical" size="large">
                    <Button icon={<PlusCircleFilled style={{ color: '#e65f2b' }} />} shape="round">
                        Create new project
                    </Button>
                    <Menu
                        defaultSelectedKeys={''}
                        items={items}
                        mode="inline"
                        onClick={e => {
                            setOpenDrawer(prevState => !prevState);
                            navigate(`/${e.key}`);
                        }}
                    />
                </Space>
            </Drawer>
        </Header>
    );
};

export default HeaderComponent;
