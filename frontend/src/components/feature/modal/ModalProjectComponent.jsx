import React from 'react';
import { DatePicker, Form, Input, Modal, Select, Typography } from 'antd';
import { PROJECT_STATUS } from '../../../constants';

const { Item } = Form;
const { Option } = Select;
const { Text } = Typography;
const { TextArea } = Input;

const ModalProjectComponent = ({ loading, onCancel, open, title, form, onFinish }) => {
    return (
        <Modal
            afterClose={() => form.resetFields()}
            centered
            closeIcon={false}
            okButtonProps={{ loading }}
            onCancel={onCancel}
            onOk={() => form.submit()}
            open={open}
            title={title}
            width={520}
            styles={{
                header: { paddingBottom: 20, textAlign: 'center' },
                footer: { paddingTop: 20, textAlign: 'center' },
            }}
        >
            <Form
                colon={false}
                form={form}
                initialValues={{ projectStatus: 0 }}
                labelAlign={'left'}
                labelCol={{
                    xs: { span: 24 },
                    md: { span: 8 },
                }}
                labelWrap
                wrapperCol={{
                    xs: { span: 24 },
                    md: { span: 16 },
                }}
                onFinish={onFinish}
            >
                <Item name="_id" hidden>
                    <Input />
                </Item>
                <Item
                    label={<Text strong>Project Name</Text>}
                    name="projectName"
                    rules={[{ required: true, message: 'You have not entered a project name!' }]}
                >
                    <Input
                        allowClear
                        maxLength={50}
                        minLength={5}
                        placeholder="Enter project name..."
                        showCount
                    />
                </Item>
                <Item
                    label={<Text strong>Start Date</Text>}
                    name="startDate"
                    rules={[{ required: true, message: 'You have not entered a start date!' }]}
                >
                    <DatePicker
                        allowClear={false}
                        format={'DD/MM/YYYY'}
                        inputReadOnly
                        placeholder="Select start date..."
                        style={{ width: '100%' }}
                    />
                </Item>
                <Item
                    label={<Text strong>End Date</Text>}
                    name="endDate"
                    rules={[{ required: true, message: 'You have not entered a end date!' }]}
                >
                    <DatePicker
                        allowClear={false}
                        format={'DD/MM/YYYY'}
                        inputReadOnly
                        placeholder="Select end date..."
                        style={{ width: '100%' }}
                    />
                </Item>
                <Item
                    label={<Text strong>Description</Text>}
                    name="description"
                    rules={[{ required: true, message: 'You have not entered a description!' }]}
                >
                    <TextArea allowClear maxLength={500} minLength={5} rows={3} showCount />
                </Item>
                {/* <Item
                    label={<Text strong>Project Status</Text>}
                    name="projectStatus"
                    rules={[{ required: true, message: 'You have not selected project status!' }]}
                >
                    <Select
                        allowClear
                        placeholder="Select Project Status from the list below..."
                        style={{ width: '100%' }}
                    >
                        {PROJECT_STATUS.map((item, index) => (
                            <Option key={index} value={index}>
                                {item}
                            </Option>
                        ))}
                    </Select>
                </Item> */}
            </Form>
        </Modal>
    );
};

export default ModalProjectComponent;
