import { call, put, takeLatest } from "redux-saga/effects";
import {  GET_ALL_COMMENT_SAGA, GET_ALL_COMMENT } from "../../constant/Cyberbugs/CommentConstants";
import { commentService } from "../../../services/commentServices";
function * getAllCommentSaga(action) {
    try {
        const {data,status} = yield call(()=> commentService.getAllComment());
        yield put({type:GET_ALL_COMMENT,arrComment:data.content});
    }catch(err) {
        console.log(err);
    }
}
export function * theoDoiGetAllComment() {
    yield takeLatest(GET_ALL_COMMENT_SAGA,getAllCommentSaga)
}