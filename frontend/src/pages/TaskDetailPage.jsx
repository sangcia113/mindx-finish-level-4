import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Button,
    Card,
    Descriptions,
    Dropdown,
    Form,
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
import dayjs from 'dayjs';

import instanceConnection from '../utils/instanceConnect';
import { ContentComponent, FormComponent } from '../components';

const { Item } = Descriptions;
const { Option } = Select;
const { Text } = Typography;

const itemsBreadcrumb = [
    { title: <Link to={'/'}>Home</Link> },
    { title: <Link to={'/task'}>Task</Link> },
    { title: <Link to={'/task/detail'}>Detail</Link> },
];

const TaskDetailPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const [taskInfo, setTaskInfo] = useState({});
    const [userList, setUserList] = useState([]);
    const [taskUser, setTaskUser] = useState([]);
    const [modalUser, setModalUser] = useState({ open: false, title: '' });

    const [formUser] = Form.useForm();

    const { taskId } = useParams();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    const getTaskInfo = async taskId => {
        try {
            setLoading(true);

            const response = await instanceConnection(accessToken).get(`/task/${taskId}`);

            setTaskInfo(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getUserNotInTask = async taskId => {
        try {
            const response = await instanceConnection(accessToken).get(
                `/task-user/not-in-task/${taskId}`
            );

            setUserList(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getUser = async taskId => {
        try {
            const response = await instanceConnection(accessToken).get(`/task-user/search`, {
                params: {
                    taskId,
                },
            });

            setTaskUser(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const insertUser = async values => {
        try {
            const response = await instanceConnection(accessToken).post(`/task-user`, {
                ...values,
                taskId,
            });

            setModalUser({ open: false });

            api.success({
                description: response.data.msg,
                message: <Text strong>SUCCESS</Text>,
                placement: 'topRight',
            });

            getUser(taskId);
            getUserNotInTask(taskId);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async values => {
        try {
            const response = await instanceConnection(accessToken).put(
                `/task-user/${values._id}`,
                values
            );

            setModalUser({ open: false });

            api.success({
                description: response.data.msg,
                message: <Text strong>SUCCESS</Text>,
                placement: 'topRight',
            });

            getUser(taskId);
            getUserNotInTask(taskId);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async values => {
        try {
            const response = await instanceConnection(accessToken).delete(
                `/task-user/${values._id}`
            );

            api.success({
                description: response.data.msg,
                message: <Text strong>SUCCESS</Text>,
                placement: 'topRight',
            });

            getUser(taskId);
            getUserNotInTask(taskId);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const onFinishUser = async values => {
        values._id ? updateUser(values) : await insertUser(values);
    };

    useEffect(() => {
        getTaskInfo(taskId);
        getUserNotInTask(taskId);
        getUser(taskId);
    }, []);

    const columnsTask = [
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
                                        Edit Member
                                    </Text>
                                ),
                                onClick: () => {
                                    formUser.setFieldsValue({
                                        ...record,
                                        userId: record.userId._id,
                                    });
                                    setModalUser({ open: true, title: 'EDIT USER' });
                                },
                            },
                            {
                                key: '2',
                                label: (
                                    <Popconfirm
                                        description="Are you sure to delete this member?"
                                        onConfirm={() => deleteUser(record)}
                                        title="Delete the member?"
                                    >
                                        <Text strong style={{ color: '#cf1322', fontSize: 14 }}>
                                            Delete Member
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
    ];

    const formFieldsUser = [
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

    return (
        <ContentComponent loading={loading} items={itemsBreadcrumb}>
            <Card
                bordered={false}
                style={{
                    backgroundColor: '#f2eae5',
                }}
            >
                <Descriptions
                    layout="vertical"
                    title={<Text strong>Task Summary - {taskInfo?.stageId?.stageName}</Text>}
                >
                    <Item label="Task Code">
                        <Text strong>{taskInfo.taskCode}</Text>
                    </Item>
                    <Item label="Task Name">
                        <Text strong>{taskInfo?.taskName?.toUpperCase()}</Text>
                    </Item>
                    <Item label="Created By">
                        <Text strong>{taskInfo?.createdBy?.fullName?.toUpperCase()}</Text>
                    </Item>
                    <Item label="Start Date">{dayjs(taskInfo.startDate).format('DD/MM/YYYY')}</Item>
                    <Item label="End Date">{dayjs(taskInfo.deadline).format('DD/MM/YYYY')}</Item>
                    <Item label="Created Date">
                        {dayjs(taskInfo.createdDate).format('DD/MM/YYYY')}
                    </Item>
                    <Item label="Status">
                        <Tag
                            color={(() => {
                                switch (taskInfo.status) {
                                    case 'Open':
                                        return 'blue';
                                    case 'In Progress':
                                        return 'geekblue';
                                    case 'In Review':
                                        return 'magenta';
                                    case 'Done':
                                        return 'green';
                                    case 'Re-Open':
                                        return 'purple';
                                    case 'Cancel':
                                        return 'red';
                                    default:
                                        break;
                                }
                            })()}
                            style={{ fontSize: 18 }}
                        >
                            {taskInfo.status}
                        </Tag>
                    </Item>
                    <Item label="Description">{taskInfo.description}</Item>
                    <Item label="Type / Priority">
                        {taskInfo.taskType} / {taskInfo.priority}
                    </Item>
                </Descriptions>
            </Card>
            <Card
                bordered={false}
                extra={
                    <Button
                        icon={<PlusCircleFilled style={{ fontSize: 18, paddingTop: 2 }} />}
                        onClick={() => setModalUser({ open: true, title: 'ADD NEW USER' })}
                        shape="round"
                        style={{ color: '#08979c' }}
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
                <Table columns={columnsTask} dataSource={taskUser} />
            </Card>
            <Modal
                afterClose={() => formUser.resetFields()}
                centered
                closeIcon={false}
                okButtonProps={{ loading: loading }}
                onCancel={() => setModalUser({ open: false })}
                onOk={() => formUser.submit()}
                open={modalUser.open}
                title={modalUser.title}
                width={480}
                styles={{
                    header: { paddingBottom: 20, textAlign: 'center' },
                    footer: { paddingTop: 20, textAlign: 'center' },
                }}
            >
                <FormComponent
                    form={formUser}
                    formFields={formFieldsUser}
                    onFinish={onFinishUser}
                />
            </Modal>
            {contextHolder}
        </ContentComponent>
    );
};

export default TaskDetailPage;
