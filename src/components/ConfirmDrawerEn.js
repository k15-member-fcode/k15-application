import React, { useState, useEffect } from "react";
import * as moment from "moment";
import CryptoJS from "crypto-js";
import { Drawer, Button, Icon, Table } from "antd";
import firebase from "firebase/app";
import "firebase/functions";
import { clubToString } from "../utils/utils";
import "../resource/css/table.css";

const ConfirmDrawer = props => {
  const [visible, setVisible] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [send, setSend] = useState(false);
  const [isError, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSend(props.isSend);
  }, [props.isSend]);

  const data = props.data;
  const onChange = props.onChange;
  const submitData = props.submit;

  const dataSource = [
    {
      key: "1",
      question: "Họ tên",
      answer: data.personal.fullname
    },
    {
      key: "2",
      question: "Mã sinh viên",
      answer: data.personal.studentID
    },
    {
      key: "3",
      question: "Chuyên ngành",
      answer: data.personal.major
    },
    {
      key: "4",
      question: "Giới tính",
      answer: data.personal.gender
    },
    {
      key: "5",
      question: "Email",
      answer: data.personal.email
    },
    {
      key: "6",
      question: "Số điện thoại",
      answer: data.personal.phone
    },
    {
      key: "7",
      question: "Địa chỉ Facebook",
      answer: data.personal.facebook
    },
    {
      key: "8",
      question: "Nêu một cách ngắn gọn hiểu biết của bạn về ngành này",
      answer: data.ask.knowledge
    },
    {
      key: "9",
      question: "Bạn có kinh nghiệm như thế nào trong lĩnh vực CNTT?",
      answer: data.ask.experience
    },
    {
      key: "10",
      question: "Tại sao bạn lại muốn tham gia CLB F-Code?",
      answer: data.ask.reason
    },
    {
      key: "11",
      question: "Ưu điểm của bạn là gì?",
      answer: data.ask.pros
    },
    {
      key: "12",
      question: "Khuyết điểm của bạn là gì?",
      answer: data.ask.cons
    },
    {
      key: "13",
      question: "Điều bạn mong đợi khi tham gia CLB là gì?",
      answer: data.ask.expect
    },
    {
      key: "14",
      question:
        "Nếu trở thành thành viên chính thức, bạn sẽ làm gì để phát triển CLB?",
      answer: data.ask.dedication
    },
    {
      key: "15",
      question: "Bạn có câu hỏi gì gửi đến CLB không?",
      answer: data.ask.question === "" ? "(trống)" : data.ask.question
    },
    {
      key: "16",
      question: "Ngoài F-Code, bạn còn tham gia CLB nào khác?",
      answer:
        data.ask.otherClub === "" ? "(trống)" : clubToString(data.ask.otherClub)
    },
    {
      key: "17",
      question: "Bạn đã sẵn sàng chấp nhận thử thách chưa?",
      answer: data.confirm.isReady
    },
    {
      key: "18",
      question: "Bạn đã đọc hết toàn bộ thông tin của form này chưa?",
      answer: data.confirm.isRead
    }
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: 100
    },
    {
      title: "Câu hỏi",
      dataIndex: "question",
      key: "question",
      width: 500
    },
    {
      title: "Câu trả lời của bạn",
      dataIndex: "answer",
      key: "answer",
      width: 500
    }
  ];

  const showConfirm = () => {
    setVisible(true);
  };

  const closeConfirm = () => {
    setVisible(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const backToPrev = () => {
    onChange(1);
  };

  const confirmData = () => {
    if (!isError && data.confirm.tryMail > 0) {
      let emailMessage = firebase.functions().httpsCallable("emailMessage");
      const time = CryptoJS.AES.encrypt(moment().format("MMDDYYYYhhmmssa"), firebase.auth().currentUser.uid).toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32');
      emailMessage({
        info: {
          name: data.personal.fullname,
          email: data.personal.email,
          phone: data.personal.phone,
          facebook: data.personal.facebook,
          sid: data.personal.studentID,
          uid: firebase.auth().currentUser.uid,
          time: time
        }
      })
        .then(function(result) {
        })
        .catch(function(error) {
          setError(true);
        });
      setConfirm(true);
      submitData();
    }
    closeConfirm();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="ConfirmDrawer">
      {visible || loading ? (
        <div className="div-center">
          <Icon type="loading" className="icon-primary icon-center" />
        </div>
      ) : (
        <div>
          {confirm ? (
            <div>
              {send ? (
                <div>
                  {!isError ? (
                    <div className="div-center">
                      <Icon
                        type="check-circle"
                        className="icon-success icon-center"
                      />
                      <h2 className="heading-center">
                        Gửi thông tin thành công
                      </h2>
                      <p>
                        Vui lòng kiểm tra email xác nhận thông tin của bạn từ
                        câu lạc bộ.
                      </p>
                      <Button type="link">
                        <a
                          href="https://mail.google.com/mail/u/0/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Mở Gmail
                        </a>
                      </Button>
                    </div>
                  ) : (
                    <div className="div-center">
                      <Icon
                        type="close-circle"
                        className="icon-error icon-center"
                      />
                      <h2 className="heading-center">Gửi thông tin thất bại</h2>
                      <div>
                        <Icon type="warning" className="icon-warning" />
                        &nbsp;
                        <span>
                          Nguyên nhân: lỗi trong quá trình gửi email, vui lòng
                          thử lại sau vài phút.
                        </span>
                      </div>
                      <Button onClick={showConfirm} type="primary">
                        Thử lại
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="div-center">
                  <Icon
                    type="close-circle"
                    className="icon-error icon-center"
                  />
                  <h2 className="heading-center">Gửi thông tin thất bại</h2>
                  <div>
                    <Icon type="warning" className="icon-warning" />
                    &nbsp;
                    <span>
                      Nguyên nhân: chúng tôi phát hiện thông tin đăng ký của bạn
                      đã tồn tại. Vui lòng kiểm tra lại!
                    </span>
                  </div>
                  <Button onClick={backToPrev} type="link">
                    Quay lại và kiểm tra
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="div-center">
              <Icon type="warning" className="icon-warning icon-center" />
              <h2 className="heading-center">
                Vui lòng xác nhận thông tin của bạn
              </h2>
              <Button
                onClick={showConfirm}
                type="primary"
                className="btn-center"
              >
                Xác nhận ngay
              </Button>
            </div>
          )}
        </div>
      )}
      <Drawer
        title={
          <div>
            <Icon type="safety" className="icon-primary" />
            &nbsp;&nbsp;<span>Xác nhận thông tin của bạn</span>
          </div>
        }
        placement="bottom"
        closable={true}
        onClose={closeConfirm}
        visible={visible}
        height={"100vh"}
      >
        <div className="margin-bottom-sm">
          <span>Vui lòng kiểm tra thông tin của bạn bên dưới:</span>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ y: "55vh" }}
          size="middle"
        />
        <div className="instruction-container">
        <div className="margin-top-sm">
          <Icon type="warning" className="icon-warning" />
          &nbsp;
          <span>
            Nếu có sai sót, hãy nhấn nút chỉnh sửa để quay về form đăng ký.
          </span>
        </div>
        <div className="margin-top-sm">
          <Icon type="info-circle" className="icon-primary" />
          &nbsp;
          <span>
            Số lần gửi lại mail xác nhận còn:{" "}
            <span style={{ color: "red" }}>
              {data.confirm.tryMail > 0
                ? data.confirm.tryMail
                : "Đạt giới hạn, vui lòng liên hệ clb để giải quyết"}
            </span>
            .
          </span>
        </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            borderTop: "1px solid #e9e9e9",
            padding: "10px 16px",
            background: "#fff",
            textAlign: "right"
          }}
        >
          <Button onClick={backToPrev} style={{ marginRight: 8 }}>
            Chỉnh sửa
          </Button>
          <Button
            onClick={confirmData}
            type="primary"
            disabled={data.confirm.tryMail > 0 ? false : true}
          >
            Xác nhận
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default ConfirmDrawer;
