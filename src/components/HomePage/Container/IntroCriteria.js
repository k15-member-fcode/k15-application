import React from "react";
import { Icon } from "antd";
import { OverPack } from "rc-scroll-anim";
import QueueAnim from "rc-queue-anim";

const IntroCriteria = () => {
  return (
    <section className="section-criterias">
      <div className="row">
        <OverPack style={{ height: "40vh" }}>
          <QueueAnim leaveReverse>
            <div className="criteria-row">
              <div className="criteria-container">
                <div className="col-1-of-4 criteria-item" key="a">
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
              </div>
              <div className="criteria-container">
                <div className="col-1-of-4 criteria-item" key="b">
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
              </div>
              <div className="criteria-container">
                <div className="col-1-of-4 criteria-item" key="c">
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
              </div>
              <div className="criteria-container">
                <div className="col-1-of-4 criteria-item" key="d">
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
              </div>
            </div>

          </QueueAnim>
        </OverPack>
      </div>
    </section>
  );
};

export default IntroCriteria;
