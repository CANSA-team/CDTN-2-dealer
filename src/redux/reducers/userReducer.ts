import { UserActionType } from "../action-types";
import { UserActions } from "../actions/userActions";
import { UserStage, UserModel } from "../models";


const initialState: UserStage = {
    check: false,
    checkFogotPassword: false,
    userInfor: {} as UserModel,
    status: '',
    updateUser: 0,
    error: undefined
}

const userReducer = (state: UserStage = initialState, action: UserActions) => {
    switch (action.type) {
        case UserActionType.CHECK_LOGIN:
            return {
                ...state,
                check: action.payload
            }
        case UserActionType.GET_USER_INFO:
            return {
                ...state,
                userInfor: action.payload
            }
        case UserActionType.ON_LOGIN_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case UserActionType.LOGIN:
            return {
                ...state,
                status: action.payload
            }
        case UserActionType.REGISTER:
            return {
                ...state,
                status: action.payload
            }
        case UserActionType.LOGOUT:
            return {
                ...state,
                status: action.payload
            }
        case UserActionType.FORGOTT_PASSWORD:
            return {
                ...state,
                status: action.payload
            }
        case UserActionType.FORGOTT_PASSWORD_OTP:
            return {
                ...state,
                check: action.payload
            }
        case UserActionType.FORGOTT_PASSWORD_CENTER:
            return {
                ...state,
                checkFogotPassword: action.payload
            }
        case UserActionType.UPDATE_USER_PROFILE:
            return {
                ...state,
                updateUser: action.payload
            }

        default:
            return state;

    }
}

export default userReducer;