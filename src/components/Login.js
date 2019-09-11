import React, { useState, useEffect } from "react";
import { Button } from "antd";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebaseConfig } from "../utils/configFirebase";
import { BrowserRouter as Router } from "react-router-dom";

firebase.initializeApp({
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId
});

const Login = () => {
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setLogin(!!user);
    });
  });

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "application",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => true
    }
  };

  return (
    <Router>
      <div className="Login">
        {isLogin ? (
          <Button type="danger" onClick={() => firebase.auth().signOut()}>
            Sign out
          </Button>
        ) : (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    </Router>
  );
};
export default Login;
