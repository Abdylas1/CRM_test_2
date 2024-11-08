import React, { useState } from 'react';
import s from './shareForm.module.scss';
import { Form, Input, Button, Typography } from 'antd';

const ShareForm = ({
  type,
  config,
  handleSubmit,
  disabled = false,
  editConfig,
}) => {
  const formDetails = config[type];
  const initialState = formDetails?.fields.reduce((acc, rec) => {
    acc[rec.name] = '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(editConfig || initialState);

  if (!formDetails) {
    return <p>Invalid form type</p>;
  }

  const { Title, Paragraph } = Typography;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = e => {
    console.log(e);
    e.preventDefault();
    handleSubmit(formData);
    console.log('Form submitted:', formData);
  };
  return (
    <div className={s.registerContainer}>
      <div className={s.formWrapper}>
        <Form onSubmitCapture={onSubmit} initialValues={formData}>
          {formDetails.fields?.map((el, index) => (
            <Form.Item
              key={index}
              name={el.name}
              rules={[
                { required: true, message: `Please input your ${el.name}!` },
              ]}
            >
              <Input
                name={el.name}
                type={el.type}
                placeholder={el.placeholder}
                value={formData[el.name]}
                onChange={handleChange}
              />
            </Form.Item>
          ))}
          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              {config[type].buttonText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ShareForm;
