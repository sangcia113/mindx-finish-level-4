import React from 'react';
import { Layout, Space, Typography } from 'antd';
import { SuitHeartFill } from 'react-bootstrap-icons';
const { Footer } = Layout;
const { Link, Text } = Typography;
const FooterComponent = () => (
    <Footer style={{ textAlign: 'center', padding: '10px 0' }}>
        <Space>
            <Text strong style={{ fontSize: 16 }}>
                Design by ©{' '}
            </Text>
            <Link strong href="https://zalo.me/0972868740" target="_blank" style={{ fontSize: 16 }}>
                PHAM THANH SANG <SuitHeartFill color="red" />
            </Link>
        </Space>
    </Footer>
);

export default FooterComponent;
