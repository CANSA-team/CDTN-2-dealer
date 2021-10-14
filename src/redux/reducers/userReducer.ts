import { CommentActionType, SliderActionType, UserActionType } from "../action-types";
import { CommentActions } from "../actions/commentActions";
import { UserActions } from "../actions/userActions";
import { CommentState, CommentModel, UserStage,UserModel } from "../models";


const initialState: UserStage = {
    check: false,
    userInfor: undefined,
    error: undefined
}

const userReducer = (state: UserStage = initialState, action: UserActions) => {
    switch (action.type) {
        case UserActionType.CHECK_LOGIN:
            return {
                ...state,
                check: action.payload
            }
        case UserActionType.GET_UER_INFO:
            return {
                ...state,
                userInfor: action.payload
            }
        case UserActionType.ON_LOGIN_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;

    }
}

export default userReducer;