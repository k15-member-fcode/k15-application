import React, { useState } from "react";
import { Icon } from "antd";
import { OverPack } from "rc-scroll-anim";
import QueueAnim from "rc-queue-anim";

const IntroTimeline = () => {
  const [isFront, setIsFront] = useState({
    isFront1: true,
    isFront2: true,
    isFront3: true
  });

  const animateCard = (e, order) => {
    let cards = document.getElementsByClassName("card");
    let setOrderFront = {};
    for (let i = 0; i < cards.length; i++) {
      let orderFront = "isFront" + (i + 1);
      cards[i].getElementsByClassName("card__side--front")[0].style.transform =
        "rotateY(0deg)";
      cards[i].getElementsByClassName("card__side--back")[0].style.transform =
        "rotateY(-180deg)";
      setOrderFront[orderFront] = true;
    }
    let cardItem = e.currentTarget;
    let orderFront = "isFront" + order;
    setOrderFront[orderFront] = !isFront[orderFront];
    if (isFront[orderFront]) {
      cardItem.getElementsByClassName("card__side--front")[0].style.transform =
        "rotateY(-180deg)";
      cardItem.getElementsByClassName("card__side--back")[0].style.transform =
        "rotateY(0)";
    } else {
      cardItem.getElementsByClassName("card__side--front")[0].style.transform =
        "rotateY(0)";
      cardItem.getElementsByClassName("card__side--back")[0].style.transform =
        "rotateY(-180deg)";
    }
    setIsFront(setOrderFront);
  };

  return (
    <section className="section-challenges" id="section-challenges">
      <OverPack style={{ minHeight: "50vh" }}>
        <QueueAnim leaveReverse>
          <div
            className="u-center-text u-margin-bottom-big challenges-container"
            key="a"
          >
            <h2 className="heading-secondary">Giai đoạn tuyển chọn</h2>
          </div>
          <div className="row" key="b">
            <div className="col-1-of-3">
              <div className="card" onClick={e => animateCard(e, 1)}>
                <div className="card__side card__side--front">
                  <div className="card__picture card__picture--1">&nbsp;</div>
                  <h4 className="card__heading">
                    <span className="card__heading-span card__heading-span--1">
                      Giai đoạn F: <br /> Đăng ký form
                    </span>
                  </h4>
                  <div className="card__details">
                    <ul>
                      <li>Thời gian: 06/10 – 01/11</li>
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
              <div className="card" onClick={e => animateCard(e, 2)}>
                <div className="card__side card__side--front">
                  <div className="card__picture card__picture--2">&nbsp;</div>
                  <h4 className="card__heading">
                    <span className="card__heading-span card__heading-span--2">
                      Giai đoạn P: <br /> Thử thách 1
                    </span>
                  </h4>
                  <div className="card__details">
                    <ul>
                      <li>Thời gian: 03/11 – 10/11</li>
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
                        Hoàn thành F
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1-of-3">
              <div className="card" onClick={e => animateCard(e, 3)}>
                <div className="card__side card__side--front">
                  <div className="card__picture card__picture--3">&nbsp;</div>
                  <h4 className="card__heading">
                    <span className="card__heading-span card__heading-span--3">
                      Giai đoạn T: <br /> Thử thách 2
                    </span>
                  </h4>
                  <div className="card__details">
                    <ul>
                      <li>Thời gian: 03/11 – 01/12</li>
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
                        Hoàn thành F
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
  );
};

export default IntroTimeline;
