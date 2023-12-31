import { call, delay, put, takeLatest } from "redux-saga/effects";
import {  cyberbugsServices } from "../../../services/CyberbugsService";


import {history} from '../../../utility/history';
// import { projectService } from "../../../services/ProjectService";
import { notifiFunction } from "../../../utility/Notification/notificationCyberbugs";
import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA } from "../../constant/Cyberbugs/ProjectCyberBugsConstants";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../constant/Cyberbugs/UserConstatnts";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constant/ToDoListConst";
import { STATUS_CODE } from "../../../utility/constants/settingSystem";
import { projectService } from "../../../services/ProjectService";
function* createProjectSaga(action) {
    console.log('actionCreateProject',action)
    //HIỂN THỊ LOADING
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);
    try {
        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => cyberbugsServices.createProjectAuthorization(action.newProject));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            history.push('/projectmanagement');
        }
    } catch (err) {
        console.log(err);
    }
   
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiCreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga);
}


//Saga dùng để get all project từ api 
//Khải - Code ngày dd/MM/yyyy
function *getListProjectSaga(action) { 
    try {
        const {data,status} = yield call( () => cyberbugsServices.getListProject());
 
        //Sau khi lấy dữ liệu từ api về thành công
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:'GET_LIST_PROJECT',
                projectList:data.content
            })
        }
    }catch(err) {
        console.log(err)
    }
}
export function* theoDoiGetListProjectSaga() {
    yield takeLatest('GET_LIST_PROJECT_SAGA', getListProjectSaga);
}

//UpdateProject
function* updateProjectSaga(action) {
    // console.log('action123',action);
    // return;
    //HIỂN THỊ LOADING
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);
    try {
        const { data, status } = yield call(() => cyberbugsServices.updateProject(action.prjectUpdate));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            // history.push('/projectmanagement');
        }
        //Gọi lại để hiển thị ra giao diện và đóng pop up 
        // Cách 1 gọi yield put (thường sử dụng nhiều hơn)
        // yield put({
        //     type:'GET_LIST_PROJECT_SAGA'
        // })
        // Cách 2 gọi yield call 
        yield call(getListProjectSaga);
        yield put({
            type:'CLOSE_DRAWER'
        })
    } catch (err) {
        console.log(err);
    }
   
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiUpdateProjectSaga() {
    yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectSaga);
}

//Delete Project:
function* deleteProjectSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);
    try {
        const { data, status } = yield call(() => projectService.deleteProject(action.idProject));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)
            notifiFunction('success','Delete project successfully !')
            // history.push('/projectmanagement');
        }else {
            notifiFunction('error','Delete project fail !')
        }
        // yield put({
        //     type:'GET_LIST_PROJECT_SAGA'
        // })
        yield call(getListProjectSaga);
        yield put({
            type:'CLOSE_DRAWER'
        })
    } catch (err) {
        notifiFunction('error','Delete project fail !')
        console.log(err);
    }
    yield put({
        type: HIDE_LOADING
    })}
export function* theoDoiDeleteProject() {
    yield takeLatest('DELETE_PROJECT_SAGA', deleteProjectSaga);}


function* getProjectDetailSaga(action) {
    // console.log('action123',action);
    // return;
    //HIỂN THỊ LOADING
    // yield put({
    //     type: DISPLAY_LOADING
    // })
    yield delay (500);
    try {
        const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId));
        
        console.log('data',data);
        //Lấy dữ liệu thành công thì đưa dữ liệu lên redux
        yield put({
            type:'PUT_PROJECT_DETAIL',
            projectDetail:data.content
        })
    } catch (err) {
        console.log('404 not found !')
        history.push('/projectmanagement');
    }
    // yield put({
    //     type: HIDE_LOADING
    // })
}

export function* theoDoiGetProjectDetail() {
    yield takeLatest('GET_PROJECT_DETAIL', getProjectDetailSaga);
}

function* getProjectAllSaga(action) {
    // console.log('action123',action);
    // return;
    //HIỂN THỊ LOADING
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);

    try {
        const { data, status } = yield call(() => projectService.getAllProject());
        //Lấy dữ liệu thành công thì đưa dữ liệu lên redux
        yield put({
            type:GET_ALL_PROJECT,
            arrProject:data.content
        })
        yield put({
            type:GET_USER_BY_PROJECT_ID_SAGA,
            idProject:data.content[0].id
        })
    
    } catch (err) {
        console.log('404 not found !')
        history.push('/projectmanagement');
    }
   
    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getProjectAllSaga);
}

