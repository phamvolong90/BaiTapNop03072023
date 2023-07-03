import React, { useEffect, useState } from "react";
import "./css/style.css";
import Axios from "axios";
import { useSelector,useDispatch, } from "react-redux";
// import { GET_TASK_API } from "../../redux/constant/ToDoListConst";
import { addTaskApi, delTaskApi, doneTaskApi, getTaskListApi, rejectTaskApi } from "../../redux/actions/ToDoListAction";

export default function ToDoListRedux(props) {
    //Lấy taskList từ redux về
    const {taskList} = useSelector( state => state.ToDoListReducer);
    const dispatch = useDispatch();
    let [state, setState] = useState({
        // taskList: [],
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
        return taskList
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
        return taskList
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
        //dispatch getTaskListApi trả về 1 function
        dispatch(getTaskListApi())
      };
      const addTask = (e) => {
        e.preventDefault(); //Dừng sự kiện submit lại form
        console.log(state.values.taskName);
        dispatch(addTaskApi(state.values.taskName))
      };
      const delTask = (taskName) => {
        dispatch(delTaskApi(taskName))
      };
      const doneTask = (taskName) => {
        dispatch(doneTaskApi(taskName))
      };
      const rejectTask = (taskName) => {
        dispatch(rejectTaskApi(taskName))
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
