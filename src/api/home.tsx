import request from './index';
import { SliderData } from '@/typings';
export function getSliders() {
    return request.get<SliderData, SliderData>('/slider/list');
}

export function getLessons<T>(
    category: string = 'all',
    offset: number,
    limit: number
) {
    return request.get<T, T>(
        `/lesson/list?category=${category}&offset=${offset}&limit=${limit}`);
}

export function getLesson<T>(id: string) {
    return request.get<T, T>(`/lesson/${id}`);
}