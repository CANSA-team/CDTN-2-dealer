import { combineReducers } from 'redux';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import sliderReducer from './sliderReducer';
import commentReducer from './commentReducer';
import shopReducer from './shopReducer';
import accessReducer from './accessReducer';
import userReducer from './userReducer';
import oderReducer from './oderReducer';
import complaintReducer from './complaintReducer';
import imageReducer from './imageReducer';

const rootReducer = combineReducers({
   productReducer,
   categoryReducer,
   sliderReducer,
   commentReducer,
   shopReducer,
   accessReducer,
   userReducer,
   oderReducer,
   complaintReducer,
   imageReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>