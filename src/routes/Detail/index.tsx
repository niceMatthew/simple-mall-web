import React, { useState, useEffect, PropsWithChildren, useCallback } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { StaticContext } from 'react-router';
import Nav from '@/components/Nav';
import { Lesson } from '@/typings';
import { connect } from 'react-redux';
import { Card, Button } from 'antd';
import { CombinedState, GetLessonData } from '@/typings';
import actions from '@/store/actions/cart';
import { getLesson } from '@/api/home';
import './index.less';
interface Params {
    id: string
}
type Props = PropsWithChildren<
    RouteComponentProps<Params, StaticContext, Lesson> & typeof actions
>;

function Detail(props: Props) {
    let [lesson, setLesson] = useState<Lesson>({} as Lesson);
    useEffect(() => {
        (async function () {
            let lesson = props.location.state;
            //如果是从课程列表页跳过来的，是有state,如果是刷新的，就没有state
            if (!lesson) {//如果没有传lesson过来的话，我需要亲自调接口去课程详情,参数就是课程ID
                let result: GetLessonData = await getLesson<GetLessonData>(props.match.params.id);
                if (result.success) {
                    lesson = result.data;
                }
            }
            setLesson(lesson);
        })();

    }, []);
    const addCartItem = useCallback((lesson: Lesson) => {
        let cover: HTMLDivElement = document.querySelector('.ant-card-cover');
        let coverWidth = cover.offsetWidth;//购物车图标宽度
        let coverHeight = cover.offsetHeight;//购物车图标高度
        let coverLeft = cover.getBoundingClientRect().left;//距离左边的距离 
        let coverTop = cover.getBoundingClientRect().top;// 顶部距离


        let cart: HTMLAreaElement = document.querySelector('a .anticon.anticon-shopping-cart');
        let cartWidth = cart.offsetWidth;//购物车图标宽度
        let cartHeight = cart.offsetHeight;//购物车图标高度
        let cartRight = cart.getBoundingClientRect().right;//右连载距离左边的距离 
        let cartBottom = cart.getBoundingClientRect().bottom;// 底部距离顶部距离
        let clonedCover: HTMLDivElement = cover.cloneNode(true) as HTMLDivElement;

        clonedCover.style.cssText = (
            `
              z-index:1000;
              opacity:.8;
              position:fixed;
              width:${coverWidth}px;
              height:${coverHeight}px;
              top:${coverTop}px;
              left:${coverLeft}px;
              transition: all 2s ease-in-out;
            `
        )
        document.body.appendChild(clonedCover);
        setTimeout(() => {
            clonedCover.style.left = `${cartRight - cartWidth / 2}px`;
            clonedCover.style.top = `${cartBottom - cartHeight / 2}px`;
            clonedCover.style.width = '0';
            clonedCover.style.height = '0';
            clonedCover.style.opacity = '.5';
        }, 0);
        setTimeout(() => {
           clonedCover.parentNode.removeChild(clonedCover);
        }, 2000);
        props.addCartItem(lesson);
    }, [])
    return (
        <>
            <Nav history={props.history}>课程详情</Nav>
            <Card
                hoverable
                style={{ width: '100%' }}
                cover={<img src={lesson.url} />}
            >
                <Card.Meta
                    title={lesson.title}
                    description={
                        <>
                            <p>{`价格:¥${lesson.price}元`}</p>
                            <p>
                                <Button
                                    className="add-cart"
                                    icon="shopping-cart"
                                    onClick={() => addCartItem(lesson)}
                                >加入购物车</Button>
                            </p>
                        </>
                    }
                />
            </Card>
        </>
    )
}
export default connect(
    (state: CombinedState): CombinedState => state,
    actions
)(Detail);