import React, { Component } from "react";
import "./css/style.css";
import Axios from "axios";
// import { result } from 'lodash'
export default class TodolistRCC extends Component {
  state = {
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  };

  getTaskList = () => {
    //Sử dụng thư viện Axios để call dữ liệu bằng link BE gửi
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    //Thành công thì set lại State của taskList
    promise.then((result) => {
      console.log(result.data);
      this.setState({
        taskList: result.data,
      });
    });
    //Thất bại thì báo lỗi
    promise.catch((err) => {
      console.log(err.response.data);
    });
  };
  delTask = (taskName) => {
    //Sử dụng thư viện Axios để gửi taskName cần xóa lên BE
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    //Thành công thì getTaskList
    promise.then((result) => {
      alert(result.data);
      this.getTaskList();
    });
    //Thất bại thì báo lỗi
    promise.catch((err) => {
      alert(err.response.data);
    });
  };
  doneTask = (taskName) => {
    //Sử dụng thư viện Axios để gửi taskName cần done lên BE
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    //Thành công thì getTaskList
    promise.then((result) => {
      alert(result.data);
      this.getTaskList();
    });
    //Thất bại thì báo lỗi
    promise.catch((err) => {
      alert(err.response.data);
    });
  };
  
  rejectTask = (taskName) => {
    //Sử dụng thư viện Axios để gửi taskName cần reject lên BE
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    //Thành công thì getTaskList
    promise.then((result) => {
      alert(result.data);
      this.getTaskList();
    });
    //Thất bại thì báo lỗi
    promise.catch((err) => {
      alert(err.response.data);
    });
  };

  renderTaskToDo = () => {
    return this.state.taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  this.delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
              type="button"
                className="complete"
                onClick={() => {
                  this.doneTask(item.taskName);
                }}
              >
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  renderTaskDone = () => {
    //Lấy item có status bằng true chạy vòng lặp map
    return this.state.taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button className="remove"
                type="button"
                onClick={() => {
                  this.delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button className="complete" 
              type="button"
              onClick={() => {
                this.rejectTask(item.taskName);
              }}
              >
                <i className="far fa-undo" />
                <i className="fas fa-undo" />
              </button>
            </div>
          </li>
        );
      });
  };
  //Thay thế button Get Task List bằng componentDidMount
  componentDidMount = () => {
    this.getTaskList();
  };
  addTask = (e) => {
    e.preventDefault(); //Dừng sự kiện submit lại form
    console.log(this.state.values.taskName);
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      //data phải theo tiêu chuẩn của BE cung cấp
      data: { taskName: this.state.values.taskName },
    });
    //Thành công thì set lại State của taskList
    promise.then((result) => {
      this.getTaskList();
    });
    //Thất bại thì báo lỗi
    promise.catch((err) => {
      alert(err.response.data);
    });
  };
  handleChange = (e) => {
    let { value, name } = e.target;
    console.log(value, name);
    let newValues = { ...this.state.values };
    newValues = { ...newValues, [name]: value };
    let newErrors = { ...this.state.errors };
    let regexString = /^[a-z A-Z]+$/;
    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " invalid !";
    } else {
      newErrors[name] = "";
    }
    this.setState({
      ...this.state,
      values: newValues,
      errors: newErrors,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault(); //Dừng sự kiện submit lại form
  }
  render() {
    return (
      <form onSubmit={this.addTask}>
        {/* <button
          onClick={() => {
            this.getTaskList();
          }}
          className="m-2 btn btn-success"
        >
          {" "}
          Get Task List
        </button> */}
        <div className="card">
          <div className="card__header">
            <img src="/img/X2oObC4.png" alt="background" />
          </div>
          <div className="card__body">
            <div className="card__content">
              <div className="form-group"></div>
              <div className="card__title">
                <h2>My Tasks</h2>
                <p>May 16, 2023</p>
              </div>
              <div className="card__add">
                <input
                  id="newTask"
                  name="taskName"
                  type="text"
                  placeholder="Enter an activity..."
                  onChange={this.handleChange}
                />
                {/* Validation  */}

                <button id="addItem" onClick={this.addTask}>
                  <i className="fa fa-plus" />
                </button>
              </div>
              <p className="text text-danger">{this.state.errors.taskName}</p>
              <div className="card__todo">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                  {this.renderTaskToDo()}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  {this.renderTaskDone()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
