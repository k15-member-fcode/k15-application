import React, { useState } from "react";
import { Form, Button, Radio, Icon } from "antd";

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
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  const prevStep = props.prevStep;
  const nextStep = props.nextStep;

  const { getFieldDecorator } = props.form;

  let processedData = props.data.confirm;
  const updateData = props.update;

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
      callback("Bạn chưa sẵn sàng tham gia thử thách của CLB.");
    }
    callback();
  };
  const handleRead = (rule, value, callback) => {
    if (value !== "Đã đọc") {
      callback("Bạn chưa đọc hết nội dung của form này.");
    }
    callback();
  };
  return (
    <div className="ConfirmForm">
      {loading ? (
        <div>
          <Icon type="loading" className="icon-primary icon-center" />
        </div>
      ) : (
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
          <Form.Item
            label="Bạn đã đọc hết toàn bộ thông tin của form này chưa?"
            colon={false}
          >
            {getFieldDecorator("isRead", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng chọn một mục"
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
      )}
    </div>
  );
};

export default Form.create()(ConfirmForm);
