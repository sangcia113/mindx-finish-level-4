import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import {
    Button,
    Card,
    DatePicker,
    Descriptions,
    Dropdown,
    Form,
    Input,
    Modal,
    Popconfirm,
    Select,
    Table,
    Tag,
    Typography,
    notification,
} from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

import { ContentComponent, FormComponent } from '../components';
import instanceConnection from '../utils/instanceConnect';
import { USER_ROLE } from '../constants';

const { Item } = Descriptions;
const { Option } = Select;
const { Text } = Typography;

const itemsBreadcrumb = [
    { title: <Link to={'/'}>Home</Link> },
    { title: <Link to={'/project'}>Project</Link> },
    { title: <Link to={'/project/detail'}>Detail</Link> },
];

const ProjectDetailPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const [projectInfo, setProjectInfo] = useState({});
    const [projectUser, setUserProject] = useState([]);
    const [projectStage, setProjectStage] = useState([]);
    const [userList, setUserList] = useState([]);

    const [modalUserProject, setModalUserProject] = useState({
        open: false,
        title: '',
    });

    const [modalStageProject, setModalStageProject] = useState({
        open: false,
        title: '',
    });

    const [formUserProject] = Form.useForm();
    const [formStageProject] = Form.useForm();

    const { projectId } = useParams();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    const getProjectInfo = async projectId => {
        try {
            setLoading(true);

            const response = await instanceConnection(accessToken).get(`/project/${projectId}`);

            setProjectInfo(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getStageProject = async projectId => {
        try {
            const response = await instanceConnection(accessToken).get(`/stage/search`, {
                params: {
                    projectId,
                },
            });

            setProjectStage(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const insertStageProject = async values => {
        try {
            const response = await instanceConnection(accessToken).post(`/stage`, {
                ...values,
                startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
                endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
                projectId,
            });

            setModalStageProject({ open: false });

            api.success({
                description: response.data.msg,
                message: <Text strong>SUCCESS</Text>,
                placement: 'topRight',
            });

            getStageProject(projectId);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStageProject = async values => {
        try {
            const response = await instanceConnection(accessToken).put(`/stage/${values._id}`, {
                ...values,
                startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
                endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
            });

            setModalStageProject({ open: false });

            api.success({
                description: response.data.msg,
                message: <Text strong>SUCCESS</Text>,
                placement: 'topRight',
            });

            getStageProject(projectId);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteStageProject = async values => {
        try {
            const response = await instanceConnection(accessToken).delete(`/stage/${values._id}`);

            setModalStageProject({ open: false });

            api.success({
                description: response.data.msg,
                message: <Text strong>SUCCESS</Text>,
                placement: 'topRight',
            });

            getStageProject(projectId);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getUserProject = async projectId => {
        try {
            setLoading(true);

            const response = await instanceConnection(accessToken).get(`/user-project/search`, {
                params: {
                    projectId,
                },
            });

            setUserProject(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const insertUserProject = async values => {
        try {
            const response = await instanceConnection(accessToken).post(`/user-project`, {
                ...values,
                projectId,
            });

            setModalUserProject({ open: false });

            api.success({
                description: response.data.msg,
                message: <Text strong>SUCCESS</Text>,
                placement: 'topRight',
            });

            getUserProject(projectId);
            getUserNotInProject(projectId);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateUserProject = async values => {
        try {
            const response = await instanceConnection(accessToken).put(
                `/user-project/${values._id}`,
                values
            );

            setModalUserProject({ open: false });

            api.success({
                description: response.data.msg,
                message: <Text strong>SUCCESS</Text>,
                placement: 'topRight',
            });

            getUserProject(projectId);
            getUserNotInProject(projectId);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUserProject = async values => {
        try {
            const response = await instanceConnection(accessToken).delete(
                `/user-project/${values._id}`
            );

            api.success({
                description: response.data.msg,
                message: <Text strong>SUCCESS</Text>,
                placement: 'topRight',
            });

            getUserProject(projectId);
            getUserNotInProject(projectId);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getUserNotInProject = async projectId => {
        try {
            const response = await instanceConnection(accessToken).get(
                `/user-project/not-in-project/${projectId}`
            );

            setUserList(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const onFinishUserProject = async values => {
        values._id ? await updateUserProject(values) : await insertUserProject(values);
    };

    const onFinishStage = async values => {
        values._id ? await updateStageProject(values) : insertStageProject(values);
    };

    useEffect(() => {
        getProjectInfo(projectId);
        getStageProject(projectId);
        getUserProject(projectId);
        getUserNotInProject(projectId);
    }, []);

    const formFields = [
        {
            label: <Text strong>Project Role</Text>,
            name: 'role',
            rules: [{ required: true, message: 'You have not selected project role!' }],
            typeInput: (
                <Select
                    allowClear
                    placeholder="Select role from the list below..."
                    style={{ width: '100%' }}
                >
                    {USER_ROLE.map(
                        (item, index) =>
                            index !== 0 && (
                                <Option key={item} value={item}>
                                    {item}
                                </Option>
                            )
                    )}
                </Select>
            ),
        },
        {
            label: <Text strong>User List</Text>,
            name: 'userId',
            rules: [{ required: true, message: 'You have not selected user list!' }],
            typeInput: (
                <Select
                    allowClear
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    placeholder="Select user from the list below..."
                    showSearch
                    style={{ width: '100%' }}
                >
                    {userList.map(item => {
                        return (
                            <Option key={item._id} value={item._id}>
                                {item.fullName}
                            </Option>
                        );
                    })}
                </Select>
            ),
        },
    ];

    const formFieldsStage = [
        {
            label: <Text strong>Stage Name</Text>,
            name: 'stageName',
            rules: [{ required: true, message: 'You have not selected stage name!' }],
            typeInput: (
                <Input
                    allowClear
                    maxLength={100}
                    minLength={5}
                    placeholder="Enter stage name..."
                    showCount
                />
            ),
        },
        {
            label: <Text strong>Start Date</Text>,
            name: 'startDate',
            rules: [{ required: true, message: 'You have not selected start date!' }],
            typeInput: (
                <DatePicker
                    allowClear={false}
                    format={'DD/MM/YYYY'}
                    inputReadOnly
                    placeholder="Select start date..."
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            label: <Text strong>End Date</Text>,
            name: 'endDate',
            rules: [{ required: true, message: 'You have not selected end date!' }],
            typeInput: (
                <DatePicker
                    allowClear={false}
                    format={'DD/MM/YYYY'}
                    inputReadOnly
                    placeholder="Select end date..."
                    style={{ width: '100%' }}
                />
            ),
        },
    ];

    const columns = [
        {
            key: 'action',
            dataIndex: 'action',
            title: '',
            fixed: 'left',
            width: 100,
            render: (_, record) => (
                <Dropdown
                    arrow={true}
                    menu={{
                        items: [
                            {
                                key: '1',
                                label: (
                                    <Text strong style={{ color: '#ffc53d', fontSize: 14 }}>
                                        User Edit
                                    </Text>
                                ),
                                onClick: () => {
                                    formUserProject.setFieldsValue({
                                        ...record,
                                        userId: record.userId._id,
                                    });
                                    setModalUserProject({ open: true, title: 'EDIT USER' });
                                },
                            },
                            {
                                key: '2',
                                label: (
                                    <Popconfirm
                                        description="Are you sure to delete this member?"
                                        onConfirm={() => deleteUserProject(record)}
                                        title="Delete the member?"
                                    >
                                        <Text strong style={{ color: '#cf1322', fontSize: 14 }}>
                                            User Delete
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
            key: 'userId',
            dataIndex: 'userId',
            title: 'User',
            ellipsis: true,
            render: record => <Text strong>{record.fullName}</Text>,
        },
        {
            key: 'role',
            dataIndex: 'role',
            title: 'Role',
            ellipsis: true,
        },
        {
            key: 'dateOfJoin',
            dataIndex: 'dateOfJoin',
            title: 'Date of Join',
            ellipsis: true,
            render: record => dayjs(record).format('DD/MM/YYYY'),
        },
    ];

    const columnsStage = [
        {
            key: 'action',
            dataIndex: 'action',
            title: '',
            fixed: 'left',
            width: 100,
            render: (_, record) => (
                <Dropdown
                    arrow={true}
                    menu={{
                        items: [
                            {
                                key: '1',
                                label: (
                                    <Text strong style={{ color: '#ffc53d', fontSize: 14 }}>
                                        Stage Edit
                                    </Text>
                                ),
                                onClick: () => {
                                    formStageProject.setFieldsValue({
                                        ...record,
                                        startDate: dayjs(record.startDate),
                                        endDate: dayjs(record.endDate),
                                    });
                                    setModalStageProject({ open: true, title: 'EDIT STAGE' });
                                },
                            },
                            {
                                key: '2',
                                label: (
                                    <Popconfirm
                                        description="Are you sure to delete this stage?"
                                        onConfirm={() => deleteStageProject(record)}
                                        title="Delete the stage?"
                                    >
                                        <Text strong style={{ color: '#cf1322', fontSize: 14 }}>
                                            Stage Delete
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
            key: 'stageName',
            dataIndex: 'stageName',
            title: 'Stage',
            ellipsis: true,
            render: (_, record) => (
                // <Link to={`/task/${record._id}`}>
                <Text strong>{record.stageName}</Text>
                // </Link>
            ),
        },
        {
            key: 'startDate',
            dataIndex: 'startDate',
            title: 'Start Date',
            ellipsis: true,
            render: record => dayjs(record).format('DD/MM/YYYY'),
        },
        {
            key: 'endDate',
            dataIndex: 'endDate',
            title: 'End Date',
            ellipsis: true,
            render: record => dayjs(record).format('DD/MM/YYYY'),
        },
        {
            key: 'dueDate',
            dataIndex: 'dueDate',
            title: 'Due Date',
            ellipsis: true,
            render: record => record?.dayjs(record).format('DD/MM/YYYY'),
        },
    ];

    return (
        <ContentComponent loading={loading} items={itemsBreadcrumb}>
            <Card
                bordered={false}
                style={{
                    backgroundColor: '#f2eae5',
                }}
            >
                <Descriptions layout="vertical" title="Project Summary">
                    <Item label="Project Code">
                        <Text strong>{projectInfo.projectCode}</Text>
                    </Item>
                    <Item label="Project Name">
                        <Text strong>{projectInfo?.projectName?.toUpperCase()}</Text>
                    </Item>
                    <Item label="Project Owner">
                        <Text strong>{projectInfo?.owner?.fullName.toUpperCase()}</Text>
                    </Item>
                    <Item label="Start Date">
                        {dayjs(projectInfo.startDate).format('DD/MM/YYYY')}
                    </Item>
                    <Item label="End Date">{dayjs(projectInfo.endDate).format('DD/MM/YYYY')}</Item>
                    <Item label="Created Date">
                        {dayjs(projectInfo.createdDate).format('DD/MM/YYYY')}
                    </Item>
                    <Item label="Status">
                        <Tag
                            color={(() => {
                                switch (projectInfo.status) {
                                    case 'Preparing':
                                        return 'blue';
                                    case 'In Progress':
                                        return 'geekblue';
                                    case 'Suspended':
                                        return 'magenta';
                                    case 'Completed':
                                        return 'green';
                                    default:
                                        break;
                                }
                            })()}
                            style={{ fontSize: 18 }}
                        >
                            {projectInfo.status}
                        </Tag>
                    </Item>
                    <Item label="Description">{projectInfo.description}</Item>
                </Descriptions>
            </Card>
            <Card
                bordered={false}
                extra={
                    <Button
                        icon={<PlusCircleFilled style={{ fontSize: 18, paddingTop: 2 }} />}
                        onClick={() => setModalStageProject({ open: true, title: 'ADD NEW STAGE' })}
                        shape="round"
                        style={{ color: '#08979c' }}
                    >
                        New Stage
                    </Button>
                }
                title="Stage List"
                style={{
                    backgroundColor: '#f2eae5',
                    marginTop: 10,
                }}
            >
                <Table columns={columnsStage} dataSource={projectStage} />
            </Card>
            <Card
                bordered={false}
                extra={
                    <Button
                        icon={<PlusCircleFilled style={{ fontSize: 18, paddingTop: 2 }} />}
                        onClick={() => setModalUserProject({ open: true, title: 'ADD NEW USER' })}
                        shape="round"
                        style={{ color: '#108ee9' }}
                    >
                        New User
                    </Button>
                }
                title="User List"
                style={{
                    backgroundColor: '#f2eae5',
                    marginTop: 10,
                }}
            >
                <Table columns={columns} dataSource={projectUser} />
            </Card>
            <Modal
                afterClose={() => formUserProject.resetFields()}
                centered
                closeIcon={false}
                okButtonProps={{ loading: loading }}
                onCancel={() => setModalUserProject({ open: false })}
                onOk={() => formUserProject.submit()}
                open={modalUserProject.open}
                title={modalUserProject.title}
                width={480}
                styles={{
                    header: { paddingBottom: 20, textAlign: 'center' },
                    footer: { paddingTop: 20, textAlign: 'center' },
                }}
            >
                <FormComponent
                    form={formUserProject}
                    formFields={formFields}
                    onFinish={onFinishUserProject}
                />
            </Modal>
            <Modal
                afterClose={() => formStageProject.resetFields()}
                centered
                closeIcon={false}
                okButtonProps={{ loading: loading }}
                onCancel={() => setModalStageProject({ open: false })}
                onOk={() => formStageProject.submit()}
                open={modalStageProject.open}
                title={modalStageProject.title}
                width={480}
                styles={{
                    header: { paddingBottom: 20, textAlign: 'center' },
                    footer: { paddingTop: 20, textAlign: 'center' },
                }}
            >
                <FormComponent
                    form={formStageProject}
                    formFields={formFieldsStage}
                    onFinish={onFinishStage}
                />
            </Modal>
            {contextHolder}
        </ContentComponent>
    );
};

export default ProjectDetailPage;
