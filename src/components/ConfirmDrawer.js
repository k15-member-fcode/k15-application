import React, { useState, useEffect } from "react";
import { Drawer, Button, Icon, Table } from "antd";
import { clubToString } from "../Common/clubToString";

const ConfirmDrawer = props => {
  const [visible, setVisible] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [send, setSend] = useState(false);
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
    setConfirm(true);
    submitData();
    closeConfirm();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="ConfirmDrawer">
      {visible || loading ? (
        <div>
          <Icon type="loading" className="icon-primary icon-center" />
        </div>
      ) : (
        <div>
          {confirm ? (
            <div>
              {send ? (
                <div>
                  <Icon
                    type="check-circle"
                    className="icon-success icon-center"
                  />
                  <h2 className="heading-center">Đăng ký thành công</h2>
                </div>
              ) : (
                <div>
                  <Icon
                    type="close-circle"
                    className="icon-error icon-center"
                  />
                  <h2 className="heading-center">Đăng ký thất bại</h2>
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
            <div>
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
          scroll={{ y: "60vh" }}
          size="middle"
        />
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
            Bằng việc xác nhận, bạn đảm bảo thông tin bạn cung cấp là chính xác.
          </span>
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
          <Button onClick={confirmData} type="primary">
            Xác nhận
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default ConfirmDrawer;
