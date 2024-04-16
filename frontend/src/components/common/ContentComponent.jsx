import React from 'react';
import { Breadcrumb, Layout, Spin } from 'antd';
const { Content } = Layout;
const ContentComponent = ({ loading, items, children }) => (
    <Spin spinning={loading} tip="Please wait...">
        <Content style={{ backgroundColor: '#ebdfd7', padding: '2px 30px' }}>
            <Breadcrumb items={items} style={{ margin: '0 0 20px 4px' }} />
            {children}
        </Content>
    </Spin>
);

export default ContentComponent;
