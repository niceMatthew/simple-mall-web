import { Lesson } from './';
//购物车的一项的类型
export interface CartItem {
    lesson: Lesson;
    count: number;
    checked: boolean;
}
// 购物车的类型
export type CartState = CartItem[];
