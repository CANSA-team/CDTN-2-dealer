import { Dispatch } from "redux";
import { SliderModel } from "../models";
import  axios  from 'axios';
import {  SliderActionType } from "../action-types";
import {cansa} from "../../consts/Selector";

export interface GetSlider{
    readonly type: SliderActionType.GET_ALL_SLIDER,
    payload?: [SliderModel]
}

export interface SliderErrorAction{
    readonly type: SliderActionType.ON_SLIDER_ERROR,
    payload: any
}

export type SliderActions = GetSlider | SliderErrorAction;

export const getSlider = () => {
    return async ( dispatch: Dispatch<SliderActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[0]}/api/slider/all/e4611a028c71342a5b083d2cbf59c494`)
            if(!response){
                dispatch({
                    type: SliderActionType.ON_SLIDER_ERROR,
                    payload: 'Product list error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: SliderActionType.GET_ALL_SLIDER,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: SliderActionType.ON_SLIDER_ERROR,
                payload: error
            })
        }

    }
}
