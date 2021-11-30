import { Dispatch } from "redux";
import { ProductModel } from "../models";
import axios from 'axios';
import { ProductActionType } from "../action-types";
import { cansa } from "../../consts/Selector";

export interface InsertProduct {
    readonly type: ProductActionType.INSERT_PRODUCT,
    payload?: any
}
export interface UpdateProduct {
    readonly type: ProductActionType.UPDATE_PRODUCT,
    payload?: any
}
export interface DeleteProduct {
    readonly type: ProductActionType.DELETE_PRODUCT,
    payload?: any
}
export interface ProductErrorAction {
    readonly type: ProductActionType.ON_PRODUCT_ERROR,
    payload: any
}

export interface GetProductShop {
    readonly type: ProductActionType.GET_PRODUCT_SHOP,
    payload?: [ProductModel]
}

export type ProductActions = InsertProduct | DeleteProduct | UpdateProduct | ProductErrorAction | GetProductShop;

export const getProductsShop = (shop_id: number, page: number = 1, option: number = 0) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/product/shop/${page}/${shop_id}/${option}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: ProductActionType.GET_PRODUCT_SHOP,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ProductActionType.ON_PRODUCT_ERROR,
                payload: error
            })
        }

    }
}

export const insertProduct = (data: any, shop_id: number) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await axios.post<any>(`${cansa[1]}/api/product/insert/${shop_id}/e4611a028c71342a5b083d2cbf59c494`, data)
            if (!response) {
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: ProductActionType.INSERT_PRODUCT,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ProductActionType.ON_PRODUCT_ERROR,
                payload: error
            })
        }

    }
}

export const updateProduct = (data: any, shop_id: number) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await axios.post<any>(`${cansa[1]}/api/product/update/${shop_id}/e4611a028c71342a5b083d2cbf59c494`, data)
            if (!response) {
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: ProductActionType.UPDATE_PRODUCT,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ProductActionType.ON_PRODUCT_ERROR,
                payload: error
            })
        }

    }
}

export const deleteProduct = (product_id: number, shop_id: number) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            const data = { product_id: product_id }
            const response = await axios.post<any>(`${cansa[1]}/api/product/delete/${shop_id}/e4611a028c71342a5b083d2cbf59c494`, data)
            if (!response) {
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            } else {
                dispatch({
                    type: ProductActionType.DELETE_PRODUCT,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ProductActionType.ON_PRODUCT_ERROR,
                payload: error
            })
        }

    }
}