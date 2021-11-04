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
    readonly type: UserActionType.GET_UER_INFO,
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

export interface LoginFacebook {
    readonly type: UserActionType.LOGIN_FACEBOOK,
    payload?: string
}
export interface Register {
    readonly type: UserActionType.REGISTER,
    payload?: string
}

export interface ForgottPassword {
    readonly type: UserActionType.FORGOTT_PASSWORD,
    payload?: string
}

export interface ForgottPasswordOTP {
    readonly type: UserActionType.FORGOTT_PASSWORD_OTP,
    payload?: string
}

export interface ForgottPasswordCenter {
    readonly type: UserActionType.FORGOTT_PASSWORD_CENTER,
    payload?: string
}


export type UserActions = CheckLogin | UserErrorAction | GetUserInfor | Login | Logout | LoginFacebook | Register | ForgottPassword | ForgottPasswordOTP | ForgottPasswordCenter;

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
                    type: UserActionType.GET_UER_INFO,
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
                if(response.data.status == 'success') {
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

export const LoginFacebook = (email: string, token: string, username: string, fullname: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const data = {
                user_permission: '1',
                tocken: token,
                user_email: email,
                user_name: username,
                full_name: fullname
            }
            const response = await axios.post<any>(`${cansa[1]}/api/user/login/facebook/e4611a028c71342a5b083d2cbf59c494`, data, { withCredentials: true })
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                if (response.data.status === "Faild" || response.data.status === "") {
                    alert("Tài khoản hoặc mật khẩu không đúng!")
                }
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

export const register = (email: string, password: string, name_full: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/create/1/${name_full}/${password}/${email}/e4611a028c71342a5b083d2cbf59c494`)
            alert(response.data.message)
            console.log(response)
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                if (response.data.status === "Faild" || response.data.status === "") {
                    alert("Tài khoản hoặc mật khẩu không đúng!")
                }
                // save our location in local storage
                dispatch({
                    type: UserActionType.REGISTER,
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

export const ForgottPassword = (email: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/forgot/password/${email}`)
            alert(response.data.message)
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: UserActionType.FORGOTT_PASSWORD,
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

export const ForgottPasswordOTP = (email: string, OTP: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/forgot/password/checkPin/${email}/${OTP}`)
            alert(response.data.message)
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: UserActionType.FORGOTT_PASSWORD_OTP,
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

export const ForgottPasswordCenter = (email: string, password: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/user/forgot/password/center/${email}/${password}`)
            alert(response.data.message)
            if (!response) {
                dispatch({
                    type: UserActionType.ON_LOGIN_ERROR,
                    payload: 'Product list error'
                })
            } else {
                // save our location in local storage
                dispatch({
                    type: UserActionType.FORGOTT_PASSWORD_CENTER,
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

