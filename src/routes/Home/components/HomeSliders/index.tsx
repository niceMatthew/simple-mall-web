import React, { PropsWithChildren, useEffect } from 'react';
import './index.less';
import { Carousel } from 'antd';
import { Slider } from '@/typings';
type Props = PropsWithChildren<{
    sliders: Slider[],
    getSliders: () => void;
}>
function HomeSliders(props: Props) {
    useEffect(() => {
        if (props.sliders.length === 0) {
            let result = props.getSliders();
            console.log('HomeSliders', result);
        }
    }, []);
    return (
        <Carousel effect="scrollx" autoplay draggable={false} touchMove={false}>
            {
                props.sliders.map((item: Slider, index: number) => (
                    <div key={item.id}>
                        <img src={item.url} />
                    </div>
                ))
            }
        </Carousel>
    )
}
export default HomeSliders;

