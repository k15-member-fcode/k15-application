import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { Table } from "antd";

const applicationDatabase = firebase.database();
const scoreRef = applicationDatabase.ref("scores");

const InterviewScoreTable = props => {
  const [dataScore, setDataScore] = useState([]);
  const [opacity, setOpacity] = useState(0);
  const uid = useRef(null);
  const setIsSubmit = props.setIsSubmit;
  useEffect(() => {
    if (uid.current !== props.uid || props.submit) {
      uid.current = props.uid;
      getScoresFromFirebase();
      setIsSubmit(!props.submit);
    }
  });

  const getScoresFromFirebase = () => {
    try {
      let scores = [];
      let index = 0;
      let totalScore = 0;
      if (uid.current !== null) {
        scoreRef.child(uid.current + "/interview").once("value", snapshot => {
          if (snapshot.val() !== null) {
            snapshot.forEach(snap => {
              index++;
              const data = snap.val();
              let score = {
                key: index,
                score: data.score,
                comments: data.comments,
                by: data.by
              };
              totalScore += parseFloat(data.score);
              scores.push(score);
            });
            index++;
            scores.push({
              key: index,
              score: (totalScore / (index - 1)).toString()
            });
            setDataScore(scores);
            setOpacity(1);
          } else {
            index++;
            scores.push({
              key: index,
              score: "0"
            });
            setDataScore(scores);
          }
        });
      } else {
        setOpacity(0);
      }
    } catch (e) {}
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: 50,
      render: (text, row, index) => {
        let len = dataScore.length;
        if (index < len - 1) {
          return <span>{text}</span>;
        }
        return {
          children: <span className="table-avg-score">Điểm trung bình</span>,
          props: {
            colSpan: 2
          }
        };
      }
    },
    {
      title: "Người chấm",
      dataIndex: "by",
      key: "by",
      width: 200,
      render: (text, row, index) => {
        let len = dataScore.length;
        if (index < len - 1) {
          return <span>{text}</span>;
        }
        return {
          props: {
            colSpan: 0
          }
        };
      }
    },
    {
      title: "Điểm",
      dataIndex: "score",
      key: "score",
      width: 75,
      render: (text, row, index) => {
        let len = dataScore.length;
        if (index < len - 1) {
          return <span>{text}</span>;
        }
        return {
          children: <span className="table-avg-score">{text}</span>,
          props: {
            colSpan: 2
          }
        };
      }
    },
    {
      title: "Nhận xét",
      dataIndex: "comments",
      key: "comments",
      width: 500,
      render: (text, row, index) => {
        let len = dataScore.length;
        if (index < len - 1) {
          return <span>{text}</span>;
        }
        return {
          props: {
            colSpan: 0
          }
        };
      }
    }
  ];

  return (
    <div className="InterviewScoreTable">
      {opacity ? (
        <div>
          <h3>Bảng điểm</h3>
          <Table
            columns={columns}
            dataSource={dataScore}
            pagination={false}
            bordered
            size="small"
          />
        </div>
      ) : (
        <h3>Chưa có điểm được lưu</h3>
      )}
    </div>
  );
};

export default InterviewScoreTable;
