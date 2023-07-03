import React, { useEffect, useState } from "react";
import "./css/style.css";
import Axios from "axios";
export default function TodolistRFC() {
  let [state, setState] = useState({
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });

  const handleChange = (e) => {
    let { value, name } = e.target;
    console.log(value, name);
    let newValues = { ...state.values };
    newValues = { ...newValues, [name]: value };
    let newErrors = { ...state.errors };
    let regexString = /^[a-z A-Z]+$/;
    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " invalid !";
    } else {
      newErrors[name] = "";
    }
    setState({
      ...state,
      values: newValues,
      errors: newErrors,
    });
  };
  const renderTaskToDo = () => {
    return state.taskList
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
                  delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => {
                  doneTask(item.taskName);
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

  const renderTaskDone = () => {
    //Lấy item có status bằng true chạy vòng lặp map
    return state.taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  rejectTask(item.taskName);
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
  const getTaskList = () => {
    //Sử dụng thư viện Axios để call dữ liệu bằng link BE gửi
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    //Thành công thì set lại State của taskList
    promise.then((result) => {
      console.log(result.data);
      setState({
        ...state, //phải có dòng này giữ lại state cũ, RFC khác RCC
        taskList: result.data,
      });
    });
    //Thất bại thì báo lỗi
    promise.catch((err) => {
      console.log(err.response.data);
    });
  };
  const addTask = (e) => {
    e.preventDefault(); //Dừng sự kiện submit lại form
    console.log(state.values.taskName);
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      //data phải theo tiêu chuẩn của BE cung cấp
      data: { taskName: state.values.taskName },
    });
    //Thành công thì set lại State của taskList
    promise.then((result) => {
      getTaskList();
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  };
  const delTask = (taskName) => {
    //Sử dụng thư viện Axios để gửi taskName cần xóa lên BE
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    //Thành công thì getTaskList
    promise.then((result) => {
      alert(result.data);
      getTaskList();
    });
    //Thất bại thì báo lỗi
    promise.catch((err) => {
      alert(err.response.data);
    });
  };
  const doneTask = (taskName) => {
    //Sử dụng thư viện Axios để gửi taskName cần done lên BE
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    //Thành công thì getTaskList
    promise.then((result) => {
      alert(result.data);
      getTaskList();
    });
    //Thất bại thì báo lỗi
    promise.catch((err) => {
      alert(err.response.data);
    });
  };

  const rejectTask = (taskName) => {
    //Sử dụng thư viện Axios để gửi taskName cần reject lên BE
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    //Thành công thì getTaskList
    promise.then((result) => {
      alert(result.data);
      getTaskList();
    });
    //Thất bại thì báo lỗi
    promise.catch((err) => {
      alert(err.response.data);
    });
  };
  //Nếu code ntn thì hàm chạy sau khi giao diện render xong
  useEffect(() => {
    getTaskList();
    return () => {};
  }, []);

  return (
      <div className="card">
        <div className="card__header">
          <img src="/img/X2oObC4.png" alt="background" />
        </div>
        <form className="card__body" onSubmit={addTask}>
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
                onChange={handleChange}
              />
              {/* Validation  */}

              <button type="submit" id="addItem" onClick={addTask}>
                <i className="fa fa-plus" />
              </button>
            </div>
            <p className="text text-danger">{state.errors.taskName}</p>
            <div className="card__todo">
              {/* Uncompleted tasks */}
              <ul className="todo" id="todo">
                {renderTaskToDo()}
              </ul>
              {/* Completed tasks */}
              <ul className="todo" id="completed">
                {renderTaskDone()}
              </ul>
            </div>
          </div>
        </form>
      </div>
  );
}
