import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Link, useParams } from 'react-router-dom';

import {
    Button,
    Card,
    Col,
    DatePicker,
    Dropdown,
    Form,
    Input,
    Modal,
    Popconfirm,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Typography,
    notification,
} from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

import { ContentComponent, FormComponent } from '../components';
import instanceConnection from '../utils/instanceConnect';
import { TASK_PRIORITY, TASK_STATUS, TASK_TYPE } from '../constants';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

const itemsBreadcrumb = [
    { title: <Link to={'/'}>Home</Link> },
    { title: <Link to={'/task'}>Task</Link> },
];

// const tasks = [
//     { _id: '1', content: 'First task' },
//     { _id: '2', content: 'Second task' },
//     { _id: '3', content: 'Third task' },
//     { _id: '4', content: 'Fourth task' },
//     { _id: '5', content: 'Fifth task' },
// ];

// const taskStatus = {
//     open: {
//         name: 'Open',
//         items: tasks,
//     },
//     inProgress: {
//         name: 'In Progress',
//         items: [],
//     },
//     inReview: {
//         name: 'In Review',
//         items: [],
//     },
//     done: {
//         name: 'Done',
//         items: [],
//     },
//     reOpen: {
//         name: 'Re-Open',
//         items: [],
//     },
//     cancel: {
//         name: 'Cancel',
//         items: [],
//     },
// };

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems,
            },
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems,
            },
        });
    }
};

const TaskPage = () => {
    console.log('Run TaskPage...');
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [columns, setColumns] = useState({
        open: {
            name: 'Open',
            items: [],
        },
        inProgress: {
            name: 'In Progress',
            items: [],
        },
        inReview: {
            name: 'In Review',
            items: [],
        },
        done: {
            name: 'Done',
            items: [],
        },
        reOpen: {
            name: 'Re-Open',
            items: [],
        },
        cancel: {
            name: 'Cancel',
            items: [],
        },
    });
    const [modalTask, setModalTask] = useState({ open: false, title: '' });

    const [formTask] = Form.useForm();

    const { stageId } = useParams();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    const getTask = async stageId => {
        try {
            const response = await instanceConnection(accessToken).get(`/task/search`, {
                params: {
                    stageId,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const insertTask = async values => {
        try {
            const response = await instanceConnection(accessToken).post(`/task`, {
                ...values,
                startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
                deadline: dayjs(values.deadline).format('YYYY-MM-DD'),
                stageId,
            });

            setModalTask({ open: false });

            api.success({
                description: response.data.msg,
                message: <Text strong>SUCCESS</Text>,
                placement: 'topRight',
            });

            getTask(stageId);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async values => {
        try {
            const response = await instanceConnection(accessToken).put(`/task/${values._id}`, {
                ...values,
                startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
                deadline: dayjs(values.deadline).format('YYYY-MM-DD'),
            });

            setModalTask({ open: false });

            api.success({
                description: response.data.msg,
                message: <Text strong>SUCCESS</Text>,
                placement: 'topRight',
            });

            getTask(stageId);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async values => {
        try {
            const response = await instanceConnection(accessToken).delete(`/task/${values._id}`);

            setModalTask({ open: false });

            api.success({
                description: response.data.msg,
                message: <Text strong>SUCCESS</Text>,
                placement: 'topRight',
            });

            getTask(stageId);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const onFinishTask = async values => {
        values._id ? await updateTask(values) : await insertTask(values);
    };

    useEffect(() => {
        getTask(stageId);
    }, []);

    const columnsTask = [
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
                                    <Link to={`/task/detail/${record._id}`}>
                                        <Text strong style={{ color: '#2db7f5', fontSize: 14 }}>
                                            Detail Task
                                        </Text>
                                    </Link>
                                ),
                            },
                            {
                                key: '2',
                                label: (
                                    <Text strong style={{ color: '#ffc53d', fontSize: 14 }}>
                                        Edit Task
                                    </Text>
                                ),
                                onClick: () => {
                                    formTask.setFieldsValue({
                                        ...record,
                                        startDate: dayjs(record.startDate),
                                        deadline: dayjs(record.deadline),
                                    });
                                    setModalTask({ open: true, title: 'EDIT TASK' });
                                },
                            },
                            {
                                key: '3',
                                label: (
                                    <Popconfirm
                                        description="Are you sure to delete this project?"
                                        onConfirm={() => deleteTask(record)}
                                        title="Delete the task?"
                                    >
                                        <Text strong style={{ color: '#cf1322', fontSize: 14 }}>
                                            Delete Task
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
            key: 'task',
            dataIndex: 'task',
            title: 'Task',
            ellipsis: true,
            render: (_, record) => (
                <Space direction="vertical">
                    <Link to={`/task/detail/${record._id}`}>
                        <Text strong style={{ color: '#1677ff', fontSize: 14 }}>
                            # {record.taskCode}
                        </Text>
                    </Link>
                    <Text strong>
                        {record.taskName.length > 20
                            ? `${record.taskName.slice(0, 20).toUpperCase()}...`
                            : record.taskName.toUpperCase()}
                    </Text>
                    <Text strong style={{ color: '#6e6e6e', fontSize: 14 }}>
                        Created on {dayjs(record.createdDate).format('MMM DD, YYYY')}
                    </Text>
                </Space>
            ),
        },
        {
            key: 'createdBy',
            dataIndex: 'createdBy',
            title: 'Created By',
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
                        End date on{' '}
                        {record.deadline && dayjs(record.deadline).format('MMM DD, YYYY')}
                    </Text>
                    <Text strong style={{ color: '#6e6e6e', fontSize: 14 }}>
                        Due date on {record.dueDate && dayjs(record.dueDate).format('MMM DD, YYYY')}
                    </Text>
                </Space>
            ),
        },
        {
            key: 'taskType',
            dataIndex: 'taskType',
            title: 'Type / Priority',
            ellipsis: true,
            render: (_, record) => (
                <Space direction="vertical">
                    <Tag
                        bordered={false}
                        color="#108ee9"
                        style={{
                            borderRadius: 20,
                            fontSize: 16,
                            height: 36,
                            paddingTop: 6,
                        }}
                    >
                        {record.taskType}
                    </Tag>
                    <Tag
                        bordered={false}
                        color="#f50"
                        style={{
                            borderRadius: 20,
                            fontSize: 16,
                            height: 36,
                            paddingTop: 6,
                        }}
                    >
                        {record.priority}
                    </Tag>
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
                    case 'Open':
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
                    case 'In Review':
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
                    case 'Done':
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
                    case 'Re-Open':
                        return (
                            <Tag
                                bordered={false}
                                color="#52f4ba"
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
                    case 'Cancel':
                        return (
                            <Tag
                                bordered={false}
                                color="#53a4ba"
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

    const formFieldsTask = [
        {
            label: <Text strong>Task Name</Text>,
            name: 'taskName',
            rules: [{ required: true, message: 'You have not entered task name!' }],
            typeInput: (
                <Input
                    allowClear
                    maxLength={100}
                    minLength={5}
                    placeholder="Enter task name..."
                    showCount
                />
            ),
        },
        {
            label: <Text strong>Task Type</Text>,
            name: 'taskType',
            rules: [{ required: true, message: 'You have not selected task type!' }],
            typeInput: (
                <Select
                    allowClear
                    placeholder="Select type from the list below..."
                    style={{ width: '100%' }}
                >
                    {TASK_TYPE.map(item => (
                        <Option key={item} value={item}>
                            {item}
                        </Option>
                    ))}
                </Select>
            ),
        },
        {
            label: <Text strong>Task Priority</Text>,
            name: 'priority',
            rules: [{ required: true, message: 'You have not selected priority!' }],
            typeInput: (
                <Select
                    allowClear
                    placeholder="Select priority from the list below..."
                    style={{ width: '100%' }}
                >
                    {TASK_PRIORITY.map(item => (
                        <Option key={item} value={item}>
                            {item}
                        </Option>
                    ))}
                </Select>
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
            label: <Text strong>Deadline</Text>,
            name: 'deadline',
            rules: [{ required: true, message: 'You have not entered deadline!' }],
            typeInput: (
                <DatePicker
                    allowClear={false}
                    format={'DD/MM/YYYY'}
                    inputReadOnly
                    placeholder="Select deadline..."
                    style={{ width: '100%' }}
                />
            ),
        },
        {
            label: <Text strong>Task Description</Text>,
            name: 'description',
            rules: [{ required: true, message: 'You have not entered description!' }],
            typeInput: (
                <TextArea
                    allowClear
                    maxLength={100}
                    minLength={5}
                    placeholder="Enter description..."
                    rows={3}
                    showCount
                />
            ),
        },
    ];

    return (
        <ContentComponent items={itemsBreadcrumb} loading={loading}>
            <Card
                bordered={false}
                extra={
                    <Button
                        icon={<PlusCircleFilled style={{ fontSize: 18, paddingTop: 2 }} />}
                        onClick={() => setModalTask({ open: true, title: 'ADD NEW TASK' })}
                        shape="round"
                        type="primary"
                    >
                        New Task
                    </Button>
                }
                title="My Task"
                style={{
                    backgroundColor: '#f2eae5',
                }}
            >
                {/* <Table
                    bordered={false}
                    columns={columnsTask}
                    dataSource={taskList}
                    scroll={{ x: true }}
                    showSorterTooltip={false}
                /> */}
                <Row gutter={16}>
                    <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                        {Object.entries(columns).map(([columnId, column], index) => (
                            <Col xs={24} sm={8} lg={4} key={columnId}>
                                <h3>{column.name}</h3>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{
                                                background: snapshot.isDraggingOver
                                                    ? 'lightblue'
                                                    : 'lightgrey',
                                                padding: 4,
                                                minHeight: 500,
                                            }}
                                        >
                                            {column.items.map((item, index) => (
                                                <Draggable
                                                    key={item._id}
                                                    draggableId={item._id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                userSelect: 'none',
                                                                padding: 16,
                                                                margin: '0 0 8px 0',
                                                                minHeight: '50px',
                                                                backgroundColor: snapshot.isDragging
                                                                    ? '#263B4A'
                                                                    : '#456C86',
                                                                color: 'white',
                                                                ...provided.draggableProps.style,
                                                            }}
                                                        >
                                                            {item.content}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Col>
                        ))}
                    </DragDropContext>
                </Row>
            </Card>
            <Modal
                afterClose={() => formTask.resetFields()}
                centered
                closeIcon={false}
                onCancel={() => setModalTask({ open: false })}
                onOk={() => formTask.submit()}
                open={modalTask.open}
                title={modalTask.title}
                width={480}
                styles={{
                    header: { paddingBottom: 20, textAlign: 'center' },
                    footer: { paddingTop: 20, textAlign: 'center' },
                }}
            >
                <FormComponent
                    form={formTask}
                    formFields={formFieldsTask}
                    onFinish={onFinishTask}
                />
            </Modal>
            {contextHolder}
        </ContentComponent>
    );
};

export default TaskPage;
