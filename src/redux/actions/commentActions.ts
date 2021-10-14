import { Dispatch } from "redux";
import { CommentModel } from "../models";
import  axios  from 'axios';
import {  CommentActionType } from "../action-types";
import {cansa} from "../../consts/Selector";

export interface GetComment{
    readonly type: CommentActionType.GET_ALL_COMMENT,
    payload?: [CommentModel]
}

export interface CommentErrorAction{
    readonly type: CommentActionType.ON_COMMENT_ERROR,
    payload: any
}
export interface AddCommentAction{
    readonly type: CommentActionType.ADD_COMMENT,
    payload: any
}

export type CommentActions = GetComment | CommentErrorAction | AddCommentAction;

export const getComments = (product_id: number) => {
    return async ( dispatch: Dispatch<CommentActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/comment/all/${product_id}/e4611a028c71342a5b083d2cbf59c494`)
            if(!response){
                dispatch({
                    type: CommentActionType.ON_COMMENT_ERROR,
                    payload: 'Product list error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: CommentActionType.GET_ALL_COMMENT,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: CommentActionType.ON_COMMENT_ERROR,
                payload: error
            })
        }

    }
}

export const addComment = (product_id: number,user_id:number,comment_content:string,comment_rating:number) => {
    return async ( dispatch: Dispatch<CommentActions>) => {
        const data = {
            user_id: user_id,
            comment_content: comment_content,
            product_id: product_id,
            comment_rating: comment_rating,
        }
        try {
            const response = await axios.post<any>(`${cansa[1]}/api/comment/insert/e4611a028c71342a5b083d2cbf59c494`,data)
            if(!response){
                dispatch({
                    type: CommentActionType.ON_COMMENT_ERROR,
                    payload: 'Product list error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: CommentActionType.ADD_COMMENT,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: CommentActionType.ON_COMMENT_ERROR,
                payload: error
            })
        }

    }
}
