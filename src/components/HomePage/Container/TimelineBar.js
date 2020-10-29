import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import { FaRegNewspaper, FaFireAlt } from "react-icons/fa";
import { IoIosSync, IoIosTimer, IoIosStar, IoMdTrophy } from "react-icons/io";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "../../../resource/css/timeline-bar.css";

const timelineData = [
  {
    className: "vertical-timeline-element--registerForm",
    date: "06/10 - 01/11",
    icon: <FaRegNewspaper />,
    color: "rgb(15, 143, 31)",
    title: "Mở form đăng ký",
    subtitle: "Đã đóng",
    content: (
      <p>
        Form đăng ký đã được mở và sẽ kết thúc vào ngày thứ 6 (01/11). Bạn hãy
        nhấn <a href="/application"> vào đây </a> để đăng ký.
      </p>
    )
  },
  {
    className: "vertical-timeline-element--offline",
    date: "03/11",
    color: "rgb(33, 150, 243)",
    icon: <IoIosStar />,
    title: "Offline với clb F-Code",
    subtitle: "Sắp diễn ra",
    content: (
      <p>
        Vào ngày chủ nhật (03/11), CLB F-Code sẽ tổ chức buổi offline đầu tiên
        cho các bạn K15. Qua đó, các bạn sẽ được CLB công bố các thử thách và
        chính thức thực hiện.
      </p>
    )
  },
  {
    className: "vertical-timeline-element--challengeOne",
    date: "10/11",
    icon: <FaFireAlt />,
    color: "rgb(243, 33, 33)",
    title: "Thử thách 1",
    subtitle: "",
    content: (
      <p>
        Nội dung của thử thách sẽ được công bố vào ngày Offline 03/11. Để có thể
        tham gia thử thách tiếp theo cũng như để trở thành thành viên CLB thì
        các bạn phải vượt qua thử thách này.
      </p>
    )
  },
  {
    className: "vertical-timeline-element--challengeTwo",
    date: "01/12",
    icon: <FaFireAlt />,
    color: "rgb(243, 33, 33)",
    title: "Thử thách 2",
    subtitle: "",
    content: (
      <p>
        Nội dung thử thách sẽ được công bố vào buổi offline. Đây là thử thách
        chính và cuối cùng trước khi các bạn trở thành thành viên chính thức của
        CLB.
      </p>
    )
  },
  {
    className: "vertical-timeline-element--result",
    date: "03/12",
    icon: <IoMdTrophy />,
    color: "rgb(215, 208, 33)",
    title: "Công bố kết quả",
    subtitle: "",
    content: (
      <p>
        Thời điểm mà thử thách thứ 2 để tham gia vào CLB đã kết thúc. Vào ngày
        03/12, CLB sẽ công bố kết quả của đợt tuyển thành viên cũng như các giải
        thưởng mà các bạn đạt được.
      </p>
    )
  }
];
const TimelineBar = props => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  const closeTimeline = props.close;

  return (
    <Drawer
      className="timeline-drawer"
      closable={true}
      onClose={closeTimeline}
      visible={visible}
      height={"100vh"}
      width={"100vw"}
    >
      <div className="TimelineBar">
        <h2 className="timeline-title">Timeline tuyển thành viên</h2>
        <VerticalTimeline>
          {timelineData.map((timeline, index) => {
            return (
              <VerticalTimelineElement
                className={timeline.className}
                contentStyle={{ borderTop: "5px solid " + timeline.color }}
                date={timeline.date}
                iconStyle={{ background: timeline.color, color: "#fff" }}
                icon={timeline.icon}
                key={index}
              >
                <h3 className="vertical-timeline-element-title">
                  {timeline.title}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {timeline.subtitle}
                </h4>
                <div className="vertical-timeline-element-detail">
                  {timeline.content}
                </div>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>
    </Drawer>
  );
};

export default TimelineBar;
