import React, { useState, useRef, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import Login from "./Login";
import PersonalForm from "./PersonalForm";
import AskForm from "./AskForm";
import ConfirmForm from "./ConfirmForm";
import ConfirmDrawer from "./ConfirmDrawer";
import Congratulation from "./Congratulation";
import * as moment from "moment";
import { firebaseConfig } from "../utils/configFirebase";

firebase.initializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId
});
// firebase.initializeApp({
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSASING_SENDER_ID
// });

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
      isVerify: false,
      tryMail: 5
    },
    timeCreate: undefined,
    uID: undefined
  });
  const onChange = props.setStep;
  const nextStep = () => {
    onChange(step + 1);
  };

  const prevStep = () => {
    onChange(step - 1);
  };

  const updateData = (target, data) => {
    Object.keys(data).map(
      key =>
        (data[key] =
          typeof data[key] === "string" ? data[key].trim() : data[key])
    );
    dataUser.current[target] = data;
  };
  const writeInfoToDatabase = () => {
    const studentID = dataUser.current.personal.studentID;
    const userID = firebase.auth().currentUser.uid;
    const validRef = dbUser.ref("sID").child(studentID);
    validRef.once("value", snapshot => {
      if (snapshot.val()) {
        setSend(false);
      } else {
        const date = moment().format("MM/DD/YYYY - HH:mm");
        dataUser.current.timeCreate = date;
        dataUser.current.confirm.tryMail = dataUser.current.confirm.tryMail - 1;
        dataUser.current.uID = firebase.auth().currentUser.uid;
        const userRef = dbUser.ref("applications");
        const newRef = userRef.child(userID);
        newRef.set(dataUser.current);
        const verifyUpdate = {};
        verifyUpdate[studentID] = false;
        dbUser.ref("sID").update(verifyUpdate);
        setSend(true);
        firebase.auth().signOut();
      }
    });
  };

  switch (step) {
    case 0:
      return (
        <Login
          onChange={onChange}
          nextStep={nextStep}
          data={dataUser.current}
          dbUser={dbUser}
          update={updateData}
        />
      );
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
    case 5:
      return <Congratulation name={dataUser.current.personal.fullname} />;
    default:
      return <h1>Not found</h1>;
  }
};

export default ApplyForm;
