import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Link, useParams } from 'react-router-dom';

import {
    Button,
    Card,
    Col,
    DatePicker,
    Dropdown,
    Flex,
    Form,
    Input,
    Modal,
    Popconfirm,
    Row,
    Select,
    Space,
    Typography,
    notification,
    theme,
} from 'antd';
import { PlusCircleFilled, SearchOutlined } from '@ant-design/icons';

import { ContentComponent, FormComponent } from '../components';
import instanceConnection from '../utils/instanceConnect';
import { TASK_PRIORITY, TASK_TYPE } from '../constants';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

const itemsBreadcrumb = [
    { title: <Link to={'/'}>Home</Link> },
    { title: <Link to={'/task'}>Task</Link> },
];

const defaultColumns = {
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
};

const droppableIdToStatus = {
    open: 'Open',
    inProgress: 'In Progress',
    inReview: 'In Review',
    done: 'Done',
    reOpen: 'Re-Open',
    cancel: 'Cancel',
};

const TaskPage = () => {
    console.log('Run TaskPage...');
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
    const [projectList, setProjectList] = useState([]);
    const [stageList, setStageList] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [stageId, setStageId] = useState(null);
    const [columns, setColumns] = useState(defaultColumns);
    const [modalTask, setModalTask] = useState({ open: false, title: '' });
    const {
        token: { colorBgLayout, colorTextTertiary },
    } = theme.useToken();

    const [formTask] = Form.useForm();

    // const { stageId } = useParams();

    const accessToken =
        localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    const getProject = async () => {
        try {
            const response = await instanceConnection(accessToken).get(`/project`);

            setProjectList(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getStage = async projectId => {
        try {
            const response = await instanceConnection(accessToken).get(`/stage/search`, {
                params: { projectId },
            });

            setStageList(response.data.map(item => ({ ...item, key: item._id })));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getTask = async stageId => {
        try {
            const response = await instanceConnection(accessToken).get(`/task/search`, {
                params: {
                    stageId,
                },
            });

            const tasks = response.data;

            const newColumns = {
                open: { name: 'Open', items: [] },
                inProgress: { name: 'In Progress', items: [] },
                inReview: { name: 'In Review', items: [] },
                done: { name: 'Done', items: [] },
                reOpen: { name: 'Re-Open', items: [] },
                cancel: { name: 'Cancel', items: [] },
            };

            tasks.forEach(task => {
                switch (task.status) {
                    case 'Open':
                        newColumns.open.items.push({
                            ...task,
                            content: task.taskName,
                        });
                        break;
                    case 'In Progress':
                        newColumns.inProgress.items.push({
                            ...task,
                            content: task.taskName,
                        });
                        break;
                    case 'In Review':
                        newColumns.inReview.items.push({
                            ...task,
                            content: task.taskName,
                        });
                        break;
                    case 'Done':
                        newColumns.done.items.push({
                            ...task,
                            content: task.taskName,
                        });
                        break;
                    case 'Re-Open':
                        newColumns.reOpen.items.push({
                            ...task,
                            content: task.taskName,
                        });
                        break;
                    case 'Cancel':
                        newColumns.cancel.items.push({
                            ...task,
                            content: task.taskName,
                        });
                        break;
                    default:
                        break;
                }
            });

            setColumns(newColumns);
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

    const updateTaskStatus = async (taskId, status) => {
        try {
            await instanceConnection(accessToken).put(`/task/status/${taskId}`, {
                status,
            });
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

    const onDragEnd = async (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;

        setColumns(prevColumns => {
            const newColumns = { ...prevColumns };

            if (source.droppableId !== destination.droppableId) {
                const sourceColumn = prevColumns[source.droppableId];
                const destColumn = prevColumns[destination.droppableId];
                const sourceItems = [...sourceColumn.items];
                const destItems = [...destColumn.items];
                const [removed] = sourceItems.splice(source.index, 1);
                destItems.splice(destination.index, 0, removed);
                newColumns[source.droppableId] = {
                    ...sourceColumn,
                    items: sourceItems,
                };
                newColumns[destination.droppableId] = {
                    ...destColumn,
                    items: destItems,
                };

                // Call API to update task status
                const taskId = removed._id;
                const newStatus = droppableIdToStatus[destination.droppableId];
                updateTaskStatus(taskId, newStatus);
            } else {
                const column = prevColumns[source.droppableId];
                const copiedItems = [...column.items];
                const [removed] = copiedItems.splice(source.index, 1);
                copiedItems.splice(destination.index, 0, removed);
                newColumns[source.droppableId] = {
                    ...column,
                    items: copiedItems,
                };
            }

            return newColumns;
        });
    };

    useEffect(() => {
        getProject();
        // getTask(stageId);
    }, []);

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
                        onClick={() => {
                            if (!stageId) {
                                api.warning({
                                    description: 'Please select stage...',
                                    message: <Text strong>WARNING</Text>,
                                    placement: 'topRight',
                                });
                            } else {
                                setModalTask({ open: true, title: 'ADD NEW TASK' });
                            }
                        }}
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
                <Row gutter={16}>
                    <Flex align="self-end" style={{ width: '100%' }}>
                        <Col sm={10}>
                            <Space size={'small'} direction="vertical" style={{ width: '100%' }}>
                                <Text strong>Project</Text>
                                <Select
                                    allowClear
                                    onChange={e => {
                                        getStage(e);
                                        setStageId(null);
                                        setColumns(defaultColumns);
                                    }}
                                    placeholder="Select project from the list below..."
                                    style={{ width: '100%' }}
                                >
                                    {projectList.map(item => (
                                        <Option key={item._id} value={item._id}>
                                            {item.projectName}
                                        </Option>
                                    ))}
                                </Select>
                            </Space>
                        </Col>
                        <Col sm={10}>
                            <Space size={'small'} direction="vertical" style={{ width: '100%' }}>
                                <Text strong>Stage</Text>
                                <Select
                                    allowClear
                                    onChange={e => {
                                        setStageId(e);
                                        setColumns(defaultColumns);
                                    }}
                                    placeholder="Select stage from the list below..."
                                    value={stageId}
                                    style={{ width: '100%' }}
                                >
                                    {stageList.map(item => (
                                        <Option key={item._id} value={item._id}>
                                            {item.stageName}
                                        </Option>
                                    ))}
                                </Select>
                            </Space>
                        </Col>
                        <Col sm={4}>
                            <Button
                                icon={<SearchOutlined style={{ fontSize: 18, paddingTop: 2 }} />}
                                onClick={() => {
                                    if (!stageId) {
                                        api.warning({
                                            description: 'Please select stage...',
                                            message: <Text strong>WARNING</Text>,
                                            placement: 'topRight',
                                        });
                                    } else {
                                        getTask(stageId);
                                    }
                                }}
                                shape="round"
                                style={{ color: '#1677ff' }}
                            >
                                Search
                            </Button>
                        </Col>
                    </Flex>
                </Row>
                <Row gutter={16} style={{ marginTop: 50 }}>
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
                                                    : '#ebdfd7',
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
                                                        <Dropdown
                                                            menu={{
                                                                items: [
                                                                    {
                                                                        key: '1',
                                                                        label: (
                                                                            <Link
                                                                                to={`/task/detail/${item._id}`}
                                                                            >
                                                                                <Text
                                                                                    strong
                                                                                    style={{
                                                                                        color: '#2db7f5',
                                                                                        fontSize: 14,
                                                                                    }}
                                                                                >
                                                                                    Task Detail
                                                                                </Text>
                                                                            </Link>
                                                                        ),
                                                                    },
                                                                    {
                                                                        key: '2',
                                                                        label: (
                                                                            <Text
                                                                                strong
                                                                                style={{
                                                                                    color: '#ffc53d',
                                                                                    fontSize: 14,
                                                                                }}
                                                                            >
                                                                                Task Edit
                                                                            </Text>
                                                                        ),
                                                                        onClick: () => {
                                                                            formTask.setFieldsValue(
                                                                                {
                                                                                    ...item,
                                                                                    startDate:
                                                                                        dayjs(
                                                                                            item.startDate
                                                                                        ),
                                                                                    deadline: dayjs(
                                                                                        item.deadline
                                                                                    ),
                                                                                }
                                                                            );
                                                                            setModalTask({
                                                                                open: true,
                                                                                title: 'EDIT TASK',
                                                                            });
                                                                        },
                                                                    },
                                                                    {
                                                                        key: '3',
                                                                        label: (
                                                                            <Popconfirm
                                                                                description="Are you sure to delete this project?"
                                                                                onConfirm={() =>
                                                                                    deleteTask(item)
                                                                                }
                                                                                title="Delete the task?"
                                                                            >
                                                                                <Text
                                                                                    strong
                                                                                    style={{
                                                                                        color: '#cf1322',
                                                                                        fontSize: 14,
                                                                                    }}
                                                                                >
                                                                                    Task Delete
                                                                                </Text>
                                                                            </Popconfirm>
                                                                        ),
                                                                    },
                                                                ],
                                                            }}
                                                            trigger={['contextMenu']}
                                                        >
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    userSelect: 'none',
                                                                    padding: 16,
                                                                    margin: '0 0 8px 0',
                                                                    minHeight: '50px',
                                                                    backgroundColor:
                                                                        snapshot.isDragging
                                                                            ? '#263B4A'
                                                                            : '#456C86',
                                                                    color: 'white',
                                                                    ...provided.draggableProps
                                                                        .style,
                                                                }}
                                                            >
                                                                {item.taskName}
                                                            </div>
                                                        </Dropdown>
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
                okButtonProps={{ loading: loading }}
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
