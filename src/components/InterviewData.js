import React, { useState, useEffect } from "react";
import * as moment from "moment";
import { Button, Checkbox } from "antd";
import ReactTable from "react-table";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table/react-table.css";
import "react-table-hoc-fixed-columns/lib/styles.css";
import firebase from "firebase/app";
import "firebase/database";
import XLSX from "xlsx";
import PopupInfo from "./PopupInfo";
import InterviewScore from "./InterviewScore";
import "../resource/css/DataSheet.css";

const applicationDatabase = firebase.database();
const applicationRef = applicationDatabase.ref("applications");
const sIdRef = applicationDatabase.ref("sID");
const ReactTableFixedColumns = withFixedColumns(ReactTable);

const style = {
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
  textAlign: "center"
};

const wscols = [
  { wch: 10 },
  { wch: 30 },
  { wch: 6 },
  { wch: 6 },
  { wch: 30 },
  { wch: 15 },
  { wch: 30 }
];

const InterviewData = () => {
  const [applications, setApplication] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [readyEx, setReadyEx] = useState(false);
  const [interviewee, setInterviewee] = useState(null);

  useEffect(() => {
    if (!isSorted) {
      getApplication();
    }
  }, [applications, isSorted, isFilter]);

  const getApplication = () => {
    let application = [];
    applicationRef.once("value", snapshot => {
      snapshot.forEach(snap => {
        try {
          if (typeof snap.val() === "object" && snap.val().offline.isOffline) {
            application.push(snap.val());
          }
        } catch (e) {}
      });
      sortAppication(application);
    });
  };

  const sortAppication = application => {
    application.sort((a, b) => {
      let sidA = a.personal.studentID;
      let sidB = b.personal.studentID;
      if (sidA < sidB) {
        return -1;
      }
      if (sidA > sidB) {
        return 1;
      }
    });
    setApplication(application);
    setIsSorted(true);
    setIsFilter(false);
    setReadyEx(true);
  };

  const exportFile = () => {
    let counter = 0;
    let applicationData = [
      ["K15 INTERVIEW DATASHEET"],
      [
        "Mã sinh viên",
        "Họ tên",
        "Chuyên ngành",
        "Giới tính",
        "Email",
        "SĐT",
        "Facebook"
      ]
    ];
    applications.forEach(application => {
      try {
        if (application.challenge.challengeOne.time) {
          counter++;
          let applicationArr = [
            application.personal.studentID,
            application.personal.fullname,
            application.personal.major,
            application.personal.gender,
            application.personal.email,
            application.personal.phone,
            application.personal.facebook
          ];
          applicationData.push(applicationArr);
        }
      } catch (e) {}
    });
    applicationData.push("");
    applicationData.push(["Total", "", counter]);
    const wb = XLSX.utils.book_new();
    const wsAll = XLSX.utils.aoa_to_sheet(applicationData);
    XLSX.utils.book_append_sheet(wb, wsAll, "All Offline");
    wsAll["!cols"] = wscols;
    let mergeRow = [XLSX.utils.decode_range("A1:G1")];
    let cRow = counter + 4;
    let cRange = "A" + cRow + ":B" + cRow;
    mergeRow[1] = XLSX.utils.decode_range(cRange);
    wsAll["!merges"] = mergeRow;
    XLSX.writeFile(
      wb,
      "k15-interview_" + moment().format("MMDDYYYY_HHmmss") + ".xlsx"
    );
  };

  const applicationCols = [
    {
      Header: "STT",
      fixed: "left",
      columns: [
        {
          id: "stt",
          Cell: cellInfo => {
            return cellInfo.index + 1;
          },
          width: 50,
          fixed: "left"
        }
      ]
    },
    {
      Header: "Mã sinh viên",
      fixed: "left",
      columns: [
        {
          id: "studentID",
          width: 100,
          accessor: d => d.personal.studentID,
          fixed: "left"
        }
      ]
    },
    {
      Header: "Họ tên",
      columns: [
        {
          id: "fullname",
          width: 200,
          accessor: d => d.personal.fullname
        }
      ]
    },
    {
      Header: "Ngành học",
      columns: [
        {
          id: "major",
          width: 70,
          accessor: d => d.personal.major,
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value === "SE") {
              return row[filter.id] === "SE";
            }
            if (filter.value === "IA") {
              return row[filter.id] === "IA";
            }
            if (filter.value === "IoT") {
              return row[filter.id] === "IoT";
            }
            return row[filter.id] === "AI";
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">All</option>
              <option value="SE">SE</option>
              <option value="IA">IA</option>
              <option value="IoT">IoT</option>
              <option value="AI">AI</option>
            </select>
          )
        }
      ]
    },
    {
      Header: "Giới tính",
      columns: [
        {
          id: "gender",
          width: 100,
          accessor: d => d.personal.gender,
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value === "Nam") {
              return row[filter.id] === "Nam";
            }
            return row[filter.id] === "Nữ";
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">All</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          )
        }
      ]
    },
    {
      Header: "Email",
      columns: [
        {
          id: "email",
          width: 250,
          accessor: d => d.personal.email
        }
      ]
    },
    {
      Header: "Số điện thoại",
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
    }
  ];

  return (
    <div className="InterviewData">
      <div style={style}>
        <div style={{ width: "100vw", padding: "20px" }}>
          <div style={{ clear: "both" }}></div>
          <ReactTableFixedColumns
            style={{
              marginTop: "20px",
              width: "45vw",
              textAlign: "left",
              float: "left"
            }}
            data={applications}
            columns={applicationCols}
            defaultPageSize={10}
            filterable
            defaultFilterMethod={(filter, row) => {
              return row[filter.id]
                .toString()
                .toLowerCase()
                .includes(filter.value.toString().toLowerCase());
            }}
            SubComponent={row => {
              setInterviewee(row.original);
            }}
            className="-striped"
          />
          <InterviewScore interviewee={interviewee} />
        </div>
      </div>
    </div>
  );
};

export default InterviewData;
