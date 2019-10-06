import React, { useState } from "react";
import { Steps, Divider } from "antd";
import "../resource/css/ApplicationPage.css";
import ApplyForm from "./ApplyForm";
import Footer from "./Common/Footer";

const ApplicationPage = props => {
  const [step, setStep] = useState(0);
  const { Step } = Steps;

  const onChange = current => {
    setStep(current);
  };

  return (
    <div>
      <div className="ApplicationPage">
        <h1 className="heading__page">ĐĂNG KÝ THÀNH VIÊN CLB F-CODE</h1>
        <p className="p__intruction--main">
          Hướng dẫn: Vui lòng hoàn thành theo form sau để đăng ký tham gia thử
          thách của CLB
        </p>
        <Steps current={step}>
          <Step title="Bước 1" description="Đăng nhập Google" />
          <Step title="Bước 2" description="Thông tin liên hệ" />
          <Step title="Bước 3" description="Câu hỏi của CLB" />
          <Step title="Bước 4" description="Xác nhận" />
        </Steps>
        <Divider />
        <ApplyForm step={step} setStep={onChange} />
      </div>
      <Footer />
    </div>
  );
};
export default ApplicationPage;
