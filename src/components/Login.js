import React, { useState, useEffect } from "react";
import { Icon, Button } from "antd";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const Login = props => {
  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setLogin(!!user);
    });
  });

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  const nextStep = props.nextStep;
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => true
    }
  };
  return (
    <div className="Login">
      {loading ? (
        <div>
          <Icon type="loading" className="icon-primary icon-center" />
        </div>
      ) : (
        <div>
          {isLogin ? (
            <div>
              <Icon className="icon-success icon-center" type="check-circle" />
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
            <div>
              <div>
                <p className="p__intruction--sub">
                  Vui lòng đăng nhập chính xác tài khoản Google cá nhân
                </p>
              </div>
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
