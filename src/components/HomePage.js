import React from "react";
import "./css/HomePage.css";
import { Icon, BackTop, Tooltip } from "antd";
import { OverPack } from "rc-scroll-anim";
import QueueAnim from "rc-queue-anim";
import Logo from "./img/logo.png";
import AboutImg1 from "./img/about1.jpg";
import AboutImg2 from "./img/about2.jpg";
import AboutImg3 from "./img/about3.jpg";
import Profile from "./img/profile.png";
import BgVideo from "./img/background-question.mp4";

const HomePage = () => {
  return (
    <div className="HomePage">
      <header className="header">
        <div className="header__logo-box">
          <img src={Logo} className="header__logo" alt="logo" />
        </div>
        <div className="header__text-box">
          <h3 className="heading-primary">
            <span className="heading-primary--main">CLB F-Code</span>
            <span className="heading-primary--sub">Xin chào bạn!</span>
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
      <section className="section-about">
        <OverPack style={{ minHeight: "50vh" }}>
          <QueueAnim leaveReverse>
            <div className="u-center-text u-margin-bottom-big" key="a">
              <h2 className="heading-secondary ">Về F-Code</h2>
            </div>
            <div className="row" key="b">
              <div className="col-1-of-2">
                <h3 className="heading-tertiary u-margin-botton-small">
                  Sơ lược về F-Code
                </h3>
                <p className="paragraph">
                  F-Code được thành lập vào năm 2014, là CLB học thuật đầu tiên
                  tại trường đại học FPT HCM. Với mục tiêu ban đầu là tạo ra một
                  nơi để các bạn sinh viên ngành kĩ thuật phần mềm, an toàn
                  thông tin có đam mê về lập trình được thỏa sức trao đổi và học
                  tập với nhau. Sau hơn 5 năm hoạt động, CLB đã tạo được nhiều
                  sân chơi cho các bạn sinh viên trường ĐH FPT.
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
              <div className="col-1-of-2">
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
      <section className="section-criterias">
        <div className="row">
          <OverPack style={{ height: "40vh" }}>
            <QueueAnim leaveReverse>
              <div className="col-1-of-4" key="a">
                <div className="criteria-box">
                  <Icon
                    type="dashboard"
                    theme="twoTone"
                    className="criteria-box__icon"
                  />
                  <h3 className="heading-tertiary u-margin-bottom-small">
                    Tiêu chí 1
                  </h3>
                  <div className="criteria-box__text">
                    Nhiệt huyết, cống hiến hết mình vì câu lạc bộ.
                  </div>
                </div>
              </div>
              <div className="col-1-of-4" key="b">
                <div className="criteria-box">
                  <Icon
                    type="book"
                    theme="twoTone"
                    className="criteria-box__icon"
                  />
                  <h3 className="heading-tertiary u-margin-bottom-small">
                    Tiêu chí 2
                  </h3>
                  <div className="criteria-box__text">
                    Có tinh thần học hỏi, tìm tòi, sẵn sàng chia sẻ kiến thức
                    với mọi người.
                  </div>
                </div>
              </div>
              <div className="col-1-of-4" key="c">
                <div className="criteria-box">
                  <Icon
                    type="idcard"
                    theme="twoTone"
                    className="criteria-box__icon"
                  />
                  <h3 className="heading-tertiary u-margin-bottom-small">
                    Tiêu chí 3
                  </h3>
                  <div className="criteria-box__text">
                    Tôn trọng các anh chị khóa trên.
                  </div>
                </div>
              </div>
              <div className="col-1-of-4" key="d">
                <div className="criteria-box">
                  <Icon
                    type="hourglass"
                    theme="twoTone"
                    className="criteria-box__icon"
                  />
                  <h3 className="heading-tertiary u-margin-bottom-small">
                    Tiêu chí 4
                  </h3>
                  <div className="criteria-box__text">
                    Trách nhiệm, dám thử thách bản thân, kiên trì không dễ dàng
                    bỏ cuộc.
                  </div>
                </div>
              </div>
            </QueueAnim>
          </OverPack>
        </div>
      </section>
      <section className="section-challenges" id="section-challenges">
        <OverPack style={{ minHeight: "50vh" }}>
          <QueueAnim leaveReverse>
            <div className="u-center-text u-margin-bottom-big" key="a">
              <h2 className="heading-secondary">Giai đoạn tuyển chọn</h2>
            </div>
            <div className="row" key="b">
              <div className="col-1-of-3">
                <div className="card">
                  <div className="card__side card__side--front">
                    <div className="card__picture card__picture--1">&nbsp;</div>
                    <h4 className="card__heading">
                      <span className="card__heading-span card__heading-span--1">
                        Giai đoạn F: <br /> Đăng ký form
                      </span>
                    </h4>
                    <div className="card__details">
                      <ul>
                        <li>Thời gian: 01/10 – 01/11</li>
                        <li>Số lượng</li>
                        <li>
                          <Icon type="check-circle" className="icon-success" />
                          &nbsp; Đang tiến hành
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card__side card__side--back card__side--back-1">
                    <div className="card__cta">
                      <div className="card__instruction-box">
                        <p className="card__instruction-tag">#signupforform</p>
                        <p className="card__instruction-detail">
                          Bấm vào nút bên dưới
                        </p>
                        <a href="/application" className="btn btn--white">
                          Đăng ký ngay
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1-of-3">
                <div className="card">
                  <div className="card__side card__side--front">
                    <div className="card__picture card__picture--2">&nbsp;</div>
                    <h4 className="card__heading">
                      <span className="card__heading-span card__heading-span--2">
                        Giai đoạn P: <br /> Chưa công bố
                      </span>
                    </h4>
                    <div className="card__details">
                      <ul>
                        <li>Thời gian: 10/11</li>
                        <li>Số lượng</li>
                        <li>
                          <Icon type="loading" className="icon-primary" />
                          &nbsp; Đang chờ
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card__side card__side--back card__side--back-2">
                    <div className="card__cta">
                      <div className="card__instruction-box">
                        <p className="card__instruction-tag">#challengeP</p>
                        <p className="card__instruction-detail">
                          Sẽ công bố sau <br /> Thời gian công bố: 03/11
                        </p>
                        <a href="/application" className="btn btn--white">
                          Hoàn thành
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1-of-3">
                <div className="card">
                  <div className="card__side card__side--front">
                    <div className="card__picture card__picture--3">&nbsp;</div>
                    <h4 className="card__heading">
                      <span className="card__heading-span card__heading-span--3">
                        Giai đoạn T: <br /> Thử thách
                      </span>
                    </h4>
                    <div className="card__details">
                      <ul>
                        <li>Thời gian: 04/11 – 01/12</li>
                        <li>Số lượng</li>
                        <li>
                          <Icon type="loading" className="icon-primary" />
                          &nbsp; Đang chờ
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card__side card__side--back card__side--back-3">
                    <div className="card__cta">
                      <div className="card__instruction-box">
                        <p className="card__instruction-tag">#challengeT</p>
                        <p className="card__instruction-detail">
                          Sẽ công bố sau <br /> Thời gian công bố: 03/11
                        </p>
                        <a href="/application" className="btn btn--white">
                          Hoàn thành
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </QueueAnim>
        </OverPack>
      </section>
      <section className="section-questions">
        <div className="bg-video">
          <video className="bg-video__content" autoPlay muted loop>
            <source src={BgVideo} type="video/mp4" />
            Your browser is not supported
          </video>
        </div>
        <OverPack style={{ minHeight: "50vh" }}>
          <QueueAnim leaveReverse>
            <div className="u-center-text u-margin-bottom-big" key="a">
              <h2 className="heading-secondary">Top Q&A</h2>
            </div>
            <div className="row" key="b">
              <div className="question">
                <figure className="question__shape">
                  <img src={Profile} alt="" className="question__img" />
                  <figcaption className="question__caption">Bạn Đức</figcaption>
                </figure>
                <div className="question__text">
                  <h3 className="heading-tertiary u-margin-botton-small">
                    Q: “Các anh chị có suy nghĩ gì về tương lai của lập trình
                    viên nữ và cơ hội học tập của các bạn nữ theo học ngành IT
                    trường mình vậy ạ?”
                  </h3>
                  <p>
                    A:"Trích từ một chị cựu sinh viên trong CLB khi được nhờ trả
                    lời câu hỏi. “Đầu tiên là trường mình không có ngành IT, nên
                    xin được phép trả lời ngành SE. Chị cũng không phải là thầy
                    bói, hay pháp sư để có thể đánh giá và dự đoán được về tương
                    lai của mình chứ đừng nói gì là tương lai của lập trình viên
                    nữ. Câu này để vũ trụ trả lời vậy. Nhìn chung nữ hay nam học
                    ngành SE, thì đi phỏng vấn, đi làm đều bằng thực lực thôi.
                    Dù sao công ty trả lương cho bạn cũng không phải vì bạn là
                    nữ hay ngồi vào vị trí đó cho đẹp phong thuỷ của công ty
                    phải không? Có thể bạn là nữ thì khi sếp chê bạn hay team
                    đánh giá bạn sẽ dùng từ nhẹ nhàng hơn tí thôi, mà cũng tuỳ
                    team nữa nhé. Còn về cơ hội học tập của các bạn nữ theo
                    ngành SE trường mình. Thì xin đảm bảo với bạn là nam nữ gì
                    thì cũng học từng đó môn, đóng từng đó tiền học lại. Yên tâm
                    nha!"
                  </p>
                </div>
              </div>
              <div className="question">
                <figure className="question__shape">
                  <img src={Profile} alt="" className="question__img" />
                  <figcaption className="question__caption">Bạn Tâm</figcaption>
                </figure>
                <div className="question__text">
                  <h3 className="heading-tertiary u-margin-botton-small">
                    Q: "Cho em hỏi làm thế nào để học SE từ con số 0 ? Và cách
                    học tập tốt nhất cho dân SE là gì vậy ạ ?"
                  </h3>
                  <p>
                    A: "Học gì cũng bắt đầu từ con số 0 mà bạn, quan trọng là
                    mình cố gắng như thế nào thôi. Theo mình thì quan trọng nhất
                    vẫn là nắm vững kiến thức học trên trường. Bên cạnh đó bạn
                    có thể tự học qua mạng, bạn bè, tiền bối."
                  </p>
                </div>
              </div>
              <div className="question">
                <figure className="question__shape">
                  <img src={Profile} alt="" className="question__img" />
                  <figcaption className="question__caption">
                    Bạn Ngọc
                  </figcaption>
                </figure>
                <div className="question__text">
                  <h3 className="heading-tertiary u-margin-botton-small">
                    Q: "Cho em hỏi là học SE thì mình cần trang bị những ngôn
                    ngữ lập trình gì với kiến thức nền tảng như thế nào ạ"
                  </h3>
                  <p>
                    A: "Quan trọng không phải là ngôn ngữ mà là tư duy lập trình
                    nha bạn. Muốn có tư duy lập trình thì ngôn ngữ gì cũng
                    được."
                  </p>
                </div>
              </div>
              <div className="u-center-text u-margin-top-big u-margin-bottom-big">
                <a
                  href="https://fcodehcm.wordpress.com/category/k15-questions/"
                  className="btn-text"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Xem tất cả Q&A &rarr;
                </a>
              </div>
            </div>
          </QueueAnim>
        </OverPack>
      </section>
      <footer className="footer">
        <span> Tạo bởi ThinhTPT </span> <br />
        <span> Hướng dẫn bởi MinhHY </span> <br />
        <a
          href="https://www.facebook.com/fcodefpt/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span> Bản quyền © 2019 F-Code HCM </span>
        </a>
      </footer>
      <Tooltip placement="left" title="Về đầu trang">
        <BackTop />
      </Tooltip>
    </div>
  );
};

export default HomePage;
