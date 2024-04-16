import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Flex, Form, Input, Layout, Spin, Typography, notification } from 'antd';
import { LockFilled, UserOutlined } from '@ant-design/icons';
import instanceConnection from '../utils/instanceConnect';
const { Item } = Form;
const { Password } = Input;
const { Text } = Typography;
const videoSource = require('../assets/videos/deepmind.mp4');
const SigupPage = () => {
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(0);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = async values => {
        // Thong bao loi o truong confirm password
        const { password, confirmPassword } = values;
        if (password !== confirmPassword)
            api.error({
                description: 'Mật khẩu không trùng khớp!',
                message: 'Thất bại!',
                placement: 'topRight',
            });
        try {
            setLoading(true);
            await instanceConnection().post('/sign-up', values);
            api.success({
                description: 'Đăng ký tài khoản thành công!',
                duration: 2,
                message: 'Thành công!',
                onClose: () => navigate('/signin'),
                placement: 'topRight',
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
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
                <Spin spinning={loading} tip="Vui lòng đợi...">
                    <Flex justify="center">
                        <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 22 }}>
                            Đ Ă N G K Ý
                        </Text>
                    </Flex>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Item
                            label="Tài khoản"
                            name="username"
                            rules={[
                                {
                                    message: `Bạn chưa nhập tài khoản!`,
                                    required: true,
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input
                                allowClear
                                prefix={<UserOutlined />}
                                placeholder="Nhập tài khoản..."
                                style={{ height: 42 }}
                            />
                        </Item>
                        <Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    message: `Bạn chưa nhập mật khẩu!`,
                                    required: true,
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Password
                                allowClear
                                prefix={<LockFilled />}
                                placeholder="Nhập mật khẩu..."
                                style={{ height: 42 }}
                            />
                        </Item>
                        <Item
                            label="Xác nhận mật khẩu"
                            name="confirmPassword"
                            rules={[
                                {
                                    message: `Bạn chưa nhập lại mật khẩu!`,
                                    required: true,
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Password
                                allowClear
                                prefix={<LockFilled />}
                                placeholder="Nhập lại mật khẩu..."
                                style={{ height: 42 }}
                            />
                        </Item>
                        <Item>
                            <Button
                                htmlType="submit"
                                type="primary"
                                style={{ height: 42, width: '100%' }}
                            >
                                Đăng ký
                            </Button>
                        </Item>
                        <Item>
                            <Link to="/signin">Đăng nhập</Link>
                        </Item>
                    </Form>
                </Spin>
            </Card>
            {contextHolder}
        </Layout>
    );
};

export default SigupPage;
