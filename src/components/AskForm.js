import React from "react";
import { Form, Input, Button, Select } from "antd";

// let processedData = {
//   knowledge: "",
//   experience: "",
//   reason: "",
//   pros: "",
//   cons: "",
//   expect: "",
//   dedication: "",
//   otherClub: ""
// };

const processData = submitData => {
  const knowledge = submitData.knowledge;
  const experience = submitData.experience;
  const reason = submitData.reason;
  const pros = submitData.pros;
  const cons = submitData.cons;
  const expect = submitData.expect;
  const dedication = submitData.dedication;
  const question = submitData.question;
  const otherClub = submitData.otherClub;
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

const clubList = [
  "FVC - FPT Vovinam Club",
  "FFC - Câu Lạc Bộ Bóng Đá FPTU HCM",
  "FFC - FPT Chess Club",
  "FBC - FPTU HCM Basketball Club",
  "FVB - Câu Lạc Bộ Bóng Chuyền FPTU HCM",
  "FTI - FPT Traditional Instruments",
  "FBK - FPT Beat King Club",
  "F# - Live Music Club",
  "FStyle - FStyle Crew",
  "SiTigroup - Cộng đồng Sinh viên Tình nguyện SiTigroup",
  "JSC - CLB Phong Cách Nhật Bản",
  "EFC - English Funny Club",
  "FIA - FPT Information Assurance Club",
  "HNF - Hardware Network FPTU",
  "FEV - FPT Event Club",
  "CSG - Câu Lạc Bộ Truyền Thông Cóc Sài Gòn",
  "MEC - Multimedia Entertainment Club"
];

const AskForm = props => {
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
        console.log(processedData);
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
      <p>Phần 2/3</p>
      <h3>Giới thiệu, đánh giá bản thân</h3>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="Nêu một cách ngắn gọn hiểu biết của bạn về ngành này">
          {getFieldDecorator("knowledge", {
            rules: [
              {
                required: true,
                message: "Vui lòng trả lời câu hỏi này"
              }
            ],
            initialValue: processedData.knowledge
          })(
            <TextArea
              rows={3}
              placeholder="Ngành này làm những việc gì, có những công việc gì, cần những kiến thức gì,..."
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
                message: "Vui lòng trả lời câu hỏi này"
              }
            ],
            initialValue: processedData.experience
          })(
            <TextArea
              rows={3}
              placeholder="Biết được ngôn ngữ lập trình gì, đã từng tham gia những cuộc thi nào, đạt được những giải thưởng gì,…"
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
                message: "Vui lòng trả lời câu hỏi này"
              }
            ],
            initialValue: processedData.reason
          })(<TextArea rows={3} />)}
        </Form.Item>
        <Form.Item label="Ưu điểm của bạn là gì?" colon={false}>
          {getFieldDecorator("pros", {
            rules: [
              {
                required: true,
                message: "Vui lòng trả lời câu hỏi này"
              }
            ],
            initialValue: processedData.pros
          })(<TextArea rows={3} />)}
        </Form.Item>
        <Form.Item label="Khuyết điểm của bạn là gì?" colon={false}>
          {getFieldDecorator("cons", {
            rules: [
              {
                required: true,
                message: "Vui lòng trả lời câu hỏi này"
              }
            ],
            initialValue: processedData.cons
          })(<TextArea rows={3} />)}
        </Form.Item>
        <Form.Item label="Điều bạn mong đợi khi tham gia CLB?" colon={false}>
          {getFieldDecorator("expect", {
            rules: [
              {
                required: true,
                message: "Vui lòng trả lời câu hỏi này"
              }
            ],
            initialValue: processedData.expect
          })(<TextArea rows={3} />)}
        </Form.Item>
        <Form.Item
          label="Nếu trở thành thành viên chính thức, bạn sẽ làm gì để phát triển CLB?"
          colon={false}
        >
          {getFieldDecorator("dedication", {
            rules: [
              {
                required: true,
                message: "Vui lòng trả lời câu hỏi này"
              }
            ],
            initialValue: processedData.dedication
          })(<TextArea rows={3} />)}
        </Form.Item>
        <Form.Item
          label="Nếu trở thành thành viên chính thức, bạn sẽ làm gì để phát triển CLB?"
          colon={false}
        >
          {getFieldDecorator("question", {
            initialValue: processedData.question
          })(<TextArea rows={3} />)}
        </Form.Item>
        <Form.Item
          label="Ngoài F-Code, bạn còn tham gia CLB nào?"
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
              placeholder="Để trống nếu không tham gia clb nào khác"
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
          <Button htmlType="submit" onClick={handlePrev} className="btn-left">
            Trở về
          </Button>
          <Button htmlType="submit" type="primary" className="btn-right">
            Tiếp tục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create()(AskForm);
