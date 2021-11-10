import { Chat } from "../action-types";
import { ChatAction } from "../actions/chatActions";
import { ChatStage } from "../models";


const initialState: ChatStage = {
    isChat: undefined,
}

const chatReducer = (state: ChatStage = initialState, action: ChatAction) => {
    switch (action.type) {
        case Chat.CHAT_IS_UPDATE:
            return {
                ...state,
                isChat: action.payload
            }
        default:
            return state;

    }
}

export default chatReducer;