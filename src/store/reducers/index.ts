import { combineReducers } from 'redux';
import login from './login';

const rootReducer = combineReducers({ login });

export default (state: any, action: any) => rootReducer(state, action);
