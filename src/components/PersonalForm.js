import React, { useRef, useState } from "react";
import { Form, Radio, Input, Button, Icon, Tooltip } from "antd";
import firebase from "firebase/app";
import {
  studentIdValidation,
  nameValidation,
  phoneValidation,
  facebookValidation
} from "../utils/config";

const processData = submitData => {
  const fullname = submitData.fullname;
  const studentID = submitData.studentID;
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
    sm: { span: 12 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};

const majorList = ["SE", "IA", "IoT", "AI"];
const genderList = ["Nam", "Nữ"];

const PersonalForm = props => {
  const isSubmit = useRef(false);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  const nextStep = props.nextStep;
  const prevStep = props.prevStep;

  let processedData = props.data.personal;
  const updateData = props.update;

  const { getFieldDecorator } = props.form;

  const handleSubmit = event => {
    event.preventDefault();
    isSubmit.current = true;
    props.form.validateFields((err, values) => {
      if (!err) {
        processedData = processData(values);
        updateData("personal", processedData);
        nextStep();
      }
    });
  };

  const handlePrev = event => {
    event.preventDefault();
    isSubmit.current = true;
    props.form.validateFields((err, values) => {
      processedData = processData(values);
      updateData("personal", processedData);
      prevStep();
    });
  };

  const handleStudentId = (rule, value, callback) => {
    let timeOut = isSubmit.current ? 0 : 3000;
    setTimeout(() => {
      let studentID = value;
      if (studentID !== undefined) {
        if (studentID.length !== 0) {
          if (!studentIdValidation.test(studentID)) {
            callback("Mã sinh viên phải có định dạng 15xxxx, với x là số đếm");
          } else if (
            parseInt(studentID) < 150001 ||
            parseInt(studentID) > 152199
          ) {
            callback("Mã sinh viên không đúng");
          }
        }
      }
      callback();
    }, timeOut);
  };

  const handlePhoneNumber = (rule, value, callback) => {
    let timeOut = isSubmit.current ? 0 : 3000;
    setTimeout(() => {
      let phoneNumber = value;
      if (phoneNumber !== undefined) {
        if (!phoneValidation.test(phoneNumber) || phoneNumber.length !== 10) {
          phoneNumber.length !== 0
            ? callback("Số điện thoại bạn nhập không đúng")
            : callback();
        }
      }
      callback();
    }, timeOut);
  };

  const handleFacebook = (rule, value, callback) => {
    let timeOut = isSubmit.current ? 0 : 3000;
    setTimeout(() => {
      let facebook = value;
      if (facebook !== undefined) {
        if (!facebookValidation.test(facebook)) {
          facebook.length !== 0
            ? callback("Link Facebook bạn nhập không đúng")
            : callback();
        }
      }
      callback();
    }, timeOut);
  };

  return (
    <div className="PersonalForm">
      {loading ? (
        <div>
          <Icon type="loading" className="icon-primary icon-center" />
        </div>
      ) : (
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

export default Form.create()(PersonalForm);
