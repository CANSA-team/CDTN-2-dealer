import { Dispatch } from "redux";
import { CommentModel, ShopModel } from "../models";
import  axios  from 'axios';
import {  CommentActionType, ShopActionType } from "../action-types";
import {cansa} from "../../consts/Selector";

export interface GetShopInfo{
    readonly type: ShopActionType.GET_SHOP_INFO,
    payload?: ShopModel
}

export interface ShopErrorAction{
    readonly type: ShopActionType.ON_SHOP_ERROR,
    payload: any
}

export type ShopActions = GetShopInfo | ShopErrorAction;

export const getShopInfo = (shop_id: number, option: number = 0) => {
    return async ( dispatch: Dispatch<ShopActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/shop/info/${shop_id}/${option}/e4611a028c71342a5b083d2cbf59c494`)
            if(!response){
                dispatch({
                    type: ShopActionType.ON_SHOP_ERROR,
                    payload: 'Product list error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: ShopActionType.GET_SHOP_INFO,
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
