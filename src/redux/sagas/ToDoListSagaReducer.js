import Axios from "axios";
import { delay, call, fork, put, take, takeLatest } from "redux-saga/effects";
import { ADD_TASK_API, CHECK_TASK_API, DEL_TASK_API, DISPLAY_LOADING, GET_TASKLIST_API, GET_TASK_API, HIDE_LOADING, REJECT_TASK_API } from "../constant/ToDoListConst";
import { toDoListService } from "../../services/ToDoListServices";
import { STATUS_CODE } from "../../utility/constants/settingSystem";

// 20/05/2023 Long Viết chức năng GetTask bằng Saga

function* getTaskApiAction(action) {
  //Hiển thị loading.gif trước khi load xong data.
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    let { data, status } = yield call(toDoListService.getTaskApi);
    //Thêm hàm delay cho kịp nhìn thấy loading.gif
    yield delay(1000);
    if (status === STATUS_CODE.SUCCESS) {
    //Sử dụng lệnh put (giống dispatch bên thunk)
    yield put({
        type: GET_TASK_API,
        taskList: data,
      });
    } else {
        console.log('error')
    }
  } catch (err) {
    console.log(err)
  }
      //Tắt loading.gif sau khi load xong data.
      yield put({
        type: HIDE_LOADING,
      });
}
export function* theoDoiActionGetTaskApi() {
  yield takeLatest(GET_TASKLIST_API, getTaskApiAction);
}
// Chức năng add Task 20/5/2023
function* addTaskApiAction (action) {
//  console.log(action)
//Gọi API, Hiển thị loading, thành công thì load lại Task.
yield put({
  type: DISPLAY_LOADING,
});
try {
  const {taskName} = action;
  let { data, status } = yield call(()=> {return toDoListService.addTaskApi(taskName)});
  //Thêm hàm delay cho kịp nhìn thấy loading.gif
  yield delay(1000);
  if (status === STATUS_CODE.SUCCESS) {
  //Sử dụng lệnh put (giống dispatch bên thunk)
  yield put({
      type: GET_TASKLIST_API,
      taskList: data,
    });
  
  } else {
      console.log('error')
  }
} catch (err) {
  console.log(err)
}
    //Tắt loading.gif sau khi load xong data.
    yield put({
      type: HIDE_LOADING,
    });
} 
export function* theoDoiActionAddTaskApi() {
  yield takeLatest(ADD_TASK_API, addTaskApiAction)
}
//Chức năng Delete Task
function* delTaskApiAction (action) {
  //  console.log(action)
  //Gọi API, Hiển thị loading, thành công thì load lại Task.
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    const {taskName} = action;
    let { data, status } = yield call(()=> {return toDoListService.delTaskApi(taskName)});
    //Thêm hàm delay cho kịp nhìn thấy loading.gif
    yield delay(1000);
    if (status === STATUS_CODE.SUCCESS) {
    //Sử dụng lệnh put (giống dispatch bên thunk)
    yield put({
        type: GET_TASKLIST_API,
        // taskList: data,
      });
    
    } else {
        console.log('error')
    }
  } catch (err) {
    console.log(err)
  }
      //Tắt loading.gif sau khi load xong data.
      yield put({
        type: HIDE_LOADING,
      });
  } 
  export function* theoDoiActionDelTaskApi() {
    yield takeLatest(DEL_TASK_API, delTaskApiAction)
  }

  //Chức năng Done Task
function* doneTaskApiAction (action) {
  //  console.log(action)
  //Gọi API, Hiển thị loading, thành công thì load lại Task.
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    const {taskName} = action;
    let { data, status } = yield call(()=> {return toDoListService.doneTaskApi(taskName)});
    //Thêm hàm delay cho kịp nhìn thấy loading.gif
    yield delay(1000);
    if (status === STATUS_CODE.SUCCESS) {
    //Sử dụng lệnh put (giống dispatch bên thunk)
    yield put({
        type: GET_TASKLIST_API,
        // taskList: data,
      });
    
    } else {
        console.log('error')
    }
  } catch (err) {
    console.log(err)
  }
      //Tắt loading.gif sau khi load xong data.
      yield put({
        type: HIDE_LOADING,
      });
  } 
  export function* theoDoiActionDoneTaskApi() {
    yield takeLatest(CHECK_TASK_API, doneTaskApiAction)
  }

    //Chức năng Reject Task
function* rejectTaskApiAction (action) {
  //  console.log(action)
  //Gọi API, Hiển thị loading, thành công thì load lại Task.
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    const {taskName} = action;
    let { data, status } = yield call(()=> {return toDoListService.rejectTaskApi(taskName)});
    //Thêm hàm delay cho kịp nhìn thấy loading.gif
    yield delay(1000);
    if (status === STATUS_CODE.SUCCESS) {
    //Sử dụng lệnh put (giống dispatch bên thunk)
    yield put({
        type: GET_TASKLIST_API,
        // taskList: data,
      });
    
    } else {
        console.log('error')
    }
  } catch (err) {
    console.log(err)
  }
      //Tắt loading.gif sau khi load xong data.
      yield put({
        type: HIDE_LOADING,
      });
  } 
  export function* theoDoiActionRejectTaskApi() {
    yield takeLatest(REJECT_TASK_API, rejectTaskApiAction)
  }
  