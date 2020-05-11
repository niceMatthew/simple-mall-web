import React, { PropsWithChildren, useEffect, forwardRef, useState } from 'react';
import './index.less';
import { Lessons, Lesson } from '@/typings';
import { Icon, Card, Button, Alert, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
type Props = PropsWithChildren<{
    lessons: Lessons,
    getLessons: () => void;
    container: any;
}>

function LessonList(props: Props, lessonListRef: any) {

    const [start, setStart] = useState(0);
    let rootFontSize = parseFloat(document.documentElement.style.fontSize);
    lessonListRef.current = props.lessons.list;

    useEffect(() => {
        if (props.lessons.list.length == 0) {
            props.getLessons();
        }
        props.container.current.addEventListener('scroll', () => {
            if (props.container.current) {//说明div已经 homeContainer 已经有了
                let scrollTop = props.container.current.scrollTop;
                //轮播图的高度+h2全部课程的高度
                //37.5*4.2=157.5px  160px+50px;
                if( (scrollTop > (4.266667 + 1.3333) * rootFontSize) ) {
                    let start = Math.floor((scrollTop - (4.266667 + 1.3333) * rootFontSize) / (8.66667 * rootFontSize))
                        if(lessonListRef.current.length - 2 >= start){
                            setStart(start);
                        }
                    
                }
            }
        });
        
    }, []);
    return (
        <section className="lesson-list">
            <h2><Icon type="menu" />全部</h2>
            <Skeleton loading={props.lessons.loading && props.lessons.list.length == 0} active paragraph={{ rows: 8 }}>
                <div style={{ height: `${8.66667 * rootFontSize * start}px` }}></div>
                {
                    props.lessons.list.slice(start, start + 3).map((item: Lesson, index: number) => (
                        <Link key={item.id} to={{ pathname: `/detail/${item.id}`, state: item }}>
                            <Card
                                hoverable={true}
                                style={{ width: '100%' }}
                                cover={<img src={item.url} />}
                            >
                                <Card.Meta title={item.title} description={`价格:¥${item.price}元`} />
                            </Card>
                        </Link>
                    ))
                }
                <div style={{ height: `${8.66667 * rootFontSize * (props.lessons.list.length - start - 2)}px` }}>{props.lessons.list.length } - {start}</div>
            </Skeleton>

            {
                props.lessons.hasMore ? <Button
                    onClick={props.getLessons}
                    loading={props.lessons.loading}
                    type="primary"
                    block >{props.lessons.loading ? '' : '加载更多'}</Button> : <Alert style={{ textAlign: 'center' }} message="到底了" type="warning" />
            }

        </section >
    )
}
export default forwardRef(LessonList);

