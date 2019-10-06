import React, { useRef } from "react";
import { Form, Input, Button, Select } from "antd";
import { dataForm } from "../utils/dataForm";
import { CLUB_LIST } from "../utils/constant";

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
  const submitStatus = useRef(false);

  const prevStep = props.prevStep;
  const nextStep = props.nextStep;

  const { getFieldDecorator } = props.form;

  let processedData = props.data.ask;
  const updateData = props.update;

  const handleSubmit = event => {
    event.preventDefault();
    submitStatus.current = true;
    props.form.validateFields((err, values) => {
      if (!err) {
        processedData = processData(values);
        updateData("ask", processedData);
        submitStatus.current = false;
        nextStep();
      }
    });
  };

  const handlePrev = event => {
    event.preventDefault();
    submitStatus.current = true;
    props.form.validateFields((err, values) => {
      err = null;
      processedData = processData(values);
      updateData("ask", processedData);
      submitStatus.current = false;
      prevStep();
    });
  };

  const handleLenght = (rule, value, callback) => {
    if (value !== undefined) {
      const answer = value.trim();
      if (answer.length !== 0) {
        if (submitStatus.current) {
          if (answer.length < 20) {
            callback(dataForm.ask.message.minError);
          } else if (answer.length > 500) {
            callback(dataForm.ask.message.maxError);
          } else {
            callback();
          }
        }
      } else {
        callback(dataForm.ask.message.required);
      }
    } else {
      callback(dataForm.ask.message.required);
    }
  };

  const handleLenghtWithoutMin = (rule, value, callback) => {
    if (value !== undefined) {
      const answer = value.trim();
      if (answer.length !== 0) {
        if (submitStatus.current) {
          if (answer.length > 500) {
            callback(dataForm.ask.message.maxError);
          } else {
            callback();
          }
        }
      } else {
        callback(dataForm.ask.message.required);
      }
    } else {
      callback(dataForm.ask.message.required);
    }
  };

  const handleLenghtOptional = (rule, value, callback) => {
    if (value !== undefined) {
      const answer = value.trim();
      if (answer.length !== 0) {
        if (submitStatus.current) {
          if (answer.length > 500) {
            callback(dataForm.ask.message.maxError);
          } else {
            callback();
          }
        }
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  return (
    <div className="AskForm">
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label={dataForm.ask.knowledge.label}>
          {getFieldDecorator("knowledge", {
            rules: [
              {
                required: true,
                message: " "
              },
              { validator: handleLenght }
            ],
            initialValue: processedData.knowledge
          })(
            <TextArea
              maxLength="500"
              rows={3}
              placeholder={dataForm.ask.knowledge.placeholder}
            />
          )}
        </Form.Item>
        <Form.Item label={dataForm.ask.experience.label} colon={false}>
          {getFieldDecorator("experience", {
            rules: [
              {
                required: true,
                message: " "
              },
              { validator: handleLenght }
            ],
            initialValue: processedData.experience
          })(
            <TextArea
              maxLength="500"
              rows={3}
              placeholder={dataForm.ask.experience.placeholder}
            />
          )}
        </Form.Item>
        <Form.Item label={dataForm.ask.reason.label} colon={false}>
          {getFieldDecorator("reason", {
            rules: [
              {
                required: true,
                message: " "
              },
              { validator: handleLenght }
            ],
            initialValue: processedData.reason
          })(<TextArea maxLength="500" rows={3} placeholder="" />)}
        </Form.Item>
        <Form.Item label={dataForm.ask.pros.label} colon={false}>
          {getFieldDecorator("pros", {
            rules: [
              {
                required: true,
                message: " "
              },
              { validator: handleLenghtWithoutMin }
            ],
            initialValue: processedData.pros
          })(<TextArea maxLength="500" rows={3} placeholder="" />)}
        </Form.Item>
        <Form.Item label={dataForm.ask.cons.label} colon={false}>
          {getFieldDecorator("cons", {
            rules: [
              {
                required: true,
                message: " "
              },
              { validator: handleLenghtWithoutMin }
            ],
            initialValue: processedData.cons
          })(<TextArea maxLength="500" rows={3} placeholder="" />)}
        </Form.Item>
        <Form.Item label={dataForm.ask.expect.label} colon={false}>
          {getFieldDecorator("expect", {
            rules: [
              {
                required: true,
                message: " "
              },
              { validator: handleLenghtWithoutMin }
            ],
            initialValue: processedData.expect
          })(<TextArea maxLength="500" rows={3} placeholder="" />)}
        </Form.Item>
        <Form.Item label={dataForm.ask.dedication.label} colon={false}>
          {getFieldDecorator("dedication", {
            rules: [
              {
                required: true,
                message: " "
              },
              { validator: handleLenghtWithoutMin }
            ],
            initialValue: processedData.dedication
          })(<TextArea maxLength="500" rows={3} placeholder="" />)}
        </Form.Item>
        <Form.Item label={dataForm.ask.question.label} colon={false}>
          {getFieldDecorator("question", {
            rules: [{ validator: handleLenghtOptional }],
            initialValue: processedData.question
          })(
            <TextArea
              maxLength="500"
              rows={3}
              placeholder={dataForm.ask.question.placeholder}
            />
          )}
        </Form.Item>
        <Form.Item label={dataForm.ask.otherClub.label} colon={false}>
          {getFieldDecorator("otherClub", {
            rules: [{ type: "array" }],
            initialValue:
              processedData.otherClub === ""
                ? undefined
                : processedData.otherClub
          })(
            <Select
              mode="multiple"
              placeholder={dataForm.ask.otherClub.placeholder}
              allowClear
              style={{ minHeight: "12vh" }}
            >
              {CLUB_LIST.map((club, index) => {
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
    </div>
  );
};

export default Form.create()(AskForm);
