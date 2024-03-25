import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    Checkbox,
    Flex,
    Form,
    Input,
    Layout,
    Spin,
    Typography,
    notification,
} from 'antd';
import { LockFilled, UserOutlined } from '@ant-design/icons';
import instanceConnection from '../utils/instanceConnect';
// C1: Tra ve thong tin user....+ AT, RT luu vao local hoac context
// C2: Tra ve AT, RT, sau do goi them api lay thong tin user.... => luu vao local hoac context
import verifyToken from '../utils/verifyToken';
const { Item } = Form;
const { Password } = Input;
const { Text } = Typography;
const videoSource = require('../assets/videos/deepmind.mp4');
const SiginPage = () => {
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = async values => {
        try {
            setLoading(true);
            const response = await instanceConnection().post('/sign-in', values);
            if (values.remember) {
                localStorage.setItem('accessToken', response.data.accessToken);
            } else {
                sessionStorage.setItem('accessToken', response.data.accessToken);
            }
            api.success({
                description: 'Đăng nhập tài khoản thành công!',
                duration: 2,
                message: 'Thành công!',
                onClose: () => navigate('/'),
                placement: 'topRight',
            });
        } catch (error) {
            api.error({
                description: error?.response?.data?.msg || 'undefined',
                duration: 2,
                message: 'Thất bại!',
                placement: 'topRight',
            });
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
                            Đ Ă N G N H Ậ P
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
                </Spin>
            </Card>
            {contextHolder}
        </Layout>
    );
};

export default SiginPage;
