import {SliderActionType } from "../action-types";
import { SliderActions } from "../actions/sliderActions";
import { SliderState, SliderModel } from "../models";


const initialState: SliderState = {
    slider: undefined,
    error: undefined
}

const sliderReducer = (state: SliderState = initialState, action: SliderActions) => {
    switch (action.type) {
        case SliderActionType.GET_ALL_SLIDER:
            return {
                ...state,
                slider: action.payload
            }
        case SliderActionType.ON_SLIDER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;

    }
}

export default sliderReducer;