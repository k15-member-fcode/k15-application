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
import { clubToString } from "../utils/utils";
import "../resource/css/DataSheet.css";

const applicationDatabase = firebase.database();
const applicationRef = applicationDatabase.ref("applications");
const sIdRef = applicationDatabase.ref("sID");
const ReactTableFixedColumns = withFixedColumns(ReactTable);

const wscols = [
  { wch: 10 },
  { wch: 30 },
  { wch: 6 },
  { wch: 6 },
  { wch: 30 },
  { wch: 15 },
  { wch: 30 },
  { wch: 15 },
  { wch: 30 },
  { wch: 30 },
  { wch: 30 },
  { wch: 30 },
  { wch: 30 },
  { wch: 30 },
  { wch: 30 },
  { wch: 30 },
  { wch: 30 },
  { wch: 15 },
  { wch: 15 },
  { wch: 20 }
];

const style = {
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
  textAlign: "center"
};

const DataSheet = () => {
  const [applications, setApplication] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [readyEx, setReadyEx] = useState(false);

  useEffect(() => {
    if (!isSorted) {
      getApplication();
    }
  }, [applications, isSorted]);

  const getApplication = () => {
    let application = [];
    applicationRef.once("value", snapshot => {
      snapshot.forEach(snap => {
        if (typeof snap.val() === "object") {
          application.push(snap.val());
        }
      });
      sortAppication(application);
    });
  };

  const sortAppication = application => {
    application.sort((a, b) => {
      let timeA = a.timeCreate;
      let timeB = b.timeCreate;
      if (timeA < timeB) {
        return 1;
      }
      if (timeA > timeB) {
        return -1;
      }
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
    setReadyEx(true);
  };

  const exportFile = () => {
    let countVerify = 0;
    let counter = 0;
    let applicationData = [
      ["K15 APPLICATION DATASHEET"],
      [
        "Mã sinh viên",
        "Họ tên",
        "Chuyên ngành",
        "Giới tính",
        "Email",
        "SĐT",
        "Facebook",
        "Trạng thái",
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
        "Ngày đăng ký"
      ]
    ];
    applications.forEach(application => {
      counter++;
      let applicationArr = [
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
    let mergeRow = [XLSX.utils.decode_range("A1:T1")];
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

  const changeVerify = (cellInfo, value) => {
    const childUID = cellInfo.original.uID;
    const childSID = cellInfo.original.personal.studentID;
    const verify = {};
    verify[childSID] = value;

    applicationRef.child(childUID + "/confirm").update({
      isVerify: value
    });

    sIdRef.update(verify);
    setIsSorted(false);
  };

  const changeVerifyBox = cellInfo => {
    let checked = cellInfo.original.confirm.isVerify;
    return (
      <Checkbox
        checked={checked}
        onChange={() => {
          checked = !checked;
          changeVerify(cellInfo, checked);
        }}
        disabled={!isEdit}
      ></Checkbox>
    );
  };

  const handleInputChange = (cellInfo, event) => {
    let data = cellInfo.original.personal;
    const childUID = cellInfo.original.uID;
    data[cellInfo.column.id] = event.target.value;
    if (event.charCode === 13) {
      applicationRef.child(childUID + "/personal").update(data);
      setIsSorted(false);
    }
  };

  const renderEditable = cellInfo => {
    const cellValue = cellInfo.original.personal[cellInfo.column.id];
    if (isEdit) {
      return (
        <input
          placeholder="type here"
          name="input"
          type="text"
          onKeyPress={handleInputChange.bind(null, cellInfo)}
          defaultValue={cellValue}
        />
      );
    } else if (cellInfo.column.id === "facebook") {
      const fbLink = !cellValue.includes("http")
        ? "https://" + cellValue
        : cellValue;
      return (
        <a target="_blank"  rel="noopener noreferrer" href={fbLink}>
          {cellValue}
        </a>
      );
    } else {
      return cellValue;
    }
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
          Cell: renderEditable,
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
          accessor: d => d.personal.fullname,
          Cell: renderEditable
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
          Cell: renderEditable,
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
          Cell: renderEditable,
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
          Cell: renderEditable,
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
          Cell: renderEditable,
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
          Cell: renderEditable,
          accessor: d => d.personal.facebook,
          width: 250
        }
      ]
    },
    {
      Header: "Trạng thái",
      columns: [
        {
          id: "verify",
          accessor: d => (d.confirm.isVerify ? "Đã xác nhận" : "Chưa xác nhận"),
          width: 120,
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value === "True") {
              return row[filter.id] === "Đã xác nhận";
            }
            return row[filter.id] === "Chưa xác nhận";
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">All</option>
              <option value="True">Đã xác nhận</option>
              <option value="False">Chưa xác nhận</option>
            </select>
          )
        }
      ]
    },
    {
      Header: "Ngày đăng ký",
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
    },
    {
      Header: "Xác nhận",
      fixed: "right",
      columns: [
        {
          id: "checkVerify",
          Cell: changeVerifyBox,
          width: 100
        }
      ]
    }
  ];

  return (
    <div className="DataSheet">
      <div style={style}>
        <div>
          <h1>K15 Applications Datasheet</h1>
          <Button type="dashed" onClick={exportFile} disabled={!readyEx}>
            Export to Excel
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            Edit: {isEdit ? "ON" : "OFF"}
          </Button>
          <Button type="default" style={{background: "#52c41a", color: "#fff"}} >
            <a href="/admin/offline">Điểm danh</a>
          </Button>
          <Button type="default" style={{background: "#c49f09", color: "#fff"}} >
            <a href="/admin/score-interview">Điểm phỏng vấn</a>
          </Button>
          <ReactTableFixedColumns
            style={{
              marginTop: "20px",
              width: "100vw",
              textAlign: "left"
            }}
            data={applications}
            columns={applicationCols}
            defaultPageSize={10}
            filterable
            defaultFilterMethod={(filter, row) => {
              console.log(row);
              console.log(filter);
              return row[filter.id]
                .toString()
                .toLowerCase()
                .includes(filter.value.toString().toLowerCase());
            }}
            SubComponent={row => {
              return <PopupInfo data={row.original} />;
            }}
            className="-striped"
          />
        </div>
      </div>
    </div>
  );
};

export default DataSheet;
