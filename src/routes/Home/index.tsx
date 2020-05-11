import React, { PropsWithChildren, useRef, useEffect } from 'react';
import './index.less';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './components/HomeHeader';
import { CombinedState, HomeState } from '@/typings';
import mapDispatchToProps from '@/store/actions/home';
import HomeSliders from './components/HomeSliders';
import LessonList from './components/LessonList';
import { loadMore, downRefresh } from '@/utils';
import { Spin } from 'antd';
type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>;
function Home(props: Props) {
    let homeContainer = useRef<HTMLDivElement>(null);//{current:null}=> {current:HTMLDivElement}
    const lessonListRef = useRef(null);
    let lessonList = {};
    useEffect(() => {
        loadMore(homeContainer.current, props.getLessons);
        downRefresh(homeContainer.current, props.refreshLessons);
        if (props.lessons.list.length > 0) {
            homeContainer.current.scrollTop = parseFloat(localStorage.getItem('homeScrollTop'));
        }
        return () => {
            localStorage.setItem('homeScrollTop', homeContainer.current.scrollTop + '');
        }
    }, []);
    return (
        <>
            <HomeHeader
                currentCategory={props.currentCategory}
                setCurrentCategory={props.setCurrentCategory}
                refreshLessons={props.refreshLessons}
            />
            <div className="refresh-loading">
                <Spin size="large" />
            </div>
            <div className="home-container" ref={homeContainer}>
                <HomeSliders
                    sliders={props.sliders}
                    getSliders={props.getSliders}
                />
                <LessonList
                    ref={lessonListRef}
                    container={homeContainer}
                    lessons={props.lessons}
                    getLessons={props.getLessons} />
            </div>
        </>
    )
}
const mapStateToProps = (state: CombinedState): HomeState => state.home;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

