import { Dispatch } from "redux";
import { CategoryModel } from "../models";
import  axios  from 'axios';
import { CategoryActionType } from "../action-types";
import {cansa} from "../../consts/Selector";

export interface GetCategory{
    readonly type: CategoryActionType.GET_ALL_CATEGORY,
    payload?: [CategoryModel]
}

export interface CategoryErrorAction{
    readonly type: CategoryActionType.ON_CATEGORY_ERROR,
    payload: any
}

export type CategoryActions = GetCategory | CategoryErrorAction;

export const getCategory = () => {
    return async ( dispatch: Dispatch<CategoryActions>) => {
        try {
            const response = await axios.get<any>(`${cansa[1]}/api/category/all/0/e4611a028c71342a5b083d2cbf59c494`)
            if(!response){
                dispatch({
                    type: CategoryActionType.ON_CATEGORY_ERROR,
                    payload: 'Product list error'
                })
            }else{
                // save our location in local storage
                dispatch({
                    type: CategoryActionType.GET_ALL_CATEGORY,
                    payload: response.data.data
                })
            }

        } catch (error) {
            dispatch({
                type: CategoryActionType.ON_CATEGORY_ERROR,
                payload: error
            })
        }

    }
}
