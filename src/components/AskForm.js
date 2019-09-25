import React, { useState } from "react";
import { Form, Input, Button, Select, Icon } from "antd";

const processData = submitData => {
  const knowledge = submitData.knowledge;
  const experience = submitData.experience;
  const reason = submitData.reason;
  const pros = submitData.pros;
  const cons = submitData.cons;
  const expect = submitData.expect;
  const dedication = submitData.dedication;
  const question = submitData.question === undefined ? "" : submitData.question;
  const otherClub =
    submitData.otherClub === undefined ? "" : submitData.otherClub;
  return {
    knowledge,
    experience,
    reason,
    pros,
    cons,
    expect,
    dedication,
    question,
    otherClub
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

const { TextArea } = Input;
const { Option } = Select;

const AskForm = props => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 500);
  const prevStep = props.prevStep;
  const nextStep = props.nextStep;

  const { getFieldDecorator } = props.form;

  let processedData = props.data.ask;
  const updateData = props.update;

  const handleSubmit = event => {
    event.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        processedData = processData(values);
        updateData("ask", processedData);
        nextStep();
      }
    });
  };

  const handlePrev = event => {
    event.preventDefault();
    props.form.validateFields((err, values) => {
      processedData = processData(values);
      updateData("ask", processedData);
      prevStep();
    });
  };

  return (
    <div className="AskForm">
      {loading ? (
        <div>
          <Icon type="loading" className="icon-primary icon-center" />
        </div>
      ) : (
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          <Form.Item label="Nêu một cách ngắn gọn hiểu biết của bạn về ngành này">
            {getFieldDecorator("knowledge", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng trả lời câu hỏi này."
                },
                { max: 500, message: "Đã đạt số kí tự tối đa (500 kí tự)." }
              ],
              initialValue: processedData.knowledge
            })(
              <TextArea
                maxLength="500"
                rows={3}
                placeholder="Ngành này làm những việc gì, có những công việc gì, cần những kiến thức gì,... (tối đa 500 kí tự)"
              />
            )}
          </Form.Item>
          <Form.Item
            label="Bạn có kinh nghiệm như thế nào trong lĩnh vực CNTT?"
            colon={false}
          >
            {getFieldDecorator("experience", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng trả lời câu hỏi này."
                },
                { max: 500, message: "Đã đạt số kí tự tối đa (500 kí tự)." }
              ],
              initialValue: processedData.experience
            })(
              <TextArea
                maxLength="500"
                rows={3}
                placeholder="Biết được ngôn ngữ lập trình gì, đã từng tham gia những cuộc thi nào, đạt được những giải thưởng gì,... (tối đa 500 kí tự)"
              />
            )}
          </Form.Item>
          <Form.Item
            label="Tại sao bạn lại muốn tham gia CLB F-Code?"
            colon={false}
          >
            {getFieldDecorator("reason", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng trả lời câu hỏi này."
                },
                { max: 500, message: "Đã đạt số kí tự tối đa (500 kí tự)." }
              ],
              initialValue: processedData.reason
            })(
              <TextArea
                maxLength="500"
                rows={3}
                placeholder="(tối đa 500 kí tự)"
              />
            )}
          </Form.Item>
          <Form.Item label="Ưu điểm của bạn là gì?" colon={false}>
            {getFieldDecorator("pros", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng trả lời câu hỏi này."
                },
                { max: 500, message: "Đã đạt số kí tự tối đa (500 kí tự)." }
              ],
              initialValue: processedData.pros
            })(
              <TextArea
                maxLength="500"
                rows={3}
                placeholder="(tối đa 500 kí tự)"
              />
            )}
          </Form.Item>
          <Form.Item label="Khuyết điểm của bạn là gì?" colon={false}>
            {getFieldDecorator("cons", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng trả lời câu hỏi này."
                },
                { max: 500, message: "Đã đạt số kí tự tối đa (500 kí tự)." }
              ],
              initialValue: processedData.cons
            })(
              <TextArea
                maxLength="500"
                rows={3}
                placeholder="(tối đa 500 kí tự)"
              />
            )}
          </Form.Item>
          <Form.Item
            label="Điều bạn mong đợi khi tham gia CLB là gì?"
            colon={false}
          >
            {getFieldDecorator("expect", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng trả lời câu hỏi này."
                },
                { max: 500, message: "Đã đạt số kí tự tối đa (500 kí tự)." }
              ],
              initialValue: processedData.expect
            })(
              <TextArea
                maxLength="500"
                rows={3}
                placeholder="(tối đa 500 kí tự)"
              />
            )}
          </Form.Item>
          <Form.Item
            label="Nếu trở thành thành viên chính thức, bạn sẽ làm gì để phát triển CLB?"
            colon={false}
          >
            {getFieldDecorator("dedication", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng trả lời câu hỏi này."
                },
                { max: 500, message: "Đã đạt số kí tự tối đa (500 kí tự)." }
              ],
              initialValue: processedData.dedication
            })(
              <TextArea
                maxLength="500"
                rows={3}
                placeholder="(tối đa 500 kí tự)"
              />
            )}
          </Form.Item>
          <Form.Item label="Bạn có câu hỏi gì gửi đến CLB không?" colon={false}>
            {getFieldDecorator("question", {
              rules: [
                { max: 500, message: "Đã đạt số kí tự tối đa (500 kí tự)." }
              ],
              initialValue: processedData.question
            })(
              <TextArea
                maxLength="500"
                rows={3}
                placeholder="Để trống nếu bạn không có câu hỏi nào (tối đa 500 kí tự nếu có)"
              />
            )}
          </Form.Item>
          <Form.Item
            label="Ngoài F-Code, bạn còn tham gia CLB nào khác?"
            colon={false}
          >
            {getFieldDecorator("otherClub", {
              rules: [{ type: "array" }],
              initialValue:
                processedData.otherClub === ""
                  ? undefined
                  : processedData.otherClub
            })(
              <Select
                mode="multiple"
                placeholder="Để trống nếu bạn không tham gia CLB nào khác"
                allowClear
                style={{ minHeight: "12vh" }}
              >
                {clubList.map((club, index) => {
                  return (
                    <Option key={index} value={club}>
                      {club}
                    </Option>
                  );
                })}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <div className="btn-container">
              <Button type="primary" htmlType="submit" className="btn-right">
                Tiếp tục
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

export default Form.create()(AskForm);
