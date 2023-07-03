import React, { useState } from "react";
import { Prompt } from "react-router-dom/cjs/react-router-dom.min";

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({
    userName: "",
    passWord: "",
    status: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newUserLogin = {
      ...userLogin,
      [name]: value,
    };
    let valid = true;
    for (let key in newUserLogin) {
      if (key !== "status") {
        if (newUserLogin[key].trim() === "") {
            valid = false;
        }
      }
    }
    if(!valid) {
        newUserLogin.status = true;
    } else {
        newUserLogin.status = false;
    }
    setUserLogin(newUserLogin);
  };
  const handleLogin = (event) => {
    event.preventDefault(); //Chặn sự kiện load lại trang
    if (
      userLogin.userName === "cyberlearn" &&
      userLogin.passWord === "cyberlearn"
    ) {
      //Đăng nhập thành công thì chuyển về trang gần nhất trước đó.
      props.history.goBack();
      //Đăng nhập thành công thì chuyển đến trang chỉ định sử dụng push
      // props.history.push('/home'); //Chuyển về home
      //Đăng nhập thành công thì chuyển đến trang chỉ định sử dụng replace
      // props.history.replace('/home'); //Chuyển về home
      //sử dụng JSON.stringify chuyển dữ liệu object thành chuỗi
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
    } else {
      alert("Login fail !");
    }
  };

  return (
    <form className="container " onSubmit={handleLogin}>
      <h3 className="display-4">Login</h3>
      <div className="form-group">
        <p>Username</p>
        <input
          name="userName"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <p>Password</p>
        <input
          name="passWord"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-success">Login</button>
      </div>
      <Prompt
        when={userLogin.status}
        message={(location) => {
          //Chuyển hướng, trả về giá trị...
          return "Are you sure you want to leave this page?";
        }}
      />
    </form>
  );
}
