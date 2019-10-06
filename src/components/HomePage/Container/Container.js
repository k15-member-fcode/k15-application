import React from "react";
import IntroContent from "./IntroContent";
import IntroCriteria from "./IntroCriteria";
import IntroTimeline from "./IntroTimeline";
import TopComments from "./TopComments";

const Container = () => {
  return (
    <div className="container">
      <IntroContent />
      <IntroCriteria />
      <IntroTimeline />
      <TopComments />
    </div>
  );
};

export default Container;
