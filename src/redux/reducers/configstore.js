import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducer from "./ToDoListReducer";
import LoadingReducer from "./LoadingReducer";

import {HOCModalReducer} from "./HOCModalReducer";
//Redux-Thunk
import reduxThunk from 'redux-thunk'
//Redux-Saga
import { rootSaga } from "../sagas/rootSaga";
import createMiddleWareSaga from 'redux-saga'
import { HistoryReducer } from "./HistoryReducer";
import { UserLoginCyberBugsReducer } from "./UserCyberBugsReducer";
import { ProjectCategoryReducer } from "./ProjectCategoryReducer";
import { ProjectCyberBugsReducer } from "./ProjectCyberBugsReducer";
import { drawerReducer } from "./DrawerCyberbugs";
import { ProjectReducer } from "./ProjectReducer";
import { TaskTypeReducer } from "./TaskTypeReducer";
import { PriorityReducer } from "./PriorityReducer";
import { StatusReducer } from "./StatusReducer";
import { TaskReducer } from "./TaskReducer";
import { CommentReducer } from "./CommentReducer";
import { JiraHOCModalReducer } from "./JiraHOCModalReducer";
import { JiraDetailTaskCommentReducer } from "./JiraDetailTaskCommentReducer";
import { JiraUserLoginedReducer } from "./JiraUserLoginedReducer";

const middleWareSaga = createMiddleWareSaga();
const rootReducer = combineReducers ({
    //Khai báo reducer con
    ToDoListReducer,
    LoadingReducer,
    HOCModalReducer,
    HistoryReducer,
    UserLoginCyberBugsReducer,
    ProjectCategoryReducer,
    ProjectCyberBugsReducer,
    drawerReducer,
    ProjectReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer,
    CommentReducer,
    JiraHOCModalReducer,
    JiraDetailTaskCommentReducer,
    JiraUserLoginedReducer,
});
const store = createStore(rootReducer, applyMiddleware(reduxThunk,middleWareSaga));
//Gọi Saga thực thi sau khi applyMiddleware
middleWareSaga.run(rootSaga);
export default store; 