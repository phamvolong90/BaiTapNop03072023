import { ACT_JIRA_DETAIL_MODAL_DISPLAY_EDIT_COMMENT_EDITOR, ACT_JIRA_DETAIL_MODAL_DISPLAY_MAIN_COMMENT_EDITOR, ACT_JIRA_DETAIL_MODAL_HIDE_EDIT_COMMENT_EDITOR, ACT_JIRA_DETAIL_MODAL_HIDE_MAIN_COMMENT_EDITOR } from "../constant/Cyberbugs/JiraDetailCommentsConsts";

const initialState = {
    visibleMainCommentEditor: false,
    editBtnEditorData: {
        visibleEditBtnEditor: false,
        commentId: '',
    },
}

export const JiraDetailTaskCommentReducer = (state = initialState, action) => {
    switch (action.type) {

        case ACT_JIRA_DETAIL_MODAL_DISPLAY_MAIN_COMMENT_EDITOR:
            return { ...state, visibleMainCommentEditor: true };

        case ACT_JIRA_DETAIL_MODAL_HIDE_MAIN_COMMENT_EDITOR:
            return { ...state, visibleMainCommentEditor: false };

        case ACT_JIRA_DETAIL_MODAL_DISPLAY_EDIT_COMMENT_EDITOR:
            return { ...state, editBtnEditorData: {...state.editBtnEditorData, visibleEditBtnEditor: true, commentId: action.commentId} };

        case ACT_JIRA_DETAIL_MODAL_HIDE_EDIT_COMMENT_EDITOR:
            return { ...state, editBtnEditorData: {...state.editBtnEditorData, visibleEditBtnEditor: false, commentId: ''} };

        default:
            return state;
    }
}
