import { Dispatch } from "redux";
import { CommentModel, UserModel } from "../models";
import axios from 'axios';
import { UserActionType } from "../action-types";
import { cansa } from "../../consts/Selector";

export interface CheckLogin {
    readonly type: UserActionType.CHECK_LOGIN,
    payload?: boolean,
}

export interface UserErrorAction {
    readonly type: UserActionType.ON_LOGIN_ERROR,
    payload: any
}

export interface GetUserInfor {
    readonly type: UserActionType.GET_USER_INFO,
    payload?: UserModel
}

export interface Login {
    readonly type: UserActionType.LOGIN,
    payload?: string
}

export interface Logout {
    readonly type: UserActionType.LOGOUT,
    payload?: string
}

export type UserActions = CheckLogin | UserErrorAction | GetUserInfor | Login | Logout;

export const checkLogin = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/check/login`)
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: UserActionType.CHECK_LOGIN,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: UserActionType.ON_LOGIN_ERROR,
                payload: error
            })
        }

    }
}

export const getUserInfo = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/get/user`)
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: UserActionType.GET_USER_INFO,
                    payload: response.data.data
                })
            }
        } catch (error) {
            dispatch({
                type: UserActionType.ON_LOGIN_ERROR,
                payload: error
            })
        }

    }
}

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const data = {
                email: email,
                password: password,
            }
            const response = await axios.post<any>(`${cansa[1]}/api/user/login/e4611a028c71342a5b083d2cbf59c494`, data, { withCredentials: true })
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: UserActionType.LOGIN,
                    payload: response.data.status
                })
            }
        } catch (error) {
            dispatch({
                type: UserActionType.ON_LOGIN_ERROR,
                payload: error
            })
        }

    }
}

export const logout = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/logout`)
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                let status = 'success'
                if (response.data.status == 'success') {
                    status = 'fail';
                }
                // save our location in local storage
                dispatch({
                    type: UserActionType.LOGOUT,
                    payload: status
                })
            }
        } catch (error) {
            dispatch({
                type: UserActionType.ON_LOGIN_ERROR,
                payload: error
            })
        }

    }
}
