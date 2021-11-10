import { combineReducers } from 'redux';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import commentReducer from './commentReducer';
import shopReducer from './shopReducer';
import accessReducer from './accessReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
   productReducer,
   categoryReducer,
   commentReducer,
   shopReducer,
   accessReducer,
   userReducer,
   chatReducer
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>