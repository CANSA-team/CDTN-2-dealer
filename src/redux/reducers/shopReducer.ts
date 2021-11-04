import { ShopActionType } from "../action-types";
import { ShopActions } from "../actions/shopActions";
import { CommentState, CommentModel, ShopState, ShopModel } from "../models";


const initialState: ShopState = {
    info: {} as ShopModel,
    error: undefined
}

const shopReducer = (state: ShopState = initialState, action: ShopActions) => {
    switch (action.type) {
        case ShopActionType.GET_SHOP_INFO:
            return {
                ...state,
                info: action.payload
            }
        case ShopActionType.GET_SHOP_OWNER:
            return {
                ...state,
                info: action.payload
            }
        case ShopActionType.ON_SHOP_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;

    }
}

export default shopReducer;