import { ShopRevenue } from './../models/index';
import { Dispatch } from "redux";
import { ShopModel, ShopOrder } from "../models";
import axios from 'axios';
import { ShopActionType } from "../action-types";
import { cansa } from "../../consts/Selector";

export interface GetShopOwner {
    readonly type: ShopActionType.GET_SHOP_OWNER,
    payload?: ShopModel
}
export interface GetShopOwner {
    readonly type: ShopActionType.GET_SHOP_OWNER,
    payload?: ShopModel
}

export interface GetShopOder {
    readonly type: ShopActionType.GET_SHOP_ORDER,
    payload?: ShopOrder
}

export interface GetShopRevenue {
    readonly type: ShopActionType.GET_SHOP_REVENUE,
    payload?: ShopRevenue
}

export interface ShopErrorAction {
    readonly type: ShopActionType.ON_SHOP_ERROR,
    payload: any
}
export interface RegisterShopAction {
    readonly type: ShopActionType.REGISTER_SHOP,
    payload: any
}
export interface EditProfileShopAction {
    readonly type: ShopActionType.EDIT_PROFILE_SHOP,
    payload: any
}

export type ShopActions = ShopErrorAction | GetShopOwner | RegisterShopAction | EditProfileShopAction | GetShopOder | GetShopRevenue;

export const getShopOwner = (user_id: number, option: number = 0) => {
    return async (dispatch: Dispatch<ShopActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/shop/get/${user_id}/${option}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: ShopActionType.ON_SHOP_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ShopActionType.GET_SHOP_OWNER,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ShopActionType.ON_SHOP_ERROR,
                payload: error
            })
        }

    }
}

export const getShopOder = (user_id: number,page: number = 1) => {
    return async (dispatch: Dispatch<ShopActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/oder/get_shop/${user_id}/${page}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: ShopActionType.ON_SHOP_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ShopActionType.GET_SHOP_ORDER,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ShopActionType.ON_SHOP_ERROR,
                payload: error
            })
        }

    }
}

export const getShopRevenue = (user_id: number) => {
    return async (dispatch: Dispatch<ShopActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/shop/revenue/${user_id}/e4611a028c71342a5b083d2cbf59c494`)
            if (!response) {
                dispatch({
                    type: ShopActionType.ON_SHOP_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ShopActionType.GET_SHOP_REVENUE,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ShopActionType.ON_SHOP_ERROR,
                payload: error
            })
        }

    }
}

export const registerShop = (shop_name: string, shop_description: string, shop_owner: number, shop_avatar: number) => {
    return async (dispatch: Dispatch<ShopActions>) => {
        const data = {
            shop_name: shop_name,
            shop_description: shop_description,
            shop_owner: shop_owner,
            shop_avatar: shop_avatar
        }
        try {
            const response = await axios.post<any>(`${cansa[1]}/api/shop/add/e4611a028c71342a5b083d2cbf59c494`, data)

            if (!response) {
                dispatch({
                    type: ShopActionType.ON_SHOP_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ShopActionType.REGISTER_SHOP,

                    payload: response.data
                })
            }

        } catch (error) {
            dispatch({
                type: ShopActionType.ON_SHOP_ERROR,
                payload: error
            })
        }

    }
}

///api/shop/update/:shop_id/:key
export const updateShop = (shop_name: string, shop_description: string, shop_id: number, shop_avatar: number, last_update: number) => {
    return async (dispatch: Dispatch<ShopActions>) => {
        const data = {
            shop_name: shop_name,
            shop_description: shop_description,
            shop_avatar: shop_avatar,
            last_update: last_update
        }
        try {
            const response = await axios.post<any>(`${cansa[1]}/api/shop/update/${shop_id}/e4611a028c71342a5b083d2cbf59c494`, data)
            if (!response) {
                dispatch({
                    type: ShopActionType.ON_SHOP_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: ShopActionType.EDIT_PROFILE_SHOP,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ShopActionType.ON_SHOP_ERROR,
                payload: error
            })
        }

    }
}
