import { ACT_JIRA_DETAIL_MODAL_DISPLAY_EDIT_COMMENT_EDITOR, ACT_JIRA_DETAIL_MODAL_DISPLAY_MAIN_COMMENT_EDITOR, ACT_JIRA_DETAIL_MODAL_HIDE_EDIT_COMMENT_EDITOR, ACT_JIRA_DETAIL_MODAL_HIDE_MAIN_COMMENT_EDITOR, ACT_JIRA_DETAIL_MODAL_PUSH_COMMENT_ARR_TO_REDUX } from "../constant/Cyberbugs/JiraDetailCommentsConsts";

export const actJiraDetailModalHideMainCommentEditor = () => ({
    type: ACT_JIRA_DETAIL_MODAL_HIDE_MAIN_COMMENT_EDITOR
});

export const actJiraDetailModalDisplayMainCommentEditor = () => ({
    type: ACT_JIRA_DETAIL_MODAL_DISPLAY_MAIN_COMMENT_EDITOR
});

export const actJiraDetailModalPushCommentArrToRedux = (commentArr) => ({
    type: ACT_JIRA_DETAIL_MODAL_PUSH_COMMENT_ARR_TO_REDUX,
    commentArr
});

export const actJiraDetailModalHideEditCommentEditor = () => ({
    type: ACT_JIRA_DETAIL_MODAL_HIDE_EDIT_COMMENT_EDITOR
});

export const actJiraDetailModalDisplayEditCommentEditor = (commentId) => ({
    type: ACT_JIRA_DETAIL_MODAL_DISPLAY_EDIT_COMMENT_EDITOR,
    commentId
});