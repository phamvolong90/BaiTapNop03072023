import Axios from "axios";
import { GET_TASK_API } from "../constant/ToDoListConst";

// export const getTaskListApi = () => {
//   // Tiền xử lý dữ liệu => xử lý function
//   return dispatch => {
//     let promise = Axios   ({
//       url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
//       method: "GET",
//     });
//     //Thành công
//     promise.then((result) => {
//       console.log(result.data);
//     //   setState({
//     //     ...state, // RFC phải có dòng này
//     //     taskList: result.data,
//     //   });
//     dispatch ({
//         type: GET_TASK_API,
//         taskList: result.data
//     })
//     });
//     //Thất bại
//     promise.catch((err) => {
//       console.log(err.response.data);
//     });
//   }
// }

//Thay thế bằng cách viết theo Async Await
export const getTaskListApi = () => {
  return async (dispatch) => {
    // data, status là thuộc tính của res
    try {
      let { data, status,...res} = await Axios({
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "GET",
      });
      console.log("promise", data);
      //Thành công
      if (status === 200) {
        dispatch({
          type: GET_TASK_API,
          taskList: data,
        });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};
// export const addTaskApi = (taskName) => {
//   return (dispatch) => {
//     //Xử lý trước khi dispatch
//     let promise = Axios({
//       url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
//       method: "POST",
//       //data phải theo tiêu chuẩn của BE cung cấp
//       data: { taskName: taskName },
//     });
//     //Thành công thì set lại State của taskList
//     promise.then((result) => {
//       dispatch(getTaskListApi());
//     });
//     promise.catch((err) => {
//       alert(err.response.data);
//     });
//   };
// };

//Thay thế bằng cách viết theo Async Await
export const addTaskApi = (taskName) => {
  return async (dispatch) => {
    try {
      let { data, status,...res } = await Axios({
        url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
        method: "POST",
        data: { taskName: taskName },
      });
      console.log(status)
      if (status === 200) {
        dispatch(getTaskListApi());
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
};
export const delTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    //Thành công thì getTaskList
    promise.then((result) => {
      alert(result.data);
      //Load lại taskList
      dispatch(getTaskListApi());
    });
    //Thất bại thì báo lỗi
    promise.catch((err) => {
      alert(err.response.data);
    });
  };
};
export const doneTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    //Thành công thì getTaskList
    promise.then((result) => {
      alert(result.data);
      dispatch(getTaskListApi());
    });
    //Thất bại thì báo lỗi
    promise.catch((err) => {
      alert(err.response.data);
    });
  };
};
export const rejectTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    //Thành công thì getTaskList
    promise.then((result) => {
      alert(result.data);
      dispatch(getTaskListApi());
    });
    //Thất bại thì báo lỗi
    promise.catch((err) => {
      alert(err.response.data);
    });
  };
};
