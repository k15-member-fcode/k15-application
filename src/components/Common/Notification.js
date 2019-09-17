import React from "react";
import { notification, Icon } from "antd";

export const createNotification = noti => {
  const typeNoti = noti.status === "err" ? "close-circle" : "check-circle";
  notification.open({
    message: noti.title,
    description: noti.content,
    duration: 0,
    icon: <Icon type={typeNoti} style={getStyleNotification(noti.status)} />
  });
};

const getStyleNotification = notiStatus => {
  const color = notiStatus === "err" ? "#	#bb2124" : "#22bb33";
  return {
    color
  };
};
