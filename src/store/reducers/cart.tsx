import { CartState, CartItem } from "@/typings/cart";
import * as actionTypes from '@/store/action-types';
import { AnyAction } from "redux";

let initialState: CartState = [];
export default function (state: CartState = initialState, action: AnyAction): CartState {
    
    switch (action.type) {
        //向购物车里添加一个条目，如果已经有这个商品了，数量加1，如果没有则加一个条目
        case actionTypes.ADD_CART_ITEM://{type:ADD_CART_ITEM,payload:lesson}
            var newState = Object.assign([], state)
            let oldLesson = newState.find(item => item.lesson.id === action.payload.id);
            if (oldLesson) {
                oldLesson.count += 1;
            } else {
                newState.push({ count: 1, checked: false, lesson: action.payload });
            }
            return newState;
        case actionTypes.REMOVE_CART_ITEM://{type:REMOVE_CART_ITEM,payload:id}
            var newState = Object.assign([], state)
            let removeIndex = newState.findIndex(item => item.lesson.id === action.payload);
            if (removeIndex != -1) {
                newState.splice(removeIndex, 1);
            }
            return newState;
        case actionTypes.CLEAR_CART_ITEM://清空购物车
            state.length = 0;
            return state;
        case actionTypes.CHANGE_CART_ITEM_COUNT://{type:CHANGE_CART_ITEM_COUNT,payload:{id,count}}
            var newState = Object.assign([], state)
            let changeIndex = newState.findIndex(item => item.lesson.id === action.payload.id);
            if (changeIndex != -1) {
                newState[changeIndex].count = action.payload.count;
            }
            return newState;
        //{type:CHANGE_CHECKED_CART_ITEMS,payload:[1,2,3]}
        case actionTypes.CHANGE_CHECKED_CART_ITEMS:
            let checkedIds = action.payload;
            return state.map((item: CartItem) => {
                if (checkedIds.includes(item.lesson.id)) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
                return item;
            });
        case actionTypes.SETTLE:
            return state.filter((item: CartItem) => !item.checked);
        default:
            return state;
    }
}