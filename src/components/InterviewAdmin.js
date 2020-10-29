import React, { useState, useEffect } from "react";
import { Button, Icon } from "antd";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import InterviewData from "./InterviewData";

const questionDatabase = firebase.database();
const adminRef = questionDatabase.ref("admin");

const InterviewAdmin = () => {
  const [isLogin, setLogin] = useState(false);
  const [isAuth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "K15 Interview Admin";
    firebase.auth().onAuthStateChanged(user => {
      setLogin(!!user);
    });
    if (isLogin) {
      checkAuth();
    }
    if (isAuth !== null) {
      setIsLoading(false);
    }
  });

  const checkAuth = () => {
    let authId = firebase.auth().currentUser.uid;
    adminRef.child(authId).once("value", data => {
      if (data.val()) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    });
  };

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };
  return (
    <div className="InterviewAdmin" style={{ textAlign: "center" }}>
      {isLogin ? (
        <div>
          <h3>Welcome {firebase.auth().currentUser.displayName}</h3>
          <Button type="danger" onClick={() => firebase.auth().signOut()}>
            Sign out
          </Button>
          {isLoading ? (
            <div className="div-center" style={{ marginTop: "15px" }}>
              <Icon type="loading" className="icon-primary icon-center" />
            </div>
          ) : (
            <div>
              {isAuth ? (
                <InterviewData />
              ) : (
                <div>Sorry! You can not access this page</div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div style={{ marginTop: "20%" }}>
          <h1>Please login to check your authority!</h1>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      )}
    </div>
  );
};

export default InterviewAdmin;
