import React from "react";
import QueueAnim from "rc-queue-anim";
import Logo from "../../resource/img/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo-box">
        <img src={Logo} className="header__logo" alt="logo" />
      </div>
      <div className="header__text-box">
        <h3 className="heading-primary">
          <span className="heading-primary--main clb-title">CLB F-Code</span>
          <span className="heading-primary--sub greeting-title">Xin chào bạn!</span>
        </h3>
        <a href="/application" className="btn btn--white btn--animated">
          Đăng ký thành viên
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
    </header>
  );
};

export default Header;
