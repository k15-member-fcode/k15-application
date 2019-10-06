import React from "react";
import "../../resource/css/style.css";
import {  BackTop, Tooltip } from "antd";
import Header from "./Header";
import Container from "./Container/Container";
import Footer from "../Common/Footer";

const HomePage = () => {
  return (
    <div className="HomePage">
      <Header />
      <Container />
      <Footer />
      <Tooltip placement="left" title="Về đầu trang">
        <BackTop />
      </Tooltip>
    </div>
  );
};

export default HomePage;
