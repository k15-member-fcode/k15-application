import React from "react";
import { OverPack } from "rc-scroll-anim";
import QueueAnim from "rc-queue-anim";
import Profile from "../../../resource/img/profile.png";
import BgImg from "../../../resource/img/background-question.jpeg";

const IntroContent = () => {
  return (
    <section className="section-questions">
      <div className="bg-image">
        <img className="bg-image__content" src={BgImg} alt="background-question"></img>
      </div>
      <OverPack style={{ minHeight: "50vh" }}>
        <QueueAnim leaveReverse>
          <div className="u-center-text u-margin-bottom-big qa-title" key="a">
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
                  Q: “Em đã từng tiếp xúc với một số loại ngôn ngữ lập trình rồi
                  nhưng không được giỏi cho lắm. Ngay cả những câu lệnh đơn giản
                  em không nắm bắt được. Vậy làm thế nào để em có thể có một nền
                  tảng tốt về lập trình ạ? Để có thể rèn luyện khả năng xử lý
                  bài toán và có những cách giải quyết tối ưu nhất thì em nên
                  làm gì ạ? Fcode có những hoạt động như thế nào ạ. Giả sử như
                  tổ chức một vài cuộc thi để có thể học hỏi thêm và nâng cao
                  khả năng lập trình của mình lên.”
                </h3>
                <p>
                  A:"Đầu tiên có lời khen cho bạn, vì bạn đã có tìm hiểu trước
                  về những gì mình sẽ học và làm trong tương lai. Tiếp theo để
                  hiểu được 1 thứ gì đó mà xài được thì cần thời gian và sự kiên
                  trì, có thể bạn không nắm bắt nhanh bằng người khác nhưng sự
                  chăm chỉ sẽ giúp bạn hiểu rõ nó hơn. Để có nền tảng tốt về lập
                  trình bạn có thể đọc nhiều nghe nhiều và thực hành nhiều. Để
                  tìm hiểu về các hoạt động của Fcode, bạn có thể lên fanpage
                  hoặc đọc mấy bài viết trên
                  <a href="https://fcodehcm.wordpress.com/" target="_blank" rel="noopener noreferrer"> trang chủ của CLB</a>.
                </p>
              </div>
            </div>
            <div className="question">
              <figure className="question__shape">
                <img src={Profile} alt="" className="question__img" />
                <figcaption className="question__caption">Bạn Vinh</figcaption>
              </figure>
              <div className="question__text">
                <h3 className="heading-tertiary u-margin-botton-small">
                  Q: "Cho em hỏi làm thế nào để học SE từ con số 0 ? Và cách học
                  tập tốt nhất cho dân SE là gì vậy ạ ?"
                </h3>
                <p>
                  A: "Học gì cũng bắt đầu từ con số 0 mà bạn, quan trọng là mình
                  cố gắng như thế nào thôi. Theo mình thì quan trọng nhất vẫn là
                  nắm vững kiến thức học trên trường. Bên cạnh đó bạn có thể tự
                  học qua mạng, bạn bè, tiền bối."
                </p>
              </div>
            </div>
            <div className="question">
              <figure className="question__shape">
                <img src={Profile} alt="" className="question__img" />
                <figcaption className="question__caption">Bạn Ngọc</figcaption>
              </figure>
              <div className="question__text">
                <h3 className="heading-tertiary u-margin-botton-small">
                  Q: "Cho em hỏi là học SE thì mình cần trang bị những ngôn ngữ
                  lập trình gì với kiến thức nền tảng như thế nào ạ"
                </h3>
                <p>
                  A: "Quan trọng không phải là ngôn ngữ mà là tư duy lập trình
                  nha bạn. Muốn có tư duy lập trình thì ngôn ngữ gì cũng được."
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
  );
};

export default IntroContent;
