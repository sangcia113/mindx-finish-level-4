import React from 'react';
import { DatePicker, Form, Input, Modal, Select } from 'antd';

const { Item } = Form;

const ModalUserInfo = ({ afterClose, onCancel, onOk, open, form, onFinish }) => {
    return (
        <Modal
            afterClose={afterClose}
            centered
            closeIcon={false}
            onCancel={onCancel}
            onOk={onOk}
            open={open}
            title={'USER INFORMATION'}
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
                    md: { span: 8 },
                }}
                labelWrap
                wrapperCol={{
                    xs: { span: 24 },
                    md: { span: 16 },
                }}
                onFinish={onFinish}
            >
                <Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true, message: 'You have not entered full name!' }]}
                >
                    <Input allowClear maxLength={100} placeholder="Enter full name..." showCount />
                </Item>
                <Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: true, message: 'You have not selected a gender!' }]}
                >
                    <Select
                        allowClear
                        placeholder="Select gender list below..."
                        style={{ width: '100%' }}
                    >
                        <Select.Option value="1">Male</Select.Option>
                        <Select.Option value="2">Female</Select.Option>
                        <Select.Option value="3">Other</Select.Option>
                    </Select>
                </Item>
                <Item
                    label="Birthday"
                    name="birthday"
                    rules={[{ required: true, message: 'You have not selected birthday!' }]}
                >
                    <DatePicker
                        allowClear={false}
                        format={'DD/MM/YYYY'}
                        inputReadOnly
                        placeholder="Select birthday..."
                        style={{ width: '100%' }}
                    />
                </Item>
            </Form>
        </Modal>
    );
};

export default ModalUserInfo;
