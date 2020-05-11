import { AnyAction } from 'redux';
import { HomeState } from '@/typings';
import * as actionTypes from '@/store/action-types';
const initialState: HomeState = {
    currentCategory: 'all',
    sliders: [],
    lessons: {
        loading: false,
        list: [],
        hasMore: true,
        offset: 0,
        limit: 5 //限定每次拉的条数
    }
}
export default function (state: HomeState = initialState, action: AnyAction): HomeState {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CATEGORY:
            return { ...state, currentCategory: action.payload };
        case actionTypes.GET_SLIDERS:
            if (action.error) {// action有了error属性，那说明promise失败了
                return state;
            } else {
                return { ...state, sliders: action.payload.data };
            }
        case actionTypes.SET_LESSONS_LOADING:
            state.lessons.loading = action.payload;
            return state;
        case actionTypes.SET_LESSONS:
            
            return Object.assign({}, state, {
                lessons: {
                    loading: false,
                    list: [...state.lessons.list, ...action.payload.list],
                    hasMore: action.payload.hasMore,
                    offset: state.lessons.offset + action.payload.list.length
                }
            })
        case actionTypes.REFRESH_LESSONS:
            return Object.assign({}, state, {
                lessons: {
                    loading: false,
                    list: [...state.lessons.list, ...action.payload.list],
                    hasMore: action.payload.hasMore,
                    offset: state.lessons.offset + action.payload.list.length
                }
            })
        default:
            return state;
    }
}