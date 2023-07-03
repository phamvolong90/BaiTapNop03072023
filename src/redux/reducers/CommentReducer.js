
import { GET_ALL_COMMENT } from "../constant/Cyberbugs/CommentConstants"
const initialState = {
    arrComment : [
        {
            "idUser": 2000,
            "avatar": "https://ui-avatars.com/api/?name=Long",
            "name": "Long",
            "commentContent": "<p>arrComment Example commentContent Long<p>"
          },
          {
            "idUser": 3000,
            "avatar": "https://ui-avatars.com/api/?name=Chau",
            "name": "Chau",
            "commentContent": "<p>arrComment Example commentContent Chau<p>"
          }
    ]
}
export const CommentReducer = (state = initialState, action) => {
    switch (action.type) {
    case GET_ALL_COMMENT:
        return { ...state,arrComment:action.arrComment }
    default:
        return state
    }
}
