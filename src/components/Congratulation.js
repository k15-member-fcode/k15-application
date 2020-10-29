import React from "react";
import { Icon } from "antd";

const Congratulation = props => {
  const name = props.name;

  return (
    <div className="Congratulation">
      <div className="div-center">
        <Icon type="check-circle" className="icon-success icon-center" />
        <h2 className="heading-center">Đăng ký thành công</h2>
      </div>
      <p> Xin chào {name},</p>
      <p>
        Chúc mừng bạn đã đăng ký thành công tham gia thử thách của câu lạc bộ
        F-Code. Thử thách tiếp theo sẽ được công bố trong thời gian sớm nhất.
      </p>
    </div>
  );
};

export default Congratulation;
