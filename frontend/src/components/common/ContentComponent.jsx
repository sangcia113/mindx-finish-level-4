import React from 'react';
import { Breadcrumb, Card, Layout, Spin } from 'antd';
const { Content } = Layout;
const ContentComponent = ({ loading, items, children }) => (
    <Spin spinning={loading} tip="Please wait...">
        <Content style={{ backgroundColor: '#ebdfd7' }}>
            <Breadcrumb items={items} style={{ margin: 22 }} />
            {children}
        </Content>
    </Spin>
);

export default ContentComponent;
