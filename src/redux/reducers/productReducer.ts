import { ProductActionType } from "../action-types";
import { ProductActions } from "../actions/productActions";
import { ProductModel, ProductState } from "../models";


const initialState: ProductState = {
    productNew: undefined,
    productHot: undefined,
    productCategory: undefined,
    productSearch: undefined,
    productShop: undefined,
    product: undefined,
    error: undefined
}

const productReducer = (state: ProductState = initialState, action: ProductActions) => {
    switch (action.type) {
        case ProductActionType.GET_PRODUCT_NEW:
            return {
                ...state,
                productNew: action.payload
            }
        case ProductActionType.GET_PRODUCT_HOT:
            return {
                ...state,
                productHot: action.payload
            }
        case ProductActionType.GET_PRODUCT_CATEGORY:
            return {
                ...state,
                productCategory: action.payload
            }
        case ProductActionType.GET_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case ProductActionType.ON_PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case ProductActionType.GET_PRODUCT_SEARCH:
            return {
                ...state,
                productSearch: action.payload
            }
        case ProductActionType.GET_PRODUCT_SHOP:
            return {
                ...state,
                productShop: action.payload
            }
        default:
            return state;

    }
}

export default productReducer;