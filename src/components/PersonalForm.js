import React, { useRef } from "react";
import { Form, Radio, Input, Button } from "antd";
import firebase from "firebase/app";
import {
  studentIdValidation,
  nameValidation,
  phoneValidation,
  facebookValidation
} from "../utils/config";

// let processedData = {
//   fullname: "",
//   studentID: "",
//   major: "SE",
//   gender: "Nam",
//   email: "",
//   phone: "",
//   facebook: ""
// };

const processData = submitData => {
  const fullname = submitData.fullname;
  const studentID =   submitData.studentID;
  const major = submitData.major;
  const gender = submitData.gender;
  const email = firebase.auth().currentUser.email;
  const phone = submitData.phoneNumber;
  const facebook = submitData.facebook;
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
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const majorList = ["SE", "IA", "IoT", "AI"];
const genderList = ["Nam", "Nữ"];

const PersonalForm = props => {
  const isSubmit = useRef(props.isBack);

  const nextStep = props.nextStep;

  let processedData = props.data.personal;
  const updateData = props.update;

  const { getFieldDecorator } = props.form;

  const handleSubmit = event => {
    event.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        processedData = processData(values);
        updateData('personal', processedData);
        nextStep();
      }
    });
    isSubmit.current = true;
  };

  const handleStudentId = (rule, value, callback) => {
    let studentID = value;
    if (isSubmit.current) {
      if (!studentIdValidation.test(studentID) || studentID.length !== 6) {
        if (studentID !== undefined) {
          studentID.length !== 0
            ? callback("Mã sinh viên phải có định dạng 15xxxx, với x là số đếm")
            : callback();
        }
      }
    }
    callback();
  };

  const handlePhoneNumber = (rule, value, callback) => {
    let phoneNumber = value;
    if (isSubmit.current) {
      if (!phoneValidation.test(phoneNumber) || phoneNumber.length !== 10) {
        if (phoneNumber !== undefined) {
          phoneNumber.length !== 0
            ? callback("Số điện thoại bạn nhập không đúng")
            : callback();
        }
      }
    }
    callback();
  };

  const handleFacebook = (rule, value, callback) => {
    let facebook = value;
    if (isSubmit.current) {
      if (!facebookValidation.test(facebook)) {
        if (facebook !== undefined) {
          facebook.length !== 0
            ? callback("Link Facebook bạn nhập không đúng")
            : callback();
        }
      }
    }
    callback();
  };

  return (
    <div className="PersonalForm">
    <p>Phần 1/3</p>
    <h3>Thông tin liên hệ cá nhân</h3>
      <Form {...formItemLayout} onSubmit={handleSubmit} className="Form">
        <Form.Item label="Họ và tên">
          {getFieldDecorator("fullname", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập họ tên của bạn"
              },
              {
                pattern: nameValidation,
                message: "Họ tên bạn nhập chứ ký tự không hợp lệ"
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
            rules: [
              {
                required: true,
                message: "Vui lòng nhập mã sinh viên của bạn"
              },
              {
                validator: handleStudentId
              }
            ],
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
                message: "Vui lòng chọn chuyên ngành của bạn"
              }
            ],
            initialValue: processedData.major
          })(
            <Radio.Group buttonStyle="outline">
              {majorList.map((major, index) => {
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
                message: "Vui lòng chọn giới tính của bạn"
              }
            ],
            initialValue: processedData.gender
          })(
            <Radio.Group buttonStyle="outline">
              {genderList.map((gender, index) => {
                return (
                  <Radio.Button key={index} value={gender}>
                    {gender}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="Số điện thoại">
          {getFieldDecorator("phoneNumber", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập số điện thoại của bạn"
              },
              {
                validator: handlePhoneNumber
              }
            ],
            initialValue: processedData.phone
          })(
            <Input size="large" placeholder="0xxxxxxxxx" autoComplete="off" />
          )}
        </Form.Item>
        <Form.Item label="Link Facebook">
          {getFieldDecorator("facebook", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập địa chỉ Facebook của bạn"
              },
              { validator: handleFacebook }
            ],
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
          <Button type="primary" htmlType="submit" className="btn-right">
            Tiếp tục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create()(PersonalForm);
