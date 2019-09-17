import React, { useState, useEffect } from "react";
import { Button } from "antd";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { BrowserRouter as Router } from "react-router-dom";
import "./ApplicationPage.css";
import ApplyForm from "./ApplyForm";

const dataFirebase = firebase.database();
const userRef = dataFirebase.ref("users");

const ApplicationPage = () => {
  const [isLogin, setLogin] = useState(false);
  const [isAuth, setAuth] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setLogin(!!user);
    });
    if (isLogin) {
      checkAuth();
    }
  });

  const checkAuth = () => {
    const authEmail = firebase
      .auth()
      .currentUser.email.replace("@gmail.com", "");
    userRef.child(authEmail).once("value", snapshot => {
      if (snapshot.val() === null) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    });
  };

  return (
    <Router>
      <div className="ApplicationPage">
        {isLogin ? (
          isAuth ? (
            <div>
              <h1>ĐĂNG KÝ THÀNH VIÊN CLB F-CODE</h1>
              <h2>Xin chào {firebase.auth().currentUser.displayName}!</h2>
              <p>Vui lòng hoàn thành form sau để đăng ký thành viên của F-Code</p>
              <ApplyForm />
            </div>
          ) : (
            <h1 className="notiError">Sorry! You have already signed up for F-Code!</h1>
          )
        ) : (
          <div>
            <h1 className="notiError">Please sign up before to go this page</h1>
            <Button type="primary">
              <a href="/">Back to home</a>
            </Button>
          </div>
        )}
      </div>
    </Router>
  );
};
export default ApplicationPage;
