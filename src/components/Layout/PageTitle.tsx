import React from "react";

const PageTitle: React.FC = ({ children }) => {
  return (
    <h5 style={{ paddingLeft: "100px", paddingTop: "30px" }}>{children}</h5>
  );
};

export default PageTitle;
