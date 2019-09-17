import React, { useState, useRef } from "react";
import firebase from "firebase/app";
import "firebase/database";
import PersonalForm from "./PersonalForm";
import AskForm from "./AskForm";
import ConfirmForm from "./ConfirmForm";
import "./ApplyForm.css";
import { createNotification } from "./Common/Notification";

const dbUser = firebase.database();

const ApplyForm = () => {
  const [step, setStep] = useState(1);
  const isBack = useRef(false);
  const dataUser = useRef({
    personal: {
      fullname: undefined,
      studentID: undefined,
      major: "SE",
      gender: "Nam",
      email: undefined,
      phone: undefined,
      facebook: undefined
    },
    ask: {
      knowledge: undefined,
      experience: undefined,
      reason: undefined,
      pros: undefined,
      cons: undefined,
      expect: undefined,
      dedication: undefined,
      question: undefined,
      otherClub: undefined
    },
    confirm: {
      isReady: "Chưa sẵn sàng",
      isRead: "Chưa đọc",
      isVerify: false
    },
    timeCreate: undefined
  });
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
    isBack.current = true;
  };

  const updateData = (target, data) => {
    dataUser.current[target] = data;
  };
  const notiSuccess = {
    title: "Thành công",
    content:
      "Thông tin đăng ký thành viên của bạn đã được ghi nhận thành công. Vui lòng kiểm tra địa chỉ email để xác nhận. Xin cảm ơn!",
    status: "success"
  };
  const notiErr = {
    title: "Thất bại",
    content:
      "Lỗi, thông tin đăng ký thành viên của bạn đã tồn tại. Vui lòng kiểm tra địa chỉ email để xác nhận. Xin cảm ơn!",
    status: "err"
  };
  const writeInfoToDatabase = () => {
    const studentID = dataUser.current.personal.studentID;
    const validRef = dbUser.ref("verify").child(studentID);
    validRef.once("value", snapshot => {
      if (snapshot.val()) {
        createNotification(notiErr);
      } else {
        let date = new Date();
        const day = String(date.getDate()).padStart(2, "0");
        const mon = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const min = String(date.getMinutes()).padStart(2, "0");
        date = hours + ":" + min + " - " + day + "/" + mon + "/" + year;
        dataUser.current.timeCreate = date;
        const userRef = dbUser.ref("users");
        const newRef = userRef.child(studentID);
        newRef.set(dataUser.current);
        createNotification(notiSuccess);
        const verifyUpdate = {};
        verifyUpdate[studentID] = false;
        dbUser.ref("verify").update(verifyUpdate);
      }
    });
  };

  switch (step) {
    case 1:
      return (
        <PersonalForm
          nextStep={nextStep}
          isBack={isBack.current}
          data={dataUser.current}
          update={updateData}
        />
      );
    case 2:
      return (
        <AskForm
          nextStep={nextStep}
          prevStep={prevStep}
          isBack={isBack.current}
          data={dataUser.current}
          update={updateData}
        />
      );
    case 3:
      return (
        <ConfirmForm
          prevStep={prevStep}
          data={dataUser.current}
          update={updateData}
          submit={writeInfoToDatabase}
        />
      );
    default:
      return <h1>Not found</h1>;
  }
};

export default ApplyForm;
