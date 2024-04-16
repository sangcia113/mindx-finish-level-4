import React from 'react';
import { Link } from 'react-router-dom';
import Chart from 'react-apexcharts';

import {
    Badge,
    Button,
    Card,
    Col,
    Dropdown,
    Flex,
    List,
    Progress,
    Row,
    Select,
    Space,
    Table,
    Tabs,
    Typography,
} from 'antd';
import {
    CalendarFilled,
    ClockCircleFilled,
    DownOutlined,
    FallOutlined,
    RiseOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { ContentComponent } from '../components';
import { TASK_STATUS } from '../constants';

const { Text } = Typography;
const itemsBreadcrumb = [{ title: <Link to={'/'}>Home</Link> }];

const HomePage = () => {
    return (
        <ContentComponent items={itemsBreadcrumb} loading={false}>
            <Row align="top" justify="center" gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card
                        bordered={false}
                        style={{
                            backgroundColor: '#f2eae5',
                        }}
                    >
                        <Space direction="vertical">
                            <CalendarFilled style={{ color: '#d398e7', fontSize: 40 }} />
                            <Text>Total tasks</Text>
                            <Text strong style={{ fontSize: 22 }}>
                                <Text style={{ fontSize: 38 }}>1746</Text> /1900
                            </Text>
                            <Text style={{ fontSize: 24 }}>
                                <RiseOutlined style={{ color: '#1a932e' }} /> 18%
                            </Text>
                        </Space>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card
                        bordered={false}
                        style={{
                            backgroundColor: '#f2eae5',
                        }}
                    >
                        <Space direction="vertical">
                            <CalendarFilled style={{ color: '#e89271', fontSize: 40 }} />
                            <Text>Project</Text>
                            <Text strong style={{ fontSize: 22 }}>
                                <Text style={{ fontSize: 38 }}>95</Text> /100
                            </Text>
                            <Text style={{ fontSize: 24 }}>
                                <FallOutlined style={{ color: '#e65f2b' }} /> 10%
                            </Text>
                        </Space>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card
                        bordered={false}
                        style={{
                            backgroundColor: '#f2eae5',
                        }}
                    >
                        <Space direction="vertical">
                            <ClockCircleFilled style={{ color: '#70a1e5', fontSize: 40 }} />
                            <Text>Time spent</Text>
                            <Text strong style={{ fontSize: 22 }}>
                                <Text style={{ fontSize: 38 }}>1022</Text> /1300 Hrs
                            </Text>
                            <Text style={{ fontSize: 24 }}>
                                <RiseOutlined style={{ color: '#1a932e' }} /> 8%
                            </Text>
                        </Space>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card
                        bordered={false}
                        style={{
                            backgroundColor: '#f2eae5',
                        }}
                    >
                        <Space direction="vertical">
                            <UserOutlined style={{ color: '#f0c274', fontSize: 40 }} />
                            <Text>Resources</Text>
                            <Text strong style={{ fontSize: 22 }}>
                                <Text style={{ fontSize: 38 }}>101</Text> /120
                            </Text>
                            <Text style={{ fontSize: 24 }}>
                                <RiseOutlined style={{ color: '#1a932e' }} /> 2%
                            </Text>
                        </Space>
                    </Card>
                </Col>
            </Row>
            <Row align="top" justify="center" gutter={[16, 16]} style={{ marginTop: 32 }}>
                <Col xs={24} xxl={14}>
                    <Card
                        bordered={false}
                        extra={
                            <Space>
                                <Dropdown
                                    arrow
                                    menu={{
                                        items: [
                                            { key: 1, label: 'Preparation' },
                                            { key: 2, label: 'In Progress' },
                                            { key: 3, label: 'Suspended' },
                                            { key: 4, label: 'Completed' },
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
                                            { key: 2, label: 'In Progress' },
                                            { key: 3, label: 'Suspended' },
                                            { key: 4, label: 'Completed' },
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
                                        items: TASK_STATUS.map((item, index) => ({
                                            key: index,
                                            label: item,
                                        })),
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
                            bordered={false}
                            columns={[
                                { key: 'name', dataIndex: 'name', title: 'Name' },
                                {
                                    key: 'projectManager',
                                    dataIndex: 'projectManager',
                                    title: 'Project Manager',
                                },
                                { key: 'dueDate', dataIndex: 'dueDate', title: 'Due Date' },
                                {
                                    key: 'status',
                                    dataIndex: 'status',
                                    title: 'Status',
                                    render: record => (
                                        <Button shape="round" type="primary">
                                            {record}
                                        </Button>
                                    ),
                                },
                                {
                                    key: 'progress',
                                    dataIndex: 'progress',
                                    title: 'Progress',
                                    render: record => (
                                        <Progress
                                            percent={record}
                                            size={48}
                                            strokeWidth={8}
                                            type="circle"
                                        />
                                    ),
                                },
                            ]}
                            dataSource={[
                                {
                                    key: 1,
                                    name: 'IOS',
                                    projectManager: 'John',
                                    dueDate: '01/Apr/2024',
                                    status: 'Completed',
                                    progress: 100,
                                },
                                {
                                    key: 2,
                                    name: 'Android',
                                    projectManager: 'John',
                                    dueDate: '01/Apr/2024',
                                    status: 'Suspended',
                                    progress: 35,
                                },
                                {
                                    key: 3,
                                    name: 'Web',
                                    projectManager: 'John',
                                    dueDate: '01/Apr/2024',
                                    status: 'Preparation',
                                    progress: 68,
                                },
                            ]}
                            scroll={{ x: true }}
                        />
                    </Card>
                </Col>
                <Col xs={24} xxl={10}>
                    <Card
                        bordered={false}
                        extra={
                            <Dropdown
                                arrow
                                menu={{
                                    items: [
                                        { key: 1, label: 'Preparation' },
                                        { key: 2, label: 'In Progress' },
                                        { key: 3, label: 'Suspended' },
                                        { key: 4, label: 'Completed' },
                                    ],
                                }}
                            >
                                <Button icon={<DownOutlined />} shape="round">
                                    All
                                </Button>
                            </Dropdown>
                        }
                        title="Overall Progress"
                        style={{
                            backgroundColor: '#f2eae5',
                            // height: 480,
                        }}
                    >
                        <Flex justify="center">
                            <Progress
                                percent={87}
                                size={300}
                                strokeWidth={10}
                                success={{ percent: 40 }}
                                type="dashboard"
                            />
                        </Flex>
                        <Row justify={'space-between'}>
                            <Col xs={8} sm={6} md={5}>
                                <Text strong style={{ fontSize: 40 }}>
                                    95
                                </Text>
                                <br />
                                <Text>Total projects</Text>
                            </Col>
                            <Col xs={8} sm={6} md={4}>
                                <Text strong style={{ color: '#1a932e', fontSize: 40 }}>
                                    26
                                </Text>
                                <br />
                                <Text>Success</Text>
                            </Col>
                            <Col xs={8} sm={6} md={5}>
                                <Text strong style={{ color: '#70a1e5', fontSize: 40 }}>
                                    11
                                </Text>
                                <br />
                                <Text>Preparation</Text>
                            </Col>
                            <Col xs={8} sm={6} md={5}>
                                <Text strong style={{ color: '#dfa510', fontSize: 40 }}>
                                    2
                                </Text>
                                <br />
                                <Text>In Progress</Text>
                            </Col>
                            <Col xs={8} sm={12} md={5}>
                                <Text strong style={{ color: '#e65f2b', fontSize: 40 }}>
                                    12
                                </Text>
                                <br />
                                <Text>Suspended</Text>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row align="top" justify="center" gutter={[16, 16]} style={{ marginTop: 32 }}>
                <Col xs={24} lg={14}>
                    <Card
                        bordered={false}
                        title="Today Task"
                        style={{
                            backgroundColor: '#f2eae5',
                        }}
                    >
                        <Tabs
                            items={[
                                {
                                    key: 1,
                                    label: (
                                        <Badge count={12} offset={[16]} color="blue">
                                            All
                                        </Badge>
                                    ),
                                    children: (
                                        <List
                                            dataSource={[
                                                {
                                                    key: 1,
                                                    title: 'Tạo mới người dùng',
                                                    status: 'Open',
                                                    color: '#1a932e',
                                                },
                                                {
                                                    key: 2,
                                                    title: 'Cập nhật người dùng',
                                                    status: 'Suspended',
                                                    color: '#f25754',
                                                },
                                                {
                                                    key: 3,
                                                    title: 'Xóa người dùng',
                                                    status: 'Preparation',
                                                    color: '#e5ae21',
                                                },
                                                {
                                                    key: 4,
                                                    title: 'Làm UI',
                                                    status: 'In Progress',
                                                    color: '#e5ae21',
                                                },
                                                {
                                                    key: 5,
                                                    title: 'Kết nối cơ sở dữ liệu',
                                                    status: 'Preparation',
                                                    color: '#e5ae21',
                                                },
                                            ]}
                                            itemLayout="horizontal"
                                            renderItem={item => (
                                                <List.Item key={item.key}>
                                                    <List.Item.Meta description={item.title} />
                                                    <Button
                                                        shape="round"
                                                        style={{
                                                            backgroundColor: `${item.color}`,
                                                            color: '#fff',
                                                        }}
                                                    >
                                                        {item.status}
                                                    </Button>
                                                </List.Item>
                                            )}
                                        />
                                    ),
                                },
                                {
                                    key: 2,
                                    label: (
                                        <Badge count={12} offset={[16]}>
                                            Open
                                        </Badge>
                                    ),
                                    children: 'table Open',
                                },
                                {
                                    key: 3,
                                    label: 'In Progress',
                                    children: 'table In Progress',
                                },
                                {
                                    key: 4,
                                    label: 'In Review',
                                    children: 'table In Review',
                                },
                                {
                                    key: 5,
                                    label: 'Done',
                                    children: 'table Done',
                                },
                                {
                                    key: 6,
                                    label: 'Re-Open',
                                    children: 'table Re-Open',
                                },
                                {
                                    key: 7,
                                    label: 'Cancel',
                                    children: 'table Cancel',
                                },
                            ]}
                            tabBarGutter={50}
                        />
                    </Card>
                </Col>
                <Col xs={24} lg={10}>
                    <Card
                        bordered={false}
                        extra={
                            <Dropdown
                                arrow
                                menu={{
                                    items: [
                                        { key: 1, label: 'Preparation' },
                                        { key: 2, label: 'In Progress' },
                                        { key: 3, label: 'Suspended' },
                                        { key: 4, label: 'Completed' },
                                    ],
                                }}
                            >
                                <Button icon={<DownOutlined />} shape="round">
                                    Last 3 months
                                </Button>
                            </Dropdown>
                        }
                        title="Project Workload"
                        style={{
                            backgroundColor: '#f2eae5',
                        }}
                    >
                        <Chart
                            type={'bar'}
                            height={374}
                            options={{
                                annotations: {
                                    points: [
                                        {
                                            // x: 'Bananas',
                                            seriesIndex: 0,
                                            label: {
                                                borderColor: '#775DD0',
                                                offsetY: 0,
                                                style: {
                                                    color: 'black',
                                                    background: '#775DD0',
                                                },
                                            },
                                        },
                                    ],
                                },
                                chart: {
                                    height: 350,
                                    type: 'bar',
                                },
                                plotOptions: {
                                    bar: {
                                        borderRadius: 10,
                                        columnWidth: '50%',
                                    },
                                },
                                dataLabels: {
                                    enabled: false,
                                },
                                // title: {
                                //     text: 'CHI PHÍ MỖI THÁNG',
                                //     align: 'left',
                                // },
                                stroke: {
                                    width: 2,
                                },

                                grid: {
                                    row: {
                                        colors: ['#fff', '#f2f2f2'],
                                    },
                                },
                                xaxis: {
                                    labels: {
                                        rotate: -45,
                                    },
                                    categories: ['User 1', 'User 2', 'User 3', 'User 4', 'User 5'],
                                    tickPlacement: 'on',
                                },
                                yaxis: {
                                    title: {
                                        text: 'Tasks',
                                    },
                                },
                                fill: {
                                    type: 'gradient',
                                    gradient: {
                                        shade: 'light',
                                        type: 'horizontal',
                                        shadeIntensity: 0.25,
                                        gradientToColors: undefined,
                                        inverseColors: true,
                                        opacityFrom: 0.85,
                                        opacityTo: 0.85,
                                        stops: [50, 0, 100],
                                    },
                                },
                            }}
                            series={[
                                {
                                    name: 'Tasks',
                                    data: [44, 55, 41, 67, 22],
                                },
                            ]}
                        />
                    </Card>
                </Col>
            </Row>
        </ContentComponent>
    );
};

export default HomePage;
