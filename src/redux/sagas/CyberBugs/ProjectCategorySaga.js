import { call, put, takeLatest } from "redux-saga/effects";

import { STATUS_CODE } from "../../../utility/constants/settingSystem";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../constant/Cyberbugs/Cyberbugs";
import { cyberbugsServices } from "../../../services/CyberbugsService";

function* getAllProjectCategorySaga(action) {
    console.log('actionSaga', action);
    try {
        //Gọi api lấy dữ liệu về > services > CyberbugsService.js > getAllProjectCategory
        const { data, status } = yield call(() => cyberbugsServices.getAllProjectCategory());
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            //Lấy 3 Option Selector
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data: data.content
            });
        }
    } catch (err) {
        console.log(err);
    }
}
export function* theoDoigetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}