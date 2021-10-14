import { CommentActionType, SliderActionType } from "../action-types";
import { CommentActions } from "../actions/commentActions";
import { CommentState, CommentModel } from "../models";


const initialState: CommentState = {
    comment: undefined,
    error: undefined
}

const commentReducer = (state: CommentState = initialState, action: CommentActions) => {
    switch (action.type) {
        case CommentActionType.GET_ALL_COMMENT:
            return {
                ...state,
                comment: action.payload
            }
        case CommentActionType.ADD_COMMENT:
            return {
                ...state,
                comment: action.payload
            }
        case CommentActionType.ON_COMMENT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;

    }
}

export default commentReducer;