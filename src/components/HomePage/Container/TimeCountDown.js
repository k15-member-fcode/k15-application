import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import * as moment from "moment";
import "../../../resource/css/count-down.css";

const SVGCircle = ({ radius }) => (
  <svg className="countdown-svg">
    <path
      fill="none"
      stroke="#333"
      strokeWidth="4"
      d={describeArc(50, 50, 48, 0, radius)}
    />
  </svg>
);

// From stackoverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y
  ].join(" ");

  return d;
};

// Stackoverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const mapNumber = (number, in_min, in_max, out_min, out_max) => {
  return (
    ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
};

const addLeadingZeros = value => {
  value = String(value);
  while (value.length < 2) {
    value = "0" + value;
  }
  return value;
};

const TimeCountDown = props => {
  const [time, setTime] = useState({});
  const [dataEnd, setDateEnd] = useState();
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState({
    sec: 1,
    min: 1,
    hour: 1,
    day: 1
  });

  const closeCountdown = () => {
    setVisible(false);
  };

  const calDate = () => {
    let timeLeft = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0
    };

    const dateStart = moment();

    if (
      moment("2019-11-01 00:00:00", "YYYY-MM-DD HH:mm:ss").diff(dateStart) > 0
    ) {
      setDateEnd(moment("2019-11-01 00:00:00", "YYYY-MM-DD HH:mm:ss"));
    } else {
      setDateEnd(moment("2019-11-01 00:00:00", "YYYY-MM-DD HH:mm:ss"));
    }
    let dateEnd =
      moment("2019-11-01 00:00:00", "YYYY-MM-DD HH:mm:ss").diff(dateStart) > 0
        ? moment("2019-11-01 00:00:00", "YYYY-MM-DD HH:mm:ss")
        : moment("2019-11-03 07:00:00", "YYYY-MM-DD HH:mm:ss");
    let diff = dateEnd.diff(dateStart) / 1000;
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = Math.floor(diff);

    setTime(timeLeft);
  };

  const htmlPage = document.getElementsByTagName("html")[0];

  useEffect(() => {
    if (visible) {
      htmlPage.style.overflow = "hidden";
    } else {
      htmlPage.style.overflow = "auto";
    }
    let timerID = setInterval(() => {
      calDate();
    }, 1000);
    return () => {
      clearInterval(timerID);
    };
  });

  const daysRadius = mapNumber(time.days, 30, 0, 0, 360);
  const hoursRadius = mapNumber(time.hours, 24, 0, 0, 360);
  const minutesRadius = mapNumber(time.min, 60, 0, 0, 360);
  const secondsRadius = mapNumber(time.sec, 60, 0, 0, 360);

  return (
    <Drawer
      className="countdown-drawer"
      closable={true}
      onClose={closeCountdown}
      visible={visible}
      height={"100vh"}
      width={"100vw"}
    >
      <div className="countdown-container">
        <h1 className="countdown-title">Thời gian đăng ký: <span style={{color: "crimson"}}>ĐÃ ĐÓNG</span></h1>
        <h1 className="countdown-title">Thời gian đến offline</h1>
        <div
          className="countdown-wrapper"
          style={{
            opacity: time.days || time.hours || time.min || time.sec ? 1 : 0
          }}
        >
          {time.days ? (
            time.days && (
              <div className="countdown-item">
                <SVGCircle radius={daysRadius} />
                {addLeadingZeros(time.days)}
                <span>ngày</span>
              </div>
            )
          ) : (
            <></>
          )}
          {time.hours ? (
            time.hours && (
              <div className="countdown-item">
                <SVGCircle radius={hoursRadius} />
                {addLeadingZeros(time.hours)}
                <span>giờ</span>
              </div>
            )
          ) : (
            <div className="countdown-item">
              <SVGCircle radius={360} />
              {addLeadingZeros(time.hours)}
              <span>giờ</span>
            </div>
          )}
          {time.min ? (
            time.min && (
              <div className="countdown-item">
                <SVGCircle radius={minutesRadius} />
                {addLeadingZeros(time.min)}
                <span>phút</span>
              </div>
            )
          ) : (
            <div className="countdown-item">
              <SVGCircle radius={360} />
              {addLeadingZeros(time.min)}
              <span>phút</span>
            </div>
          )}
          {time.sec ? (
            time.sec && (
              <div className="countdown-item">
                <SVGCircle radius={secondsRadius} />
                {addLeadingZeros(time.sec)}
                <span>giây</span>
              </div>
            )
          ) : (
            <div className="countdown-item">
              <SVGCircle radius={360} />
              {addLeadingZeros(time.sec)}
              <span>giây</span>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default TimeCountDown;
