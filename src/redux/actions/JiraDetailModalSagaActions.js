import { SGA_JIRA_DETAIL_MODAL_GET_ALL_COMMENT_BY_TASKID, SGA_JIRA_DETAIL_MODAL_POST_NEW_COMMENT, SGA_JIRA_DETAIL_MODAL_DELETE_COMMENT, SGA_JIRA_DETAIL_MODAL_UPDATE_COMMENT } from "../constant/Cyberbugs/JiraDetailCommentsConsts";

export const sgaJiraDetailGetAllCommentByTaskId = (taskId) => ({
    type: SGA_JIRA_DETAIL_MODAL_GET_ALL_COMMENT_BY_TASKID,
    taskId
})

export const sgaJiraDetailModalPostNewComment = (commentData) => ({
    type: SGA_JIRA_DETAIL_MODAL_POST_NEW_COMMENT,
    commentData
});

export const sgaJiraDetailModalDeleteComment = (commentId) => ({
    type: SGA_JIRA_DETAIL_MODAL_DELETE_COMMENT,
    commentId
});

export const sgaJiraDetailModalUpdateComment = (updateData) => ({
    type: SGA_JIRA_DETAIL_MODAL_UPDATE_COMMENT,
    updateData
});