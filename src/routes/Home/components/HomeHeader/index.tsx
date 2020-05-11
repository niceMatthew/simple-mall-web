import React, { useState, CSSProperties } from 'react';
import './index.less';
import {Icon} from 'antd';
import logo from '@/assets/images/logo.png'
import { Transition } from 'react-transition-group';
interface Props {
    currentCategory: string;//当前选中的分类 此数据会放在redux仓库中
    setCurrentCategory: (currentCategory: string) => any;// 改变仓库中的分类
    refreshLessons: Function
}

const duration = 1000;
 
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}
interface TransitionStyles {
    entering: CSSProperties;
    entered: CSSProperties;
    exiting: CSSProperties;
    exited: CSSProperties;
}
const transitionStyles: TransitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

function HomeHeader(props: Props) {
    let [isMenuVisible, setIsMenuVisible] = useState(false);
    const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
        let target: HTMLUListElement = event.target as HTMLUListElement;
        let category = target.dataset.category;
        props.setCurrentCategory(category);
        props.refreshLessons();
        setIsMenuVisible(false);
    }
    return <header className="home-header">
        <div className="logo-header">
            <div className="img" />
            <Icon type="bars" onClick={() => setIsMenuVisible(!isMenuVisible)} />
        </div>
        <Transition in={isMenuVisible} timeout={duration}>
                {
                    (state: keyof TransitionStyles) => (
                        <ul
                            className="category"
                            onClick={setCurrentCategory}
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                        >
                        <li data-category="all">全部</li>
                        <li data-category="react">严选</li>
                        <li data-category="vue">网易</li>
                    </ul>)
                }
        </Transition>
    </header>
}

export default HomeHeader;