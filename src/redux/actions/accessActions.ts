import { Dispatch } from "redux";
import { CommentModel, ShopModel } from "../models";
import  axios  from 'axios';
import {  AccessActionType, CommentActionType, ShopActionType } from "../action-types";
import {cansa} from "../../consts/Selector";

export interface UpdateAccess{
    readonly type: AccessActionType.UPDATE_ACCESS_INFO,
    payload?: any
}

export interface AccessErrorAction{
    readonly type: AccessActionType.ON_ACCESS_ERROR,
    payload: any
}

export type AccessActions = UpdateAccess | AccessErrorAction;

export const updateAccess = () => {
    return async ( dispatch: Dispatch<AccessActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/access/update/e4611a028c71342a5b083d2cbf59c494`)
            if(!response){
                dispatch({
                    type: AccessActionType.ON_ACCESS_ERROR,
                    payload: 'Product list error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: AccessActionType.UPDATE_ACCESS_INFO,
                    payload: response.data.message
                })
            }

        } catch (error) {
            dispatch({
                type: AccessActionType.ON_ACCESS_ERROR,
                payload: error
            })
        }

    }
}
