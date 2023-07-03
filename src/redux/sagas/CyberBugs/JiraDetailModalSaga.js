import { call, put, select, takeLatest } from 'redux-saga/effects';
import { jiraDetailModalServices } from '../../../services/JiraDetailModalServices';
import { STATUS_CODE, NOTIFICATION_ANTD_ERROR, NOTIFICATION_ANTD_SUCCESS } from '../../../utility/constants/settingSystem';
import { notifiFunction } from '../../../utility/Notification/notificationCyberbugs';
import { actJiraDetailModalPushCommentArrToRedux } from '../../actions/JiraDetailCommentActions';
import { sgaJiraDetailGetAllCommentByTaskId } from '../../actions/JiraDetailModalSagaActions';
import { SGA_JIRA_DETAIL_MODAL_DELETE_COMMENT, SGA_JIRA_DETAIL_MODAL_GET_ALL_COMMENT_BY_TASKID, SGA_JIRA_DETAIL_MODAL_POST_NEW_COMMENT, SGA_JIRA_DETAIL_MODAL_UPDATE_COMMENT } from '../../constant/Cyberbugs/JiraDetailCommentsConsts';

//1. Get all comment by task id
function* getAllCommentByTaskId(action) {

    try {
        const { data, status } = yield call(() => jiraDetailModalServices.sgGetAllCommentByTaskId(action.taskId));
        if (status === STATUS_CODE.SUCCESS) {
            yield put(actJiraDetailModalPushCommentArrToRedux(data.content));
        } else {
            console.log('Some thing was wrong! For developer only!');
        }
    } catch (err) {
        console.log(err);
    }
};
export function* listenGetAllCommentByTaskId() {
    yield takeLatest(SGA_JIRA_DETAIL_MODAL_GET_ALL_COMMENT_BY_TASKID, getAllCommentByTaskId);
};
//2. Click Post new comment button
function* clickPostNewComment(action) {

    const { taskId } = yield select(state => state.JiraHOCModalReducer.taskData);

    try {
        const { data, status } = yield call(() => jiraDetailModalServices.sgPostNewComment(action.commentData));
        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction(NOTIFICATION_ANTD_SUCCESS, data.message, 'Something else comment ok!');
            console.log('action', action)
            yield put((sgaJiraDetailGetAllCommentByTaskId(action.commentData.taskId)));
        } else {
            notifiFunction(NOTIFICATION_ANTD_ERROR, 'Server error', 'Something was wrong!');
            console.log('Something was wrong! For developer only!');
        }
    } catch (err) {
        console.log(err);
        notifiFunction(NOTIFICATION_ANTD_ERROR, err.reponsive, 'Something was wrong!');
    }
};
export function* listenClickPostNewComment() {
    yield takeLatest(SGA_JIRA_DETAIL_MODAL_POST_NEW_COMMENT, clickPostNewComment);
};
//3. Delete a comment
function* deleteCommentApi(action) {

    const { taskId } = yield select(state => state.JiraHOCModalReducer.taskData);
    
    try {
        const {data, status} = yield call(() => jiraDetailModalServices.sgDeleteComment(action.commentId));
        if(status === STATUS_CODE.SUCCESS) {
            notifiFunction(NOTIFICATION_ANTD_SUCCESS, data.message, 'Something else delete ok!');
            yield put((sgaJiraDetailGetAllCommentByTaskId(taskId)));
        } else {
            notifiFunction(NOTIFICATION_ANTD_ERROR, 'Server error', 'Something else ok!');
            console.log('Something was wrong! For developer only!');
        }
    } catch (err) {
        console.log(err);
    }
};
export function* listenDeleteCommentApi() {
    yield takeLatest(SGA_JIRA_DETAIL_MODAL_DELETE_COMMENT, deleteCommentApi);
};
function* updateCommentContent(action) {

    const { taskId } = yield select(state => state.JiraHOCModalReducer.taskData);

    console.log(action.updateData);
    
    try {
        const {data, status} = yield call(() => jiraDetailModalServices.sgUpdateComment(action.updateData));
        if(status === STATUS_CODE.SUCCESS) {
            notifiFunction(NOTIFICATION_ANTD_SUCCESS, data.message, 'Something else update ok!');
            yield put((sgaJiraDetailGetAllCommentByTaskId(taskId)));
        } else {
            notifiFunction(NOTIFICATION_ANTD_ERROR, 'Server error', 'Something else ok!');
            console.log('Something was wrong! For developer only!');
        }
    } catch (err) {
        console.log(err);
    }
}
export function* listenUpdateCommentContent() {
    yield takeLatest(SGA_JIRA_DETAIL_MODAL_UPDATE_COMMENT, updateCommentContent);
}