
export interface Lesson {
    id: string;
    order: number;
    title: string;//标题
    video: string;//视频地址
    poster: string;//海报地址
    url: string;//url地址
    price: number;//价格
    category: string;//分类
}

export interface LessonData {
    success: boolean,
    data: {
        hasMore: boolean,//后面是否还有更多
        list: Lesson[]//当页的数据
    }
}

export interface GetLessonData {
    success: boolean,
    data: Lesson
}