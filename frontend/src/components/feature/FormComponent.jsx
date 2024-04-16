import React from 'react';

import { Form, Input } from 'antd';

const { Item } = Form;

const FormComponent = ({ form, onFinish, formFields }) => (
    <Form
        colon={false}
        form={form}
        labelAlign={'left'}
        labelCol={{
            xs: { span: 24 },
            md: { span: 10 },
        }}
        labelWrap
        onFinish={onFinish}
        wrapperCol={{
            xs: { span: 24 },
            md: { span: 14 },
        }}
    >
        <Item name="_id" hidden>
            <Input />
        </Item>
        {formFields.map(({ label, name, typeInput, rules }, index) => (
            <Item key={index} label={label} name={name} rules={rules}>
                {typeInput}
            </Item>
        ))}
    </Form>
);

export default FormComponent;
