import React from 'react';
import { ContentComponent } from '../components';
import { Button, Card, Col, Dropdown, Row, Space, Table, Typography } from 'antd';
import { CalendarFilled, DownOutlined, FallOutlined } from '@ant-design/icons';
const { Text } = Typography;

const HomePage = () => {
    return (
        <ContentComponent loading={false}>
            <Row align="middle" justify="center" gutter={16}>
                <Col span={6}>
                    <Card
                        bordered={false}
                        style={{
                            backgroundColor: '#f2eae5',
                        }}
                    >
                        <Space direction="vertical">
                            <CalendarFilled />
                            <Text>Project</Text>
                            <Text style={{ fontSize: 22 }}>95/100</Text>
                            <Text>
                                <FallOutlined />
                                10%
                            </Text>
                        </Space>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        bordered={false}
                        style={{
                            backgroundColor: '#f2eae5',
                        }}
                    >
                        <Space direction="vertical">
                            <CalendarFilled />
                            <Text>Project</Text>
                            <Text style={{ fontSize: 22 }}>95/100</Text>
                            <Text>
                                <FallOutlined />
                                10%
                            </Text>
                        </Space>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        bordered={false}
                        style={{
                            backgroundColor: '#f2eae5',
                        }}
                    >
                        <Space direction="vertical">
                            <CalendarFilled />
                            <Text>Project</Text>
                            <Text style={{ fontSize: 22 }}>95/100</Text>
                            <Text>
                                <FallOutlined />
                                10%
                            </Text>
                        </Space>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        bordered={false}
                        style={{
                            backgroundColor: '#f2eae5',
                        }}
                    >
                        <Space direction="vertical">
                            <CalendarFilled />
                            <Text>Project</Text>
                            <Text style={{ fontSize: 22 }}>95/100</Text>
                            <Text>
                                <FallOutlined />
                                10%
                            </Text>
                        </Space>
                    </Card>
                </Col>
            </Row>
            <Row style={{ marginTop: 32 }}>
                <Col span={16}>
                    <Card
                        bordered={false}
                        extra={
                            <Space>
                                <Dropdown
                                    arrow
                                    menu={{
                                        items: [
                                            { key: 1, label: 'Preparation' },
                                            { key: 1, label: 'In Progress' },
                                            { key: 1, label: 'Suspended' },
                                            { key: 1, label: 'Completed' },
                                        ],
                                    }}
                                >
                                    <Button icon={<DownOutlined />} shape="round">
                                        Project
                                    </Button>
                                </Dropdown>
                                <Dropdown
                                    arrow
                                    menu={{
                                        items: [
                                            { key: 1, label: 'Preparation' },
                                            { key: 1, label: 'In Progress' },
                                            { key: 1, label: 'Suspended' },
                                            { key: 1, label: 'Completed' },
                                        ],
                                    }}
                                >
                                    <Button icon={<DownOutlined />} shape="round">
                                        Project Manager
                                    </Button>
                                </Dropdown>
                                <Dropdown
                                    arrow
                                    menu={{
                                        items: [
                                            { key: 1, label: 'Preparation' },
                                            { key: 1, label: 'In Progress' },
                                            { key: 1, label: 'Suspended' },
                                            { key: 1, label: 'Completed' },
                                        ],
                                    }}
                                >
                                    <Button icon={<DownOutlined />} shape="round">
                                        Status
                                    </Button>
                                </Dropdown>
                            </Space>
                        }
                        title="Project Summary"
                        style={{
                            backgroundColor: '#f2eae5',
                        }}
                    >
                        <Table
                            columns={[
                                { title: 'Name', dataIndex: 'name', key: 'name' },
                                { title: 'Project Manager', dataIndex: 'pm', key: 'pm' },
                                { title: 'Due Date', dataIndex: 'dd', key: 'dd' },
                                { title: 'Status', dataIndex: 'status', key: 'status' },
                                { title: 'Progress', dataIndex: 'progress', key: 'progress' },
                            ]}
                            style={{ backgroundColor: '#f2eae5' }}
                        />
                    </Card>
                </Col>
            </Row>
        </ContentComponent>
    );
};

export default HomePage;
