import React, { Fragment } from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "../../index.css";
import SidebarCyberbugs from "../../components/Cyberbugs/SidebarCyberbugs";
import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberBugs from "../../components/Cyberbugs/ModalCyberBugs/ModalCyberBugs";

//Fragment là thẻ vô hình của ReactJS chống nhảy dòng và không hiển thị trên giao diện hoặc có thể ghi là <> </>
export const CyberbugsTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <div className="jira">
              <SidebarCyberbugs />
              <MenuCyberbugs />
                <Component {...propsRoute}/>
              <ModalCyberBugs/>
            </div>
          </>
        );
      }}
    />
  );
};
