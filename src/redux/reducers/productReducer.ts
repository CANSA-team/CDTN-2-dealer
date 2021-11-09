import { ProductActionType } from "../action-types";
import { ProductActions } from "../actions/productActions";
import { ProductModel, ProductState } from "../models";


const initialState: ProductState = {
    productShop: [] as ProductModel[],
    error: undefined
}

const productReducer = (state: ProductState = initialState, action: ProductActions) => {
    switch (action.type) {
        case ProductActionType.ON_PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case ProductActionType.GET_PRODUCT_SHOP:
        case ProductActionType.INSERT_PRODUCT:
        case ProductActionType.DELETE_PRODUCT:
        case ProductActionType.UPDATE_PRODUCT:
            return {
                ...state,
                productShop: action.payload
            }
        default:
            return state;
    }
}

export default productReducer;