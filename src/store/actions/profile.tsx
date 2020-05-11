import * as actionTypes from '@/store/action-types';
import { validate } from '@/api/profile';
import { push } from 'connected-react-router';
import { RegisterPayload, LoginPayload } from '@/typings/profile';
import { message } from 'antd';
import { register, login } from '@/api/profile';
import { RegisterData, LoginData } from '@/typings';

export default {
    validate() {
        return {
            type: actionTypes.VALIDATE,
            payload: validate()
        }
    },
    logout() {
        return function (dispatch: any) {
            sessionStorage.removeItem('access_token');
            dispatch(push('/login'));
        }
    },
    register(values: RegisterPayload) {
        return function (dispatch: any, getState: any) {
            (async function () {
                try {
                    //AxiosResponse data才是响应体
                    let result: RegisterData = await register<RegisterData>(values);
                    if (result.success) {
                        dispatch(push('/login'));
                    } else {
                        message.error('注册失败');
                    }
                } catch (error) {
                    console.log(error)
                    message.error(error.message);
                }
            })();
        }
    },
    login(values: LoginPayload) {
        return function (dispatch: any, getState: any) {
            (async function () {
                try {
                    //AxiosResponse data才是响应体
                    let result: LoginData = await login<LoginData>(values);
                    if (result.success) {
                        sessionStorage.setItem('access_token', result.data);
                        dispatch(push('/profile'));
                    } else {
                        message.error('登录失败');
                    }
                } catch (error) {
                    message.error('登录失败');
                }
            })();
        }
    },
    setAvatar(avatarUrl: string) {
        return {
            type: actionTypes.SET_AVATAR,
            payload: avatarUrl
        }
    }
}