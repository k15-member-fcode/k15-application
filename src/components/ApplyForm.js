import React, { useState, useRef, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import Login from "./Login";
import PersonalForm from "./PersonalForm";
import AskForm from "./AskForm";
import ConfirmForm from "./ConfirmForm";
import ConfirmDrawer from "./ConfirmDrawer";
import "./css/ApplyForm.css";
import { firebaseConfig } from "../utils/configFirebase";
import { clubToString } from "../Common/clubToString";

firebase.initializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId
});

const dbUser = firebase.database();

const ApplyForm = props => {
  const [step, setStep] = useState(props.step);
  const [send, setSend] = useState(false);

  useEffect(() => {
    setStep(props.step);
  }, [props.step]);

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
  const onChange = props.setStep;
  const nextStep = () => {
    onChange(step + 1);
  };

  const prevStep = () => {
    onChange(step - 1);
  };

  const updateData = (target, data) => {
    dataUser.current[target] = data;
  };

  const writeInfoToDatabase = () => {
    const studentID = dataUser.current.personal.studentID;
    const validRef = dbUser.ref("verify").child(studentID);
    validRef.once("value", snapshot => {
      if (snapshot.val()) {
        setSend(false);
      } else {
        let date = new Date();
        const day = String(date.getDate()).padStart(2, "0");
        const mon = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const min = String(date.getMinutes()).padStart(2, "0");
        date = hours + ":" + min + " - " + day + "/" + mon + "/" + year;
        dataUser.current.timeCreate = date;
        dataUser.current.ask.otherClub = clubToString(
          dataUser.current.ask.otherClub
        );
        const userRef = dbUser.ref("users");
        const newRef = userRef.child(studentID);
        newRef.set(dataUser.current);
        const verifyUpdate = {};
        verifyUpdate[studentID] = false;
        dbUser.ref("verify").update(verifyUpdate);
        setSend(true);
        firebase.auth().signOut();
      }
    });
  };

  switch (step) {
    case 0:
      return <Login nextStep={nextStep} />;
    case 1:
      return (
        <PersonalForm
          nextStep={nextStep}
          prevStep={prevStep}
          data={dataUser.current}
          update={updateData}
        />
      );
    case 2:
      return (
        <AskForm
          nextStep={nextStep}
          prevStep={prevStep}
          data={dataUser.current}
          update={updateData}
        />
      );
    case 3:
      return (
        <ConfirmForm
          nextStep={nextStep}
          prevStep={prevStep}
          data={dataUser.current}
          update={updateData}
        />
      );
    case 4:
      return (
        <ConfirmDrawer
          onChange={onChange}
          submit={writeInfoToDatabase}
          data={dataUser.current}
          isSend={send}
        />
      );
    default:
      return <h1>Not found</h1>;
  }
};

export default ApplyForm;
