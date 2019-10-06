import React from "react";
import { OverPack } from "rc-scroll-anim";
import QueueAnim from "rc-queue-anim";
import AboutImg1 from "../../../resource/img/about1.jpg";
import AboutImg2 from "../../../resource/img/about2.png";
import AboutImg3 from "../../../resource/img/about3.jpg";

const IntroContent = () => {
  return (
    <section className="section-about">
      <OverPack style={{ minHeight: "50vh" }}>
        <QueueAnim leaveReverse>
          <div className="u-center-text u-margin-bottom-big" key="a">
            <h2 className="heading-secondary about-fcode-title">Về F-Code</h2>
          </div>
          <div className="row row-about" key="b">
            <div className="col-1-of-2 about-text">
              <h3 className="heading-tertiary u-margin-botton-small">
                Sơ lược về F-Code
              </h3>
              <p className="paragraph">
                F-Code được thành lập vào năm 2014, là CLB học thuật đầu tiên
                tại trường đại học FPT HCM. Với mục tiêu ban đầu là tạo ra một
                nơi để các bạn sinh viên ngành kĩ thuật phần mềm, an toàn thông
                tin có đam mê về lập trình được thỏa sức trao đổi và học tập với
                nhau. Sau hơn 5 năm hoạt động, CLB đã tạo được nhiều sân chơi
                cho các bạn sinh viên trường ĐH FPT.
              </p>
              <a
                href="https://fcodehcm.wordpress.com/contact/"
                className="btn-text"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tìm hiểu thêm &rarr;
              </a>
            </div>
            <div className="col-1-of-2 about-img">
              <div className="composition">
                <img
                  src={AboutImg1}
                  alt="photo1"
                  className="composition__photo composition__photo--p1"
                />
                <img
                  src={AboutImg2}
                  alt="photo2"
                  className="composition__photo composition__photo--p2"
                />
                <img
                  src={AboutImg3}
                  alt="photo3"
                  className="composition__photo composition__photo--p3"
                />
              </div>
            </div>
          </div>
        </QueueAnim>
      </OverPack>
    </section>
  );
};

export default IntroContent;
