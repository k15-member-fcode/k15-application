import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { Button, Drawer, Table, Icon } from "antd";
import PopupInfoLeft from "./PopupInfoLeft";
import { clubToString } from "../utils/utils";
import ScoreForm from "./ScoreForm";
import InterviewScoreTable from "./InterviewScoreTable";
import "../resource/css/InterviewScore.css";

const applicationDatabase = firebase.database();
const scoreRef = applicationDatabase.ref("scores");

const InterviewScore = props => {
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const closeData = () => {
    setVisible(false);
  };

  const showData = () => {
    setVisible(true);
  };

  try {
    setDataSource([
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
        answer: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={
              data.personal.facebook.includes("http")
                ? data.personal.facebook
                : "https://" + data.personal.facebook
            }
          >
            {data.personal.facebook}
          </a>
        )
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
          data.ask.otherClub === ""
            ? "(trống)"
            : clubToString(data.ask.otherClub)
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
      },
      {
        key: "19",
        question: "Trạng thái",
        answer: data.confirm.isVerify ? "Đã xác nhận" : "Chưa xác nhận"
      }
    ]);
  } catch (e) {}

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: 50
    },
    {
      title: "Câu hỏi",
      dataIndex: "question",
      key: "question",
      width: 350
    },
    {
      title: "Câu trả lời",
      dataIndex: "answer",
      key: "answer",
      width: 700
    }
  ];

  useEffect(() => {
    setData(props.interviewee);
  }, [props.interviewee]);

  const writeScoreToFirebase = values => {
    const score = values.score;
    const comments = values.comments;
    const childUID = data.uID;
    const authId = firebase.auth().currentUser.uid;
    scoreRef.child(childUID + "/interview/" + authId).update({
      score: score,
      comments: comments,
      by: firebase.auth().currentUser.displayName
    });
    setIsSubmit(true);
  };

  return (
    <div
      className="InterviewScore"
      style={{
        display: "inline",
        float: "left",
        width: "53%",
        marginTop: "20px",
        textAlign: "center"
      }}
    >
      <h2>Thông tin thí sinh</h2>
      <p>Họ tên: {data === null ? "Null" : data.personal.fullname}</p>
      <Button
        type="primary"
        onClick={showData}
        disabled={data === null ? 1 : 0}
      >
        Xem thông tin
      </Button>
      <ScoreForm
        submit={writeScoreToFirebase}
        disable={data === null ? 1 : 0}
      />

      <InterviewScoreTable
        uid={props.interviewee !== null ? props.interviewee.uID : null}
        submit={isSubmit}
        setIsSubmit={setIsSubmit}
      />

      <Drawer
        title={
          <div>
            <Icon type="safety" className="icon-primary" />
            &nbsp;&nbsp;<span>Thông tin đăng ký</span>
          </div>
        }
        placement="left"
        closable={true}
        mask={false}
        maskClosable={false}
        onClose={closeData}
        visible={visible}
        height={"100vh"}
        width={"50vw"}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ y: "80vh" }}
          size="middle"
        />
      </Drawer>
    </div>
  );
};

export default InterviewScore;
