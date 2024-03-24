import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Checkbox, Flex, Form, Input, Layout, Typography } from 'antd';
import { LockFilled, UserOutlined } from '@ant-design/icons';
import instanceConnection from '../utils/instanceConnect';
import verifyToken from '../utils/verifyToken';
const { Item } = Form;
const { Password } = Input;
const { Text } = Typography;
const videoSource = require('../assets/videos/deepmind.mp4');
const SiginPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = async values => {
        try {
            const response = await instanceConnection().post('/sign-in', values);
            if (values.remember) {
                localStorage.setItem('accessToken', response.data.accessToken);
            } else {
                sessionStorage.setItem('accessToken', response.data.accessToken);
            }
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout style={{ height: '100vh' }}>
            <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                    width: '100vw',
                    height: '100vh',
                    objectFit: 'cover',
                }}
            >
                <source src={videoSource} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ phát video này!
            </video>
            <Card
                bordered={false}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(6px)',
                    minWidth: 360,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Flex justify="center">
                    <Text style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 22 }}>
                        S I G N I N
                    </Text>
                </Flex>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: `Bạn chưa nhập tài khoản!` }]}
                    >
                        <Input
                            allowClear
                            prefix={<UserOutlined />}
                            placeholder="Nhập tài khoản..."
                            style={{ height: 42 }}
                        />
                    </Item>
                    <Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: `Bạn chưa nhập mật khẩu!` }]}
                    >
                        <Password
                            allowClear
                            prefix={<LockFilled />}
                            placeholder="Nhập mật khẩu..."
                            style={{ height: 42 }}
                        />
                    </Item>
                    <Item name="remember" valuePropName="checked">
                        <Checkbox>Lưu mật khẩu</Checkbox>
                    </Item>
                    <Item>
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{ height: 42, width: '100%' }}
                        >
                            Đăng nhập
                        </Button>
                    </Item>
                    <Item>
                        <Flex justify="space-between">
                            <Link to="/signup">Đăng ký</Link>
                            <Link>Quên mật khẩu?</Link>
                        </Flex>
                    </Item>
                </Form>
            </Card>
        </Layout>
    );
};

export default SiginPage;
