import React, { useState } from 'react';
import { Form, Modal, Select, Typography } from 'antd';

const { Item } = Form;
const { Option } = Select;
const { Text } = Typography;

const ModalProjectUserComponent = ({ onCancel, onFinish, open, form, userList = [] }) => {
    const [propsSelect, setPropsSelect] = useState({});

    const handleChange = value => {
        let newPropsSelect = {};

        if (value === '1') {
            newPropsSelect = { maxCount: '3', mode: 'multiple' };
        } else if (value === '2') {
            newPropsSelect = { maxCount: '2', mode: 'multiple' };
        } else if (value === '3') {
            newPropsSelect = { mode: 'multiple' };
        }

        setPropsSelect(newPropsSelect);
        form.setFieldsValue({ projectUser: [] });
    };

    return (
        <Modal
            afterClose={() => form.resetFields()}
            centered
            closeIcon={false}
            onCancel={onCancel}
            onFinish={onFinish}
            onOk={() => form.submit()}
            open={open}
            title={'ADD USER'}
            width={480}
            styles={{
                header: { paddingBottom: 20, textAlign: 'center' },
                footer: { paddingTop: 20, textAlign: 'center' },
            }}
        >
            <Form
                colon={false}
                form={form}
                labelAlign={'left'}
                labelCol={{
                    xs: { span: 24 },
                    md: { span: 10 },
                }}
                labelWrap
                wrapperCol={{
                    xs: { span: 24 },
                    md: { span: 14 },
                }}
                onFinish={onFinish}
            >
                <Item
                    label={<Text strong>Project Role</Text>}
                    name="projectRole"
                    rules={[{ required: true, message: 'You have not selected project role!' }]}
                >
                    <Select
                        allowClear
                        onChange={handleChange}
                        placeholder="Select Project Role from the list below..."
                        style={{ width: '100%' }}
                    >
                        <Option value="1">Project Manager</Option>
                        <Option value="2">Project Supervisor</Option>
                        <Option value="3">Project Member</Option>
                    </Select>
                </Item>
                <Item
                    label={<Text strong>User List</Text>}
                    name="projectUser"
                    rules={[{ required: true, message: 'You have not selected user list!' }]}
                >
                    <Select
                        {...propsSelect}
                        allowClear
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        placeholder="Select user from the list below..."
                        style={{ width: '100%' }}
                        showSearch
                    >
                        {userList.map(item => (
                            <Option key={item._id} value={item._id}>
                                {item.fullName}
                            </Option>
                        ))}
                    </Select>
                </Item>
            </Form>
        </Modal>
    );
};

export default ModalProjectUserComponent;
