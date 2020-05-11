import {combineReducers, ReducersMapObject, AnyAction, Reducer} from 'redux'
import { connectRouter,RouterState } from 'connected-react-router';
import home  from './home';
import mine  from './mine';
import cart from './cart';
import profile  from './profile';
import history from '@/history';
import { CombinedState } from '@/typings/state';

let reducers:ReducersMapObject<CombinedState, AnyAction> = {
    home,
    mine,
    cart,
    profile, 
    router: connectRouter(history)
}
const rootReducer: Reducer<CombinedState, AnyAction> = combineReducers<CombinedState>(reducers)

export default rootReducer;