import { baseService } from "./baseService";
export class CommentService extends baseService {
    constructor(){
        super();
    }
    getAllComment = () => {
        return this.get(`Comment/getAll`);
    }
    createComment = (commentId) => {
        return this.post('Comment/insertComment',commentId);
    }
    updateComment = (commentUpdate) => {
        return this.post(`Comment/updateComment`,commentUpdate);
    }
    deleteComment = (idComment) => { 
        return this.delete(`Comment/deleteComment?projectId=${idComment}`);
     }
}   
export const commentService = new CommentService();