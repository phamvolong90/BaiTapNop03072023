import * as ToDoListSagaReducer from "./ToDoListSagaReducer"; //import toàn bộ action
import { all } from "redux-saga/effects";
import * as UserCyberbugsSaga from "./CyberBugs/UserCyberbugsSaga"
import * as ProjectCategorySaga from "./CyberBugs/ProjectCategorySaga"
import * as ProjectSaga from "./CyberBugs/ProjectSaga"
// import * as PrioritySaga from './Cyberbugs/PrioritySaga';
import * as PrioritySaga from './CyberBugs/PrioritySaga';
// import * as TaskTypeSaga from './Cyberbugs/TaskTypeSaga';
import * as TaskTypeSaga from './CyberBugs/TaskTypeSaga';
// import * as StatusSaga from './Cyberbugs/StatusSaga'
import * as StatusSaga from './CyberBugs/StatusSaga'
import * as TaskSaga from './CyberBugs/TaskSaga'
import * as CommentSaga from './CyberBugs/CommentSaga'
import * as JiraDetailModalSaga from './CyberBugs/JiraDetailModalSaga'
export function* rootSaga() {
  yield all([
    //Nghiệp vụ theo dõi các action của bài tập ToDoList
    ToDoListSagaReducer.theoDoiActionGetTaskApi(),
    ToDoListSagaReducer.theoDoiActionAddTaskApi(),
    ToDoListSagaReducer.theoDoiActionDelTaskApi(),
    ToDoListSagaReducer.theoDoiActionDoneTaskApi(),
    ToDoListSagaReducer.theoDoiActionRejectTaskApi(),
    //CyberBugsReducer:
    UserCyberbugsSaga.theoDoiSignin(),
    UserCyberbugsSaga.theoDoiGetUser(),
    UserCyberbugsSaga.theoDoiAddUserProject(),
    UserCyberbugsSaga.theoDoiRemoveUserProject(),
    UserCyberbugsSaga.theoDoiGetUserByProjectIdSaga(),

    ProjectCategorySaga.theoDoigetAllProjectCategory(),
    
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProject(),
    ProjectSaga.theoDoiGetProjectDetail(),
    ProjectSaga.theoDoiGetAllProjectSaga(),

    StatusSaga.theoDoiGetAllStatusSaga(),
    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
    PrioritySaga.theoDoiGetAllPriority(),

    TaskSaga.theoDoiCreateTaskSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateTaskStatusSaga(),
    TaskSaga.theoDoiHandleChangePostApi(),
    TaskSaga.theoDoiUdpateTask(),

    CommentSaga.theoDoiGetAllComment(), 
    JiraDetailModalSaga.listenGetAllCommentByTaskId(),
    JiraDetailModalSaga.listenClickPostNewComment(),
    JiraDetailModalSaga.listenDeleteCommentApi(),
    JiraDetailModalSaga.listenUpdateCommentContent(), 
  ]);
}

//Demo take('action'):
// function * getTaskApi() {
//     while (true) {
//         yield take('getTaskApiAction')
//         //Call Api dispatch lên reducer
//     }
// }
//Demo fork:
// export function * rootSaga() {
//     yield fork(getTaskApi);//Cơ chế bất đồng bộ non-blocking chạy không cần chờ nếu có nhiều hàm
// }
//Demo takeEvery
// export function* rootSaga() {
//   yield takeEvery('getTaskApiAction', getTaskApi)
// }
