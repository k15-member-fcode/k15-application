import React from "react";
import "./css/HomePage.css";
import { Icon, BackTop, Tooltip } from "antd";
import { OverPack } from "rc-scroll-anim";
import QueueAnim from "rc-queue-anim";
import Logo from "./img/logo.png";
import AboutImg1 from "./img/about1.jpg";
import AboutImg2 from "./img/about2.jpg";
import AboutImg3 from "./img/about3.jpg";
import PersonMale from "./img/person1.png";
import PersonFemale from "./img/person2.png";
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
                  sub heading 1
                </h3>
                <p className="paragraph">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga
                  cumque autem officiis distinctio, voluptate qui minima. Magnam
                  tenetur suscipit eius beatae dolore nihil repudiandae atque
                  vero, rem, labore ullam ipsa incidunt enim id necessitatibus
                  at dolor! Incidunt sequi nihil amet.
                </p>
                <h3 className="heading-tertiary u-margin-botton-small">
                  sub heading 1
                </h3>
                <p className="paragraph">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elite.
                </p>
                <a
                  href="https://fcodehcm.wordpress.com/"
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit,
                    Neque, quas doloribus corporis debitis soluta atque.
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit,
                    Neque, quas doloribus corporis debitis soluta atque.
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit,
                    Neque, quas doloribus corporis debitis soluta atque.
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
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit,
                    Neque, quas doloribus corporis debitis soluta atque.
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
                        <li>Thời gian</li>
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
                        Giai đoạn P: <br /> Thử thách
                      </span>
                    </h4>
                    <div className="card__details">
                      <ul>
                        <li>Thời gian</li>
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
                          Hoàn thành giai đoạn F
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
                        <li>Thời gian</li>
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
                          Hoàn thành giai đoạn F
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
                  <img src={PersonMale} alt="" className="question__img" />
                  <figcaption className="question__caption">
                    ThinhTPT
                  </figcaption>
                </figure>
                <div className="question__text">
                  <h3 className="heading-tertiary u-margin-botton-small">
                    Q: Non quos placeat at maiores voluptatem aliquid
                    accusantium rerum porro aspernatur, ut ducimus dignissimos
                    libero?
                  </h3>
                  <p>
                    A: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Repellendus quis qui necessitatibus non, vel provident. Non
                    quos placeat at maiores voluptatem aliquid accusantium rerum
                    porro aspernatur, ut ducimus dignissimos libero?
                  </p>
                </div>
              </div>
              <div className="question">
                <figure className="question__shape">
                  <img src={PersonFemale} alt="" className="question__img" />
                  <figcaption className="question__caption">
                    ThinhTPT
                  </figcaption>
                </figure>
                <div className="question__text">
                  <h3 className="heading-tertiary u-margin-botton-small">
                    Q: Non quos placeat at maiores voluptatem aliquid
                    accusantium rerum porro aspernatur, ut ducimus dignissimos
                    libero?
                  </h3>
                  <p>
                    A: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Repellendus quis qui necessitatibus non, vel provident. Non
                    quos placeat at maiores voluptatem aliquid accusantium rerum
                    porro aspernatur, ut ducimus dignissimos libero?
                  </p>
                </div>
              </div>
              <div className="question">
                <figure className="question__shape">
                  <img src={PersonMale} alt="" className="question__img" />
                  <figcaption className="question__caption">
                    ThinhTPT
                  </figcaption>
                </figure>
                <div className="question__text">
                  <h3 className="heading-tertiary u-margin-botton-small">
                    Q: Non quos placeat at maiores voluptatem aliquid
                    accusantium rerum porro aspernatur, ut ducimus dignissimos
                    libero?
                  </h3>
                  <p>
                    A: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Repellendus quis qui necessitatibus non, vel provident. Non
                    quos placeat at maiores voluptatem aliquid accusantium rerum
                    porro aspernatur, ut ducimus dignissimos libero?
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
