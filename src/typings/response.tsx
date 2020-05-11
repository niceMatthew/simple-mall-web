
import { User } from './state';
//注册接口返回的响应体的类型
export interface RegisterData {
    success: boolean,
    data: User
}

export interface LoginData {
    success: boolean,
    data: string
}