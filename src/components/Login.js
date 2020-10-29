import React, { useState, useEffect } from "react";
import { Icon, Button } from "antd";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import * as moment from "moment";

const Login = props => {
  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dbUser, setDbUser] = useState(false);
  const [isValid, setIsValid] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setLogin(!!user);
    });
    if (isLogin) {
      checkUserOnFirebase();
      checkValidTime();
    }
    setDbUser(props.dbUser);
  });

  const nextStep = props.nextStep;
  const onChange = props.onChange;
  const updateData = props.update;

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => true
    }
  };
  setTimeout(() => {
    setLoading(false);
  }, 1500);

  const checkUserOnFirebase = () => {
    const userID = firebase.auth().currentUser.uid;
    const userRef = dbUser.ref("applications").child(userID);
    userRef.once("value", snapshot => {
      if (snapshot.val()) {
        updateData("personal", snapshot.val().personal);
        updateData("ask", snapshot.val().ask);
        updateData("confirm", snapshot.val().confirm);
        if (snapshot.val().confirm.isVerify) {
          onChange(5);
        } else {
          onChange(4);
        }
      }
    });
  };

  const checkValidTime = () => {
    const dateEnd = moment("2019-11-01 00:00:00", "YYYY-MM-DD HH:mm:ss");
    const dateStart = moment();
    if (dateEnd.diff(dateStart) > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  return (
    <div className="Login">
      {loading ? (
        <div className="div-center">
          <Icon type="loading" className="icon-primary icon-center" />
        </div>
      ) : (
        <div>
          {isLogin ? (
            <div>
              {isValid ? (
                <div className="div-center">
                  <Icon
                    className="icon-success icon-center"
                    type="check-circle"
                  />
                  <h2 className="heading-center">Đăng nhập thành công </h2>
                  <div className="Login-Button">
                    <div className="btn-container">
                      <Button
                        type="primary"
                        className="btn-right"
                        onClick={nextStep}
                      >
                        Tiếp tục
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="div-center">
                  <p className="p__intruction--sub">
                    Xin lỗi, thời gian đăng ký thành viên đã kết thúc.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="div-center">
              <p className="p__intruction--sub">
                Vui lòng đăng nhập chính xác tài khoản Google cá nhân
              </p>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Login;
