import React from "react";
import { Form, Button, Radio } from "antd";
import { dataForm } from "../utils/dataForm";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

const readyList = ["Đã sẵn sàng", "Chưa sẵn sàng"];
const readList = ["Đã đọc", "Chưa đọc"];

const ConfirmForm = props => {
  const prevStep = props.prevStep;
  const nextStep = props.nextStep;

  const { getFieldDecorator } = props.form;

  let processedData = props.data.confirm;
  const updateData = props.update;

  const processData = submitData => {
    const isReady = submitData.isReady;
    const isRead = submitData.isRead;
    const isVerify = false;
    const tryMail = processedData.tryMail;
    return {
      isReady,
      isRead,
      isVerify,
      tryMail
    };
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (values.isReady === "Đã sẵn sàng" && values.isRead === "Đã đọc") {
          processedData = processData(values);
          updateData("confirm", processedData);
          nextStep();
        }
      }
    });
  };

  const handlePrev = event => {
    event.preventDefault();
    props.form.validateFields((err, values) => {
      processedData = processData(values);
      updateData("confirm", processedData);
      prevStep();
    });
  };

  const handleReady = (rule, value, callback) => {
    if (value !== "Đã sẵn sàng") {
      callback(dataForm.confirm.isReady.message.validation);
    }
    callback();
  };
  const handleRead = (rule, value, callback) => {
    if (value !== "Đã đọc") {
      callback(dataForm.confirm.isRead.message.validation);
    }
    callback();
  };
  return (
    <div className="ConfirmForm">
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label={dataForm.confirm.isReady.label} colon={false}>
          {getFieldDecorator("isReady", {
            rules: [
              {
                required: true,
                message: dataForm.confirm.message.required
              },
              { validator: handleReady }
            ],
            initialValue: processedData.isReady
          })(
            <Radio.Group>
              {readyList.map((ready, index) => {
                return (
                  <Radio key={index} value={ready}>
                    {ready}
                  </Radio>
                );
              })}
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label={dataForm.confirm.isRead.label} colon={false}>
          {getFieldDecorator("isRead", {
            rules: [
              {
                required: true,
                message: dataForm.confirm.message.required
              },
              { validator: handleRead }
            ],
            initialValue: processedData.isRead
          })(
            <Radio.Group buttonStyle="outline">
              {readList.map((read, index) => {
                return (
                  <Radio key={index} value={read}>
                    {read}
                  </Radio>
                );
              })}
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item>
          <div className="btn-container">
            <Button type="primary" htmlType="submit" className="btn-right">
              Gửi đăng ký
            </Button>
            <Button onClick={handlePrev} className="btn-right">
              Trở về
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create()(ConfirmForm);
