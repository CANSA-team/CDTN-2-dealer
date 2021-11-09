import { ShopRevenue } from './../models/index';
import { ShopActionType } from "../action-types";
import { ShopActions } from "../actions/shopActions";
import { CommentState, CommentModel, ShopState, ShopModel, RegisterShopModel, ShopOrder } from "../models";


const initialState: ShopState = {
    info: {} as ShopModel,
    order: [] as ShopOrder[],
    revenue: [] as ShopRevenue[],
    register_status: {} as RegisterShopModel,
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
        case ShopActionType.GET_SHOP_ORDER:
            return {
                ...state,
                order: action.payload
            }

        case ShopActionType.ON_SHOP_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case ShopActionType.REGISTER_SHOP:
            return {
                ...state,
                register_status: action.payload
            }
        case ShopActionType.GET_SHOP_REVENUE:
            return {
                ...state,
                revenue: action.payload
            }

        case ShopActionType.EDIT_PROFILE_SHOP:
            return {
                ...state,
                info: action.payload
            }
        default:
            return state;

    }
}

export default shopReducer;