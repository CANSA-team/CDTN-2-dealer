import { AccessActionType } from "../action-types";
import { AccessActions } from "../actions/accessActions";
import { AccessState } from "../models";


const initialState: AccessState = {
    message: undefined,
    error: undefined
}

const accessReducer = (state: AccessState = initialState, action: AccessActions) => {
    switch (action.type) {
        case AccessActionType.UPDATE_ACCESS_INFO:
            return {
                ...state,
                message: action.payload
            }
        case AccessActionType.ON_ACCESS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;

    }
}

export default accessReducer;