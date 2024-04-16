import React from 'react';
import { Form, Input, Modal, Select, Typography } from 'antd';

const { Item } = Form;
const { Option } = Select;
const { Text } = Typography;

const ModalUserProjectComponent = ({ onCancel, onFinish, form, open, title, userList = [] }) => (
    <Modal
        afterClose={() => form.resetFields()}
        centered
        closeIcon={false}
        onCancel={onCancel}
        onFinish={onFinish}
        onOk={() => form.submit()}
        open={open}
        title={title}
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
            <Item hidden name="_id">
                <Input />
            </Item>
            <Item
                label={<Text strong>Project Role</Text>}
                name="role"
                rules={[{ required: true, message: 'You have not selected project role!' }]}
            >
                <Select
                    allowClear
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
                name="userId"
                rules={[{ required: true, message: 'You have not selected user list!' }]}
            >
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
                        <Option key={item._id} value={item._id}>
                            {item.fullName}
                        </Option>;
                    })}
                </Select>
            </Item>
        </Form>
    </Modal>
);

export default ModalUserProjectComponent;
