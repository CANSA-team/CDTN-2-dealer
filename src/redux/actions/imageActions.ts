import { Dispatch } from "redux";
import { CommentModel, ShopModel } from "../models";
import  axios  from 'axios';
import {  AccessActionType, CommentActionType, ImageActionType, ShopActionType } from "../action-types";
import {cansa} from "../../consts/Selector";

export interface GetImage{
    readonly type: ImageActionType.GET_IMAGE,
    payload?: any
}

export interface ImageErrorAction{
    readonly type: ImageActionType.ON_IMAGE_ERROR,
    payload: any
}

export type ImageActions = GetImage | ImageErrorAction;

export const getImage = (img_id:number) => {
    return async ( dispatch: Dispatch<ImageActions>) => {
        try {
            const response = await axios.get(`${cansa[0]}/api/image/get/${img_id}/e4611a028c71342a5b083d2cbf59c494`);
            if(!response){
                dispatch({
                    type: ImageActionType.ON_IMAGE_ERROR,
                    payload: 'Product list error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: ImageActionType.GET_IMAGE,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: ImageActionType.ON_IMAGE_ERROR,
                payload: error
            })
        }

    }
}
