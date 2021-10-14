import { Dispatch } from "redux";
import { ProductModel } from "../models";
import axios from 'axios';
import { ProductActionType } from "../action-types";
import { cansa } from "../../consts/Selector";

export interface GetProductNew {
    readonly type: ProductActionType.GET_PRODUCT_NEW,
    payload?: [ProductModel]
}
export interface GetProductCategory {
    readonly type: ProductActionType.GET_PRODUCT_CATEGORY,
    payload?: [ProductModel]
}
export interface ProductErrorAction {
    readonly type: ProductActionType.ON_PRODUCT_ERROR,
    payload: any
}

export interface GetProductHot {
    readonly type: ProductActionType.GET_PRODUCT_HOT,
    payload?: [ProductModel]
}

export interface GetProduct {
    readonly type: ProductActionType.GET_PRODUCT,
    payload?: ProductModel
}

export interface GetProductSearch {
    readonly type: ProductActionType.GET_PRODUCT_SEARCH,
    payload?: [ProductModel]
}

export interface GetProductShop {
    readonly type: ProductActionType.GET_PRODUCT_SHOP,
    payload?: [ProductModel]
}

export type ProductActions = GetProductNew | ProductErrorAction | GetProductHot | GetProductCategory | GetProduct | GetProductSearch | GetProductShop;

export const getProductsNew = (option: number = 0) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/product/page/1/new/${option}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ProductActionType.GET_PRODUCT_NEW,
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

export const getProductsHot = (option: number = 0) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/product/page/1/hot/${option}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ProductActionType.GET_PRODUCT_HOT,
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

export const getProductsCategory = (category_id: number, page: number = 1, option: number = 0) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/category/page/${page}/${category_id}/${option}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ProductActionType.GET_PRODUCT_CATEGORY,
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

export const getProduct = (product_id: number, option: number = 0) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/product/view/${product_id}/${option}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ProductActionType.GET_PRODUCT,
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

export const getProductsSearch = (search: string, page: number = 1, option: number = 0) => {
    return async (dispatch: Dispatch<ProductActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/product/search/${page}/${search}/${option}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: ProductActionType.ON_PRODUCT_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ProductActionType.GET_PRODUCT_SEARCH,
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
                // save our location in local storage
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