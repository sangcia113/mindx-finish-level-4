import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import {
    Button,
    Card,
    Dropdown,
    Form,
    Popconfirm,
    Space,
    Table,
    Tag,
    Typography,
    notification,
} from 'antd';

import { PlusCircleFilled } from '@ant-design/icons';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

import instanceConnection from '../utils/instanceConnect';

import { ContentComponent, ModalProjectComponent } from '../components';

const { Text } = Typography;

const itemsBreadcrumb = [
    { title: <Link to={'/'}>Home</Link> },
    { title: <Link to={'/project'}>Project</Link> },
];

const ProjectPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const [projectList, setProjectList] = useState([]);
    const [modalProject, setModalProject] = useState({ open: false, title: '' });

    const [formProject] = Form.useForm();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    const getProjectList = async () => {
        try {
            setLoading(true);

            const response = await instanceConnection(accessToken).get('/project');

            setProjectList(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const insertProject = async values => {
        try {
            setLoading(true);

            const response = await instanceConnection(accessToken).post(`/project`, values);

            setModalProject({ open: false });

            api.success({
                description: response.data.msg,
                message: <Text strong>SUCCESS</Text>,
                placement: 'topRight',
            });

            getProjectList();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateProject = async values => {
        try {
            setLoading(true);

            const response = await instanceConnection(accessToken).put(
                `/project/${values._id}`,
                values
            );

            setModalProject({ open: false });

            api.success({
                description: response.data.msg,
                message: <Text strong>SUCCESS</Text>,
                placement: 'topRight',
            });

            getProjectList();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProject = async values => {
        try {
            setLoading(true);

            const response = await instanceConnection(accessToken).delete(`/project/${values._id}`);

            setModalProject({ open: false });

            api.success({
                description: response.data.msg,
                message: <Text strong>SUCCESS</Text>,
                placement: 'topRight',
            });

            getProjectList();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const onFinishProject = async values => {
        values._id
            ? await updateProject({
                  ...values,
                  startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
                  endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
              })
            : await insertProject({
                  ...values,
                  startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
                  endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
              });
    };

    useEffect(() => {
        getProjectList();
    }, []);

    const columnsPreparation = [
        {
            key: 'action',
            dataIndex: 'action',
            title: '',
            fixed: 'left',
            render: (_, record) => (
                <Dropdown
                    arrow={true}
                    menu={{
                        items: [
                            {
                                key: '1',
                                label: (
                                    <Link to={`/project/detail/${record._id}`}>
                                        <Text strong style={{ color: '#2db7f5', fontSize: 14 }}>
                                            Project Detail
                                        </Text>
                                    </Link>
                                ),
                            },
                            {
                                key: '2',
                                label: (
                                    <Text strong style={{ color: '#ffc53d', fontSize: 14 }}>
                                        Project Edit
                                    </Text>
                                ),
                                onClick: () => {
                                    formProject.setFieldsValue({
                                        ...record,
                                        startDate: dayjs(record.startDate),
                                        endDate: dayjs(record.endDate),
                                    });
                                    setModalProject({ open: true, title: 'EDIT PROJECT' });
                                },
                            },
                            {
                                key: '3',
                                label: (
                                    <Popconfirm
                                        description="Are you sure to delete this project?"
                                        onConfirm={() => deleteProject(record)}
                                        title="Delete the project?"
                                    >
                                        <Text strong style={{ color: '#cf1322', fontSize: 14 }}>
                                            Project Delete
                                        </Text>
                                    </Popconfirm>
                                ),
                            },
                        ],
                    }}
                    placement={'bottomLeft'}
                >
                    <ThreeDotsVertical />
                </Dropdown>
            ),
        },
        {
            key: 'project',
            dataIndex: 'project',
            title: 'Project',
            ellipsis: true,
            render: (_, record) => (
                <Space direction="vertical">
                    <Link to={`/project/detail/${record._id}`}>
                        <Text strong style={{ color: '#1677ff', fontSize: 14 }}>
                            # {record.projectCode}
                        </Text>
                    </Link>
                    <Text strong>
                        {record.projectName.length > 20
                            ? `${record.projectName.slice(0, 20).toUpperCase()}...`
                            : record.projectName.toUpperCase()}
                    </Text>
                    <Text strong style={{ color: '#6e6e6e', fontSize: 14 }}>
                        Created on {dayjs(record.createdDate).format('MMM DD, YYYY')}
                    </Text>
                </Space>
            ),
        },
        {
            key: 'owner',
            dataIndex: 'owner',
            title: 'Owner',
            ellipsis: true,
            render: record => <Text strong>{record.fullName}</Text>,
        },
        {
            key: 'plan',
            dataIndex: 'plan',
            title: 'Plan',
            ellipsis: true,
            render: (_, record) => (
                <Space direction="vertical">
                    <Text strong style={{ color: '#6e6e6e', fontSize: 14 }}>
                        Start date on{' '}
                        {record.startDate && dayjs(record.startDate).format('MMM DD, YYYY')}
                    </Text>
                    <Text strong style={{ color: '#6e6e6e', fontSize: 14 }}>
                        End date on {record.endDate && dayjs(record.endDate).format('MMM DD, YYYY')}
                    </Text>
                    <Text strong style={{ color: '#6e6e6e', fontSize: 14 }}>
                        Due date on {record.dueDate && dayjs(record.dueDate).format('MMM DD, YYYY')}
                    </Text>
                </Space>
            ),
        },
        {
            key: 'description',
            dataIndex: 'description',
            title: 'Description',
            ellipsis: true,
            render: record => (record.length > 20 ? `${record.slice(0, 20)}...` : record),
        },
        {
            key: 'status',
            dataIndex: 'status',
            title: 'Status',
            ellipsis: true,
            render: record => {
                switch (record) {
                    case 'Preparing':
                        return (
                            <Tag
                                bordered={false}
                                color="#faad14"
                                style={{
                                    borderRadius: 20,
                                    fontSize: 16,
                                    height: 36,
                                    paddingTop: 6,
                                }}
                            >
                                {record}
                            </Tag>
                        );
                    case 'In Progress':
                        return (
                            <Tag
                                bordered={false}
                                color="#1677ff"
                                style={{
                                    borderRadius: 20,
                                    fontSize: 16,
                                    height: 36,
                                    paddingTop: 6,
                                }}
                            >
                                {record}
                            </Tag>
                        );
                    case 'Suspended':
                        return (
                            <Tag
                                bordered={false}
                                color="#ff4d4f"
                                style={{
                                    borderRadius: 20,
                                    fontSize: 16,
                                    height: 36,
                                    paddingTop: 6,
                                }}
                            >
                                {record}
                            </Tag>
                        );
                    case 'Completed':
                        return (
                            <Tag
                                bordered={false}
                                color="#52c41a"
                                style={{
                                    borderRadius: 20,
                                    fontSize: 16,
                                    height: 36,
                                    paddingTop: 6,
                                }}
                            >
                                {record}
                            </Tag>
                        );
                    default:
                        break;
                }
            },
        },
    ];

    return (
        <ContentComponent loading={loading} items={itemsBreadcrumb}>
            <Card
                bordered={false}
                extra={
                    <Button
                        icon={<PlusCircleFilled style={{ fontSize: 18, paddingTop: 2 }} />}
                        onClick={() => setModalProject({ open: true, title: 'ADD NEW PROJECT' })}
                        shape="round"
                        type="primary"
                    >
                        New Project
                    </Button>
                }
                title="MY PROJECT"
                style={{
                    backgroundColor: '#f2eae5',
                }}
            >
                <Table
                    bordered={false}
                    columns={columnsPreparation}
                    dataSource={projectList}
                    scroll={{ x: true }}
                    showSorterTooltip={false}
                />
            </Card>
            <ModalProjectComponent
                form={formProject}
                loading={loading}
                onFinish={onFinishProject}
                onCancel={() => setModalProject({ open: false })}
                open={modalProject.open}
                title={modalProject.title}
            />
            {contextHolder}
        </ContentComponent>
    );
};

export default ProjectPage;
