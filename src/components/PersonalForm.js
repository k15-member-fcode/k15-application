import React, { useRef } from "react";
import { Form, Radio, Input, Button, Icon, Tooltip } from "antd";
import firebase from "firebase/app";
import {
  studentIdValidation,
  nameValidation,
  phoneValidation,
  facebookValidation
} from "../utils/config";
import { dataForm } from "../utils/dataForm";
import { MAJOR_LIST, GENDER_LIST } from "../utils/constant";

const processData = submitData => {
  const fullname =
    submitData.fullname === undefined ? "" : submitData.fullname.toUpperCase();
  const studentID =
    submitData.studentID === undefined ? "" : submitData.studentID;
  const major = submitData.major === undefined ? "" : submitData.major;
  const gender = submitData.gender === undefined ? "" : submitData.gender;
  const email = firebase.auth().currentUser.email;
  const phone =
    submitData.phoneNumber === undefined ? "" : submitData.phoneNumber;
  const facebook =
    submitData.facebook === undefined ? "" : submitData.facebook.toLowerCase();
  return {
    fullname,
    studentID,
    major,
    gender,
    email,
    phone,
    facebook
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

const PersonalForm = props => {
  const submitStatus = useRef(false);

  const nextStep = props.nextStep;
  const prevStep = props.prevStep;

  let processedData = props.data.personal;
  const updateData = props.update;

  const { getFieldDecorator } = props.form;

  const handleSubmit = event => {
    event.preventDefault();
    submitStatus.current = true;
    props.form.validateFields((err, values) => {
      if (!err) {
        processedData = processData(values);
        updateData("personal", processedData);
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
      updateData("personal", processedData);
      submitStatus.current = false;
      prevStep();
    });
  };

  const handleStudentId = (rule, value, callback) => {
    if (value !== undefined) {
      const studentID = value.trim();
      if (studentID.length !== 0) {
        if (submitStatus.current) {
          if (!studentIdValidation.test(studentID)) {
            callback(dataForm.personal.studentID.message.validation[0]);
          } else if (
            parseInt(studentID) % 10000 === 0 ||
            parseInt(studentID) > 152199
          ) {
            callback(dataForm.personal.studentID.message.validation[1]);
          } else {
            callback();
          }
        }
      } else {
        callback(dataForm.personal.studentID.message.required);
      }
    } else {
      callback(dataForm.personal.studentID.message.required);
    }
  };

  const handlePhoneNumber = (rule, value, callback) => {
    if (value !== undefined) {
      let phoneNumber = value.trim();
      if (phoneNumber.length !== 0) {
        if (submitStatus.current) {
          if (!phoneValidation.test(phoneNumber) || phoneNumber.length !== 10) {
            callback(dataForm.personal.phoneNumber.message.validation);
          } else {
            callback();
          }
        }
      } else {
        callback(dataForm.personal.phoneNumber.message.required);
      }
    } else {
      callback(dataForm.personal.phoneNumber.message.required);
    }
  };

  const handleFacebook = (rule, value, callback) => {
    if (value !== undefined) {
      let facebook = value.trim();
      if (facebook.length !== 0) {
        if (submitStatus.current) {
          if (
            !facebookValidation.test(facebook) ||
            facebook.endsWith("facebook.com/")
          ) {
            callback(dataForm.personal.facebook.message.validation);
          } else {
            callback();
          }
        }
      } else {
        callback(dataForm.personal.facebook.message.required);
      }
    } else {
      callback(dataForm.personal.facebook.message.required);
    }
  };
  return (
    <div className="PersonalForm">
      <Form {...formItemLayout} onSubmit={handleSubmit} className="Form">
        <Form.Item label="Họ và tên">
          {getFieldDecorator("fullname", {
            rules: [
              {
                required: true,
                message: dataForm.personal.fullname.message.required
              },
              {
                pattern: nameValidation,
                message: dataForm.personal.fullname.message.validation
              }
            ],
            initialValue: processedData.fullname
          })(
            <Input
              size="large"
              placeholder="Họ và tên của bạn"
              autoComplete="off"
            />
          )}
        </Form.Item>
        <Form.Item label="Mã sinh viên">
          {getFieldDecorator("studentID", {
            rules: [{ required: true, validator: handleStudentId }],
            initialValue: processedData.studentID
          })(
            <Input
              prefix="SE"
              size="large"
              placeholder="15xxxx"
              autoComplete="off"
            />
          )}
        </Form.Item>
        <Form.Item label="Chuyên ngành">
          {getFieldDecorator("major", {
            rules: [
              {
                required: true,
                message: dataForm.personal.major.message.validation
              }
            ],
            initialValue: processedData.major
          })(
            <Radio.Group buttonStyle="outline">
              {MAJOR_LIST.map((major, index) => {
                return (
                  <Radio.Button key={index} value={major}>
                    {major}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="Giới tính">
          {getFieldDecorator("gender", {
            rules: [
              {
                required: true,
                message: dataForm.personal.gender.message.validation
              }
            ],
            initialValue: processedData.gender
          })(
            <Radio.Group buttonStyle="outline">
              {GENDER_LIST.map((gender, index) => {
                return (
                  <Tooltip key={index} placement="bottom" title={gender}>
                    <Radio.Button key={index} value={gender}>
                      {gender === "Nam" ? (
                        <Icon type="man" />
                      ) : (
                        <Icon type="woman" />
                      )}
                    </Radio.Button>
                  </Tooltip>
                );
              })}
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="Số điện thoại">
          {getFieldDecorator("phoneNumber", {
            rules: [{ required: true, validator: handlePhoneNumber }],
            initialValue: processedData.phone
          })(
            <Input size="large" placeholder="0xxxxxxxxx" autoComplete="off" />
          )}
        </Form.Item>
        <Form.Item label="Link Facebook">
          {getFieldDecorator("facebook", {
            rules: [{ required: true, validator: handleFacebook }],
            initialValue: processedData.facebook
          })(
            <Input
              size="large"
              placeholder="https://facebook.com/xxxxx"
              autoComplete="off"
            />
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

export default Form.create()(PersonalForm);
