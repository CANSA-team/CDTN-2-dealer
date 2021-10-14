import { Dispatch } from "redux";
import { CommentModel, UserModel } from "../models";
import  axios  from 'axios';
import { UserActionType } from "../action-types";
import {cansa} from "../../consts/Selector";

export interface CheckLogin{
    readonly type: UserActionType.CHECK_LOGIN,
    payload?: boolean,
}

export interface UserErrorAction{
    readonly type: UserActionType.ON_LOGIN_ERROR,
    payload: any
}

export interface GetUserInfor{
    readonly type: UserActionType.GET_UER_INFO,
    payload?: UserModel
}

export type UserActions = CheckLogin | UserErrorAction | GetUserInfor;

export const checkLogin = () => {
    return async ( dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/check/login`)
            if(!response){
                dispatch({
                    type:  UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: UserActionType.CHECK_LOGIN,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type:  UserActionType.ON_LOGIN_ERROR,
                payload: error
            })
        }

    }
}

export const getUserInfo = () => {
    return async ( dispatch: Dispatch<UserActions>) => {
        try {
                const response = await axios.get<any>(`${cansa[1]}/api/user/get/user`)
                if(!response){
                    dispatch({
                        type:  UserActionType.ON_LOGIN_ERROR,
                        payload: 'Product list error'
                    })
                }else{
                    // save our location in local storage
                    dispatch({
                        type: UserActionType.GET_UER_INFO,
                        payload: response.data.data
                    })
                }
        } catch (error) {
            dispatch({
                type:  UserActionType.ON_LOGIN_ERROR,
                payload: error
            })
        }

    }
}
