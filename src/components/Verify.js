import React, { useState, useEffect } from "react";
import { Icon, Button } from "antd";
import firebase from "firebase/app";
import * as moment from "moment";
import "firebase/database";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Common/Footer";

const dbUser = firebase.database();

const Verify = () => {
  const [verifyUID, setVerifyUID] = useState(undefined);
  const [verifySID, setVerifySID] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "F-Code xác nhận thông tin đăng ký";
    if (verifyUID !== undefined && verifySID !== undefined) {
      setLoading(false);
    }
  }, [verifyUID, verifySID]);

  const writeVerifyToFirebase = data => {
    const uID = data.uid;

    const sID = data.sid;

    const dateStart = moment(data.time, "MMDDYYYYHHmmss");
    const dateEnd = moment();

    const differenceInMs = dateEnd.diff(dateStart);

    if (differenceInMs / 1000 <= 3600 && differenceInMs / 1000 >= 0) {
      const resultUID = dbUser
        .ref("applications")
        .child(uID + "/confirm")
        .update({ isVerify: true });
      resultUID
        .then(() => {
          setVerifyUID(true);
        })
        .catch(error => {
          if (!error) {
            setVerifyUID(false);
          }
        });
      if (setVerifyUID) {
        const verifyUpdate = {};
        verifyUpdate[sID] = true;
        const resultSID = dbUser.ref("sID").update(verifyUpdate);
        resultSID
          .then(() => {
            setVerifySID(true);
          })
          .catch(error => {
            if (error) {
              setVerifySID(false);
            }
          });
      }
    } else {
      setVerifyUID(false);
      setVerifySID(false);
    }
  };

  const Result = ({ match }) => {
    writeVerifyToFirebase(match.params);
    return (
      <div className="Result">
        <div className="div-center">
          {loading ? (
            <div>
              <Icon type="loading" className="icon-primary icon-center" />
            </div>
          ) : (
            <div>
              {verifyUID && verifySID ? (
                <div>
                  <Icon
                    type="check-circle"
                    className="icon-success icon-center"
                  />
                  <h2 className="heading-center">Xác nhận thành công</h2>
                  <p>
                    Chúc mừng bạn đã xác nhận thành công. Vui lòng theo dõi
                    thông tin từ CLB để biết thêm thông tin.
                  </p>
                </div>
              ) : (
                <div>
                  <Icon
                    type="close-circle"
                    className="icon-error icon-center"
                  />
                  <h2 className="heading-center">Xác nhận thất bại</h2>
                  <div>
                    <Icon type="warning" className="icon-warning" />
                    &nbsp;
                    <span>
                      Nguyên nhân: đường link không khả dụng hoặc đã hết hạn,
                      vui lòng kiểm tra lại hoặc gửi lại mail xác nhận.
                    </span>
                  </div>
                  <Button type="link">
                    <a href="/application" rel="noopener noreferrer">
                      Gửi lại thông tin
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Router>
      <div className="Verify">
        <h1 className="heading__page">Xác nhận thông tin</h1>
        <Route path="/verify/uid=:uid&sid=:sid&time=:time" component={Result} />
      </div>
      <Footer />
    </Router>
  );
};

export default Verify;
