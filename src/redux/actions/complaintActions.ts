import { Dispatch } from "redux";
import { CommentModel } from "../models";
import  axios  from 'axios';
import {  CommentActionType, CommplaintActionType } from "../action-types";
import {cansa} from "../../consts/Selector";


export interface ComplaintErrorAction{
    readonly type: CommplaintActionType.ON_COMPLAINT_ERROR,
    payload: any
}
export interface AddComplaintAction{
    readonly type: CommplaintActionType.ADD_COMPLAINT,
    payload: any
}

export type ComplaintActions = ComplaintErrorAction | AddComplaintAction;

export const addComplaint = (product_id: number,complaint_content:string) => {
    return async ( dispatch: Dispatch<ComplaintActions>) => {
        const data = {
            complaint_content: complaint_content,
            product_id: product_id,
        }
        try {
            const response = await axios.post<any>(`${cansa[1]}/api/complaint/insert/e4611a028c71342a5b083d2cbf59c494`,data)
            if(!response){
                dispatch({
                    type: CommplaintActionType.ON_COMPLAINT_ERROR,
                    payload: 'Product list error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: CommplaintActionType.ADD_COMPLAINT,
                    payload: response.data.status,
                })
            }

        } catch (error) {
            dispatch({
                type: CommplaintActionType.ON_COMPLAINT_ERROR,
                payload: error
            })
        }

    }
}
