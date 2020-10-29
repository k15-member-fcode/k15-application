import React, { useState } from "react";
import QueueAnim from "rc-queue-anim";
import Logo from "../../resource/img/logo.png";
import TimelineBar from "./Container/TimelineBar";
import { Tooltip } from "antd";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const htmlPage = document.getElementsByTagName("html")[0];

  const openTimeline = () => {
    htmlPage.style.overflow = "hidden !important";
    setVisible(true);
  };

  const closeTimeline = () => {
    htmlPage.style.overflow = "auto";
    setVisible(false);
  };

  return (
    <div>
      <header className="header">
        <div className="header__logo-box">
          <img src={Logo} className="header__logo" alt="logo" />
        </div>
        <div className="header__text-box">
          <h3 className="heading-primary">
            <span className="heading-primary--main clb-title">CLB F-Code</span>
            <span className="heading-primary--sub greeting-title">
              Xin chào bạn!
            </span>
          </h3>
          <Tooltip placement="left" title="Đã đóng">
            <a
              href="#"
              className="btn btn--white btn--animated btn--header"
              style={{
                cursor: "not-allowed !important"
              }}
            >
              Đăng ký thành viên
            </a>
          </Tooltip>

          <a
            href="#timeline"
            className="btn btn--animated btn--header btn--timeline"
            onClick={openTimeline}
          >
            Xem timeline
          </a>
        </div>
        <QueueAnim
          type={["bottom", "top"]}
          ease={["easeOutQuart", "easeInOutQuart"]}
          leaveReverse
          delay={2000}
        >
          <div className="icon-scroll" key="a"></div>
        </QueueAnim>
        <TimelineBar visible={visible} close={closeTimeline} />
      </header>
    </div>
  );
};

export default Header;
