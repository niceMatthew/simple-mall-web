import { RouterState } from 'connected-react-router';
import { HomeState, CartState } from './';


export interface MineState {

}

export interface User {
    id?: string;
    username: string;
    email: string;
    avatar: string;
}

//先构建RootState根状态 合并后的状态，就是根状态
export interface CombinedState {
    home: HomeState;
    mine: MineState;
    profile: ProfileState;
    router: RouterState,
    cart: CartState
}

export interface ProfileState {
    loginState: LOGIN_TYPES;//当前的登录状态
    user: User | null;//当前的登录用户
    error: string | null //当前错误处理
}

export enum LOGIN_TYPES {
    UN_VALIDATE = 'UN_VALIDATE',//尚未验证登录状态
    LOGINED = 'LOGINED', //已经登录
    UN_LOGINED = 'UN_LOGINED'//的确没有登录
}