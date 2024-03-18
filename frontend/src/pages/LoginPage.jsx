import { Button, Card, Flex, Form, Input, Layout, Typography } from 'antd';
import { LockFilled, UserOutlined } from '@ant-design/icons';
import instanceConnection from '../utils/instanceConnect';
const { Item } = Form;
const { Password } = Input;
const { Link, Text } = Typography;
const videoSource = require('../assets/videos/deepmind.mp4');

const LoginPage = () => {
    const [form] = Form.useForm();
    const onFinish = async values => {
        try {
            const response = await instanceConnection().post(`/sign-in`);
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
                    backdropFilter: 'blur(2px)',
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
                <Form form={form}>
                    <Item
                        name="username"
                        rules={[{ require: true, message: `You haven't not entered a username!` }]}
                    >
                        <Input
                            allowClear
                            prefix={<UserOutlined />}
                            placeholder="Enter username..."
                            style={{ height: 42 }}
                        />
                    </Item>
                    <Item
                        name="password"
                        rules={[{ required: true, message: `You haven't not entered a password!` }]}
                    >
                        <Password
                            allowClear
                            prefix={<LockFilled />}
                            placeholder="Enter password..."
                            style={{ height: 42 }}
                        />
                    </Item>
                    <Item>
                        <Button type="primary" style={{ height: 42, width: '100%' }}>
                            Signin
                        </Button>
                    </Item>
                    <Item>
                        <Flex justify="space-between">
                            <Link>Signup</Link>
                            <Link>Forgot password?</Link>
                        </Flex>
                    </Item>
                </Form>
            </Card>
        </Layout>
    );
};

export default LoginPage;
