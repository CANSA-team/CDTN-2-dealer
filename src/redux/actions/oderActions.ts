import { Dispatch } from "redux";
import { ProductModel, OderModel } from "../models";
import axios from 'axios';
import { OderActionType, ProductActionType } from "../action-types";
import { cansa } from "../../consts/Selector";

export interface AddOrder {
    readonly type: OderActionType.ADD_ORDER,
    payload?: string,
}

export interface GetAllOrder {
    readonly type: OderActionType.GET_ALL_ORDER,
    payload?: OderModel,
}

export interface OderErrorAction {
    readonly type: OderActionType.ON_ORDER_ERROR,
    payload: any
}

export type OrderActions = AddOrder | OderErrorAction | GetAllOrder;

export const addOder = (diaChi: string, sdt: string, user_id: number) => {
    return async (dispatch: Dispatch<OrderActions>) => {
        const data = {
            address: diaChi,
            phone: sdt,
        }
        try {
            const response = await axios.post<any>(`${cansa[1]}/api/oder/save/${user_id}/e4611a028c71342a5b083d2cbf59c494`, data);
            if (!response) {
                dispatch({
                    type: OderActionType.ON_ORDER_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: OderActionType.ADD_ORDER,
                    payload: response.data.status
                })
            }

        } catch (error) {
            dispatch({
                type: OderActionType.ON_ORDER_ERROR,
                payload: error
            })
        }

    }
}

export const getAllOder = (user_id: number, option: number = 3) => {
    /**
     * 0. đã hủy
     * 1. đã đặt
     * 2. đã nhận
     * 3. tất cả
     */
    return async (dispatch: Dispatch<OrderActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/oder/all/${user_id}/${option}/e4611a028c71342a5b083d2cbf59c494`);
            if (!response) {
                dispatch({
                    type: OderActionType.ON_ORDER_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: OderActionType.GET_ALL_ORDER,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: OderActionType.ON_ORDER_ERROR,
                payload: error
            })
        }

    }
}
