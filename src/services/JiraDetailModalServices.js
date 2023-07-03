import { baseService } from "../services/baseService";

class JiraDetailModalServices extends baseService {
    //Get all comment by task id
    sgGetAllCommentByTaskId = (taskId) => this.get(`Comment/getAll?taskId=${taskId}`);
    //COMMENT SERVICES
    //1. Post a new comment
    sgPostNewComment = (commentData) => this.post('Comment/insertComment', commentData);
    //2. Delete a comment
    sgDeleteComment = (commentId) => this.delete(`Comment/deleteComment?idComment=${commentId}`);
    //3. Update a comment
    sgUpdateComment = (updateData) => this.put(`Comment/updateComment?id=${updateData.id}&contentComment=${updateData.contentComment}`);
}

export const jiraDetailModalServices = new JiraDetailModalServices();