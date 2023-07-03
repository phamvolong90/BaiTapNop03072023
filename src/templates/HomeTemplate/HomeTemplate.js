
import React, { Fragment }  from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../components/Home/Header/Header";
//Fragment là thẻ vô hình của ReactJS chống nhảy dòng và không hiển thị trên giao diện hoặc có thể ghi là <> </>
export const HomeTemplate = (props) => {
    //restParam còn lại exa
    const {Component,...restParam} = props;
    return <Route {...restParam} render = {(propsRoute)=> {
        return <>
            <Header/>
            <Component {...propsRoute}/>
        </>
    }}/>
}