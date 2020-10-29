import React, { useState, useEffect } from "react";
import * as moment from "moment";
import { Button } from "antd";
import ReactTable from "react-table";
import "react-table/react-table.css";
import firebase from "firebase/app";
import "firebase/database";
import XLSX from "xlsx";
import { clubToString } from "../utils/utils";

const applicationDatabase = firebase.database();
const applicationRef = applicationDatabase.ref("applications");

const wscols = [
  { wch: 4 },
  { wch: 10 },
  { wch: 30 },
  { wch: 6 },
  { wch: 6 },
  { wch: 30 },
  { wch: 15 },
  { wch: 30 }
];

const style = {
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
  textAlign: "center"
};

const DataSheet = () => {
  const [applications, setApplication] = useState([]);

  useEffect(() => {
    getApplication();
  }, [applications]);

  const getApplication = () => {
    let application = [];
    applicationRef.once("value", snapshot => {
      snapshot.forEach(snap => {
        if (typeof snap.val() === "object") {
          application.push(snap.val());
        }
      });
      setApplication(application);
    });
    let sortable = applications.slice(0);
    sortable.sort((a, b) => {
      var nameA = a.timeCreate; // bỏ qua hoa thường
      var nameB = b.timeCreate; // bỏ qua hoa thường
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    // console.log(sortable);
    setApplication(sortable);
  };

  const exportFile = () => {
    let countVerify = 0;
    let counter = 0;
    let applicationData = [
      ["K15 APPLICATION DATASHEET"],
      [
        "STT",
        "Mã sinh viên",
        "Họ tên",
        "Chuyên ngành",
        "Giới tính",
        "Email",
        "SĐT",
        "Facebook",
        "Xác nhận",
        "Nêu một cách ngắn gọn hiểu biết của bạn về ngành này",
        "Bạn có kinh nghiệm như thế nào trong lĩnh vực CNTT?",
        "Tại sao bạn lại muốn tham gia CLB F-Code?",
        "Ưu điểm của bạn là gì?",
        "Khuyết điểm của bạn là gì?",
        "Điều bạn mong đợi khi tham gia CLB là gì?",
        "Nếu trở thành thành viên chính thức, bạn sẽ làm gì để phát triển CLB?",
        "Bạn có câu hỏi gì gửi đến CLB không?",
        "Ngoài F-Code, bạn còn tham gia CLB nào khác?",
        "Bạn đã sẵn sàng chấp nhận thử thách chưa?",
        "Bạn đã đọc hết toàn bộ thông tin của form này chưa?",
        "Ngày tạo"
      ]
    ];
    applications.forEach(application => {
      counter++;
      let applicationArr = [
        counter,
        application.personal.studentID,
        application.personal.fullname,
        application.personal.major,
        application.personal.gender,
        application.personal.email,
        application.personal.phone,
        application.personal.facebook,
        application.confirm.isVerify ? "Đã xác nhân" : "Chưa xác nhận",
        application.ask.knowledge,
        application.ask.experience,
        application.ask.reason,
        application.ask.pros,
        application.ask.cons,
        application.ask.expect,
        application.ask.dedication,
        application.ask.question === "" ? "(trống)" : application.ask.question,
        application.ask.otherClub === ""
          ? "(trống)"
          : clubToString(application.ask.otherClub),
        application.confirm.isReady ? "Đã sẵn sàng" : "Chưa sẵn sàng",
        application.confirm.isRead ? "Đã đọc" : "Chưa đọc",
        application.timeCreate
      ];
      applicationData.push(applicationArr);
      if (application.confirm.isVerify) {
        countVerify++;
      }
    });
    applicationData.push("");
    applicationData.push(["Total verify", "", "", countVerify]);
    applicationData.push(["Total", "", "", counter]);
    const wb = XLSX.utils.book_new();
    const wsAll = XLSX.utils.aoa_to_sheet(applicationData);
    XLSX.utils.book_append_sheet(wb, wsAll, "All Applications");
    wsAll["!cols"] = wscols;
    let mergeRow = [XLSX.utils.decode_range("A1:G1")];
    for (let i = 1; i <= 2; i++) {
      let cRow = i + counter + 3;
      let cRange = "A" + cRow + ":C" + cRow;
      mergeRow[i] = XLSX.utils.decode_range(cRange);
    }
    wsAll["!merges"] = mergeRow;
    XLSX.writeFile(
      wb,
      "k15-applications_" + moment().format("MMDDYYYY_HHmmss") + ".xlsx"
    );
  };

  const questionColumns = [
    {
      Header: "Student ID",
      columns: [
        {
          id: "studentID",
          accessor: d => "SE" + d.personal.studentID
        }
      ]
    },
    {
      Header: "Fullname",
      columns: [
        {
          id: "fullname",
          accessor: d => d.personal.fullname,
          width: 200
        }
      ]
    },
    {
      Header: "Major",
      columns: [
        {
          id: "major",
          accessor: d => d.personal.major,
          width: 50
        }
      ]
    },
    {
      Header: "Gender",
      columns: [
        {
          id: "gender",
          accessor: d => d.personal.gender,
          width: 50
        }
      ]
    },
    {
      Header: "Email",
      columns: [
        {
          id: "email",
          accessor: d => d.personal.email,
          width: 250
        }
      ]
    },
    {
      Header: "Phone",
      columns: [
        {
          id: "phone",
          accessor: d => d.personal.phone,
          width: 120
        }
      ]
    },
    {
      Header: "Facebook",
      columns: [
        {
          id: "facebook",
          accessor: d => d.personal.facebook,
          width: 250
        }
      ]
    },
    {
      Header: "Verify",
      columns: [
        {
          id: "verify",
          accessor: d => (d.confirm.isVerify ? "True" : "False"),
          width: 70
        }
      ]
    },
    {
      Header: "Created at",
      columns: [
        {
          id: "timeCreate",
          accessor: d => d.timeCreate,
          width: 150,
          sortMethod: (a, b) => {
            let beginTime = moment(a, "MM/DD/YYYY - HH:mm");
            let endTime = moment(b, "MM/DD/YYYY - HH:mm");
            if (beginTime.isBefore(endTime)) {
              return -1;
            } else {
              return 1;
            }
          }
        }
      ]
    }
  ];

  return (
    <div className="DataSheet">
      <div style={style}>
        <div>
          <h1>K15 Applications Datasheet</h1>
          <Button type="dashed" onClick={exportFile}>
            Export to Excel
          </Button>
          <ReactTable
            style={{
              marginTop: "20px",
              maxWidth: "100vw"
            }}
            data={applications}
            columns={questionColumns}
            defaultPageSize={10}
          />
        </div>
      </div>
    </div>
  );
};

export default DataSheet;
