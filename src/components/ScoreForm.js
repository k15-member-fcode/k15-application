import React, { useRef } from "react";
import { Form, Input, InputNumber, Button } from "antd";

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 16 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 32 },
    sm: { span: 16 }
  }
};

const ScoreForm = props => {
  const { getFieldDecorator } = props.form;
  const submit = props.submit;
  const disabledForm = props.disable;

  const handleSubmit = event => {
    event.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        submit(values);
        alert("OK");
      }
    });
  };

  const validateScore = (rule, value, callback) => {
    if (value !== undefined) {
      const score = value.trim();
      if (score.length !== 0) {
        if (
          parseFloat(score) < 0 ||
          parseFloat(score) > 10 ||
          isNaN(parseFloat(score))
        ) {
          callback("Số điểm chỉ được phép từ 0 đến 10.");
        } else {
          callback();
        }
      } else {
        callback("Vui lòng nhập số điểm.");
      }
    } else {
      callback("Vui lòng nhập số điểm.");
    }
  };

  return (
    <div className="ScoreForm">
      <Form {...formItemLayout} onSubmit={handleSubmit} className="Form">
        <Form.Item label="Điểm">
          {getFieldDecorator("score", {
            rules: [
              {
                required: true,
                validator: validateScore
              }
            ]
          })(<Input placeholder="Điểm phỏng vấn" autoComplete="off" />)}
        </Form.Item>
        <Form.Item label="Nhận xét">
          {getFieldDecorator("comments", {
            rules: [
              {
                required: true,
                message: "Vui lòng ghi nhận xét."
              }
            ]
          })(
            <TextArea
              placeholder="Điểm phỏng vấn"
              autoComplete="off"
              rows={4}
              style={{ resize: "none" }}
            />
          )}
        </Form.Item>
        <Form.Item>
          <div className="btn-container">
            <Button type="primary" htmlType="submit" disabled={disabledForm}>
              Gửi
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create()(ScoreForm);
