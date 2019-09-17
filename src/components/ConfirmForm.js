import React from "react";
import { Form, Button, Radio } from "antd";

// let processedData = {
//   isReady: "Chưa sẵn sàng",
//   isRead: "Chưa đọc",
//   isVerify: false
// };

const processData = submitData => {
  const isReady = submitData.isReady;
  const isRead = submitData.isRead;
  const isVerify = false;
  return {
    isReady,
    isRead,
    isVerify
  };
};

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
  const submitData = props.submit;

  const { getFieldDecorator } = props.form;

  let processedData = props.data.confirm;
  const updateData = props.update;

  const handleSubmit = event => {
    event.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        processedData = processData(values);
        updateData('confirm', processedData);
        submitData();
        console.log(processedData);
      }
    });
  };

  const handlePrev = event => {
    event.preventDefault();
    props.form.validateFields((err, values) => {
      processedData = processData(values);
      updateData('confirm', processedData);
      prevStep();
    });
  };

  return (
    <div className="ConfirmForm">
      <p>Phần 3/3</p>
      <h3>Xác nhận</h3>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item
          label="Bạn đã sẵn sàng chấp nhận thử thách chưa?"
          colon={false}
        >
          {getFieldDecorator("isReady", {
            rules: [
              {
                required: true,
                message: "Vui lòng chọn một mục"
              }
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
        <Form.Item
          label="Bạn đã đọc hết toàn bộ thông tin của form này chưa?"
          colon={false}
        >
          {getFieldDecorator("isRead", {
            rules: [
              {
                required: true,
                message: "Vui lòng chọn một mục"
              }
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
          <Button htmlType="submit" onClick={handlePrev} className="btn-left">
            Trở về
          </Button>
          <Button htmlType="submit" type="primary" className="btn-right">
            Gửi đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create()(ConfirmForm);
