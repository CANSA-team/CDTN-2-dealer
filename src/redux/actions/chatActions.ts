import { Dispatch } from "redux";
import { Chat } from "../action-types";

export interface ChatAction {
    readonly type: Chat.CHAT_IS_UPDATE,
    payload?: boolean
}


export type chatActions = ChatAction;

export const chat = (isUpdate: boolean) => {
    return (dispatch: Dispatch<ChatAction>) => {
        dispatch({
            type: Chat.CHAT_IS_UPDATE,
            payload: isUpdate
        })

    }
}
