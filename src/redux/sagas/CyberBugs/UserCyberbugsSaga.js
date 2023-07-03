import Axios from "axios";
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constant/ToDoListConst';
import { call, delay, fork, take, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { USER_SIGNIN_API, USLOGIN } from "../../constant/Cyberbugs/Cyberbugs";
import { cyberbugsServices } from "../../../services/CyberbugsService";
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../../utility/constants/settingSystem";
import { history } from '../../../utility/history';
import { userService } from '../../../services/UserService';
import { GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA } from '../../constant/Cyberbugs/UserConstatnts';


//Quản lý action function saga
function* signinSaga(action) {
    console.log(action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    // gọi api
    try {
        // const {data, status} = yield cyber.signinCyberBugs(action.userLogin);
        const {data , status} = yield call(() => cyberbugsServices.signinCyberBugs(action.userLogin));
        //Nếu đăng nhập thành công thì lưu Token vào Local Storage
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
        console.log(data)
        // Cách 1: gọi props history để chuyển hướng trang (hơi chuối nhưng ngắn gọn)
        // action.userLogin.history.push('/demohocmodal');
        // Cách 2: sử dụng useHistory của React-Router-Dom 
        // let history = yield select(state=>state.HistoryReducer.history)
        // history.push('/home');
        // Cách 3: sử dụng thư viện history 4.10.0
        history.push('/home');
        yield put ({
            type:USLOGIN
        })
    } catch(err) {
        console.log(err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoiSignin () {
    yield takeLatest (USER_SIGNIN_API,signinSaga);
}


//Quản lý các action saga
function* getUserSaga(action) {

    //action.keyWord
    console.log("keyword", action.keyWord);
    //Gọi api 
    try {
        const { data, status } = yield call(() => userService.getUser(action.keyWord));

        yield put({
            type: 'GET_USER_SEARCH',
            lstUserSearch: data.content
        })
        console.log("data", data);

    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiGetUser() {
    yield takeLatest("GET_USER_API", getUserSaga);
}


//Quản lý KHI ADD USER
function* addUserProjectSaga(action) {
    try {
        const { data, status } = yield call(() => userService.assignUserProject(action.userProject));

        yield put({
            type: 'GET_LIST_PROJECT_SAGA'
        })
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiAddUserProject() {
    yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}

//Quản lý REMOVE USER
function* removeUserProjectSaga(action) {
    try {
        const { data, status } = yield call(() => userService.deleteUserFromProject(action.userProject));

        yield put({
            type: 'GET_LIST_PROJECT_SAGA'
        })
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiRemoveUserProject() {
    yield takeLatest("REMOVE_USER_PROJECT_API", removeUserProjectSaga);
}

// QUẢN LÝ GET USER
function* getUserByProjectIdSaga(action) {
    const { idProject } = action;
    console.log('action',idProject)

    try {
        const { data, status } = yield call(() => userService.getUserByProjectId(idProject));
        console.log('checkdata',data);

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_USER_BY_PROJECT_ID,
                arrUser:data.content
            })
        }
    } catch (err) {
        console.log(err);
        console.log(err.response?.data);
        //Nếu không có user thì dispatch 1 mảng rỗng
        if(err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
            yield put({
                type:GET_USER_BY_PROJECT_ID,
                arrUser:[]
            })
        }
    }
}
export function* theoDoiGetUserByProjectIdSaga() {
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga)
}