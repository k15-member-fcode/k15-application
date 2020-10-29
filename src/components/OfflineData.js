import React, { useState, useEffect } from "react";
import * as moment from "moment";
import { Button, Checkbox, Input } from "antd";
import ReactTable from "react-table";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table/react-table.css";
import "react-table-hoc-fixed-columns/lib/styles.css";
import firebase from "firebase/app";
import "firebase/database";
import XLSX from "xlsx";
import PopupInfo from "./PopupInfo";
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
  { wch: 30 },
  { wch: 30 }
];

const OfflineData = () => {
  const [applications, setApplication] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
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
        if (typeof snap.val() === "object" && snap.val().confirm.isVerify) {
          application.push(snap.val());
        }
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
    setReadyEx(true);
  };

  const checkOfflineToFirebase = (cellInfo, value) => {
    const childUID = cellInfo.original.uID;
    const childSID = cellInfo.original.personal.studentID;
    const verify = {};
    verify[childSID] = value;
    try {
      const reason = cellInfo.original.offline.reasonOff;
      applicationRef.child(childUID + "/offline").update({
        isOffline: value,
        reasonOff: reason
      });
    } catch (e) {
      applicationRef.child(childUID + "/offline").update({
        isOffline: value,
        reasonOff: ""
      });
    }
    applicationRef.child(childUID + "/offline").update({
      isOffline: value
    });

    sIdRef.update(verify);
    setIsSorted(false);
  };

  const exportFile = () => {
    let counter = 0;
    let applicationData = [
      ["K15 OFFLINE DATASHEET"],
      [
        "Mã sinh viên",
        "Họ tên",
        "Chuyên ngành",
        "Giới tính",
        "Email",
        "SĐT",
        "Facebook",
        "Lý do vắng (nếu có)"
      ]
    ];
    applications.forEach(application => {
      try {
        if (application.offline.isOffline) {
          counter++;
          let applicationArr = [
            application.personal.studentID,
            application.personal.fullname,
            application.personal.major,
            application.personal.gender,
            application.personal.email,
            application.personal.phone,
            application.personal.facebook,
            application.offline.reasonOff
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
    let mergeRow = [XLSX.utils.decode_range("A1:H1")];
    let cRow = counter + 4;
    let cRange = "A" + cRow + ":B" + cRow;
    mergeRow[1] = XLSX.utils.decode_range(cRange);
    wsAll["!merges"] = mergeRow;
    XLSX.writeFile(
      wb,
      "k15-offline_" + moment().format("MMDDYYYY_HHmmss") + ".xlsx"
    );
  };

  const checkOfflineBox = cellInfo => {
    let checked;
    try {
      checked = cellInfo.original.offline.isOffline;
    } catch (err) {
      checked = false;
    }
    return (
      <Checkbox
        checked={checked}
        onChange={() => {
          checked = !checked;
          checkOfflineToFirebase(cellInfo, checked);
        }}
      ></Checkbox>
    );
  };

  const handleInputChange = (cellInfo, event) => {
    const reason = event.target.value;
    if (event.charCode === 13) {
      const childUID = cellInfo.original.uID;
      applicationRef.child(childUID + "/offline").update({
        isOffline: true,
        reasonOff: reason
      });
      setIsSorted(false);
    }
  };

  const reasonBox = cellInfo => {
    let reason;
    try {
      reason = cellInfo.original.offline.reasonOff;
    } catch (err) {
      reason = "";
    }
    return (
      <input
        type="text"
        name="reason"
        defaultValue={reason}
        placeholder="nhấn enter để lưu"
        onKeyPress={handleInputChange.bind(null, cellInfo)}
        style={{ width: "100%" }}
      />
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
          width: 250,
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
    // {
    //   Header: "Facebook",
    //   columns: [
    //     {
    //       id: "facebook",
    //       accessor: d => {
    //         const fbLink = !d.personal.facebook.includes("http")
    //           ? "https://" + d.personal.facebook
    //           : d.personal.facebook;
    //         return (
    //           <a target="_blank" rel="noopener noreferrer" href={fbLink}>
    //             {d.personal.facebook}
    //           </a>
    //         );
    //       },
    //       width: 300
    //     }
    //   ]
    // },
    {
      Header: "Trạng thái",
      columns: [
        {
          id: "offline",
          accessor: d => {
            try {
              return d.offline.isOffline ? "Đã check" : "Chưa check";
            } catch (err) {
              return "Chưa check";
            }
          },
          width: 120,
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value === "True") {
              return row[filter.id] === "Đã check";
            }
            return row[filter.id] === "Chưa check";
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
      Header: "Điểm danh",
      fixed: "right",
      columns: [
        {
          id: "checkOffline",
          Cell: checkOfflineBox,
          width: 100
        }
      ]
    },
    {
      Header: "Lý do vắng",
      fixed: "right",
      columns: [
        {
          id: "reasonBox",
          Cell: reasonBox,
          width: 300
        }
      ]
    }
  ];

  return (
    <div className="OfflineData">
      <div style={style}>
        <div>
          <h1>K15 Offline Checking Datasheet</h1>
          <Button type="dashed" onClick={exportFile} disabled={!readyEx}>
            Export to Excel
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

export default OfflineData;
