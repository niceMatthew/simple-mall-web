`本文将最近学习的散乱的知识点作一次梳理，描述的一个简单的商城页面，这篇主要讲前端方面所需要注意的点和收获，详细代码详见github:https://github.com/niceMatthew/simple-mall-web ，用到的技术栈主要为webpack,react,ts,react-redux`
### 网站结构
主要页面
- 购物车页面
- 登录注册页面
- 个人中心页面
- 首页

网站截图
![页面截图](https://user-gold-cdn.xitu.io/2020/5/11/17202bdd5f90eb1a?w=638&h=1136&f=png&s=575357)

### 环境配置
```
cnpm i react react-dom @types/react @types/react-dom react-router-dom @types/react-router-dom react-transition-group @types/react-transition-group react-swipe @types/react-swipe antd qs @types/qs  -S
cnpm i webpack webpack-cli webpack-dev-server html-webpack-plugin -D
cnpm i typescript babel-loader source-map-loader style-loader css-loader less-loader less url-loader file-loader autoprefixer px2rem-loader postcss-loader lib-flexible -D
cnpm i redux react-redux @types/react-redux redux-thunk  redux-logger @types/redux-logger redux-promise @types/redux-promise immer redux-immer -S
cnpm i connected-react-router -S
cnpm i express express-session body-parser cors axios -S
```
项目使用babel-loader而非ts-loader解析ts文件

ts ： tsc --init 生成tscofing.json配置文件
```
{
  "compilerOptions": {
    "moduleResolution": "node",
    "outDir": "./dist", // 输出目录 tsc
    "sourceMap": true, // 是否要生成sourceMap文件
    "noImplicitAny": true, // 是否不允许出现隐含的any类型
    "module": "es6", // 模块规范
    "target": "ESNext", // 编译的目标是es5
    "jsx": "react", // 如何编译JSX语法 
    "esModuleInterop":true, // 允许common.js模块和es module进行转换
    "baseUrl": ".", // 查找非相对路径的URL的其实路径
    "paths" : {   // 配置@路径
      "@/*": [
        "src/*"
      ]
    }
  },
  "include": [
    "./src/**/*" // 只编译src目录下的ts文件
  ]
}
```
ts图片引用· image.d.ts
```
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
```
webpack中px转rem
```
{
    loader: 'px2rem-loader',
    options: {
        remUnit: 75,
        remPrecesion: 8
    }
}
-------------------------------------
let docEle = document.documentElement;
        function setRemUnit() {
            docEle.style.fontSize = docEle.clientWidth / 10 + 'px';
}
setRemUnit();
window.addEventListener('resize', setRemUnit);
```     

### router配置
history注入
```
import { createHashHistory }  from 'history';
let history = createHashHistory();
export default history;

// --------
import { ConnectedRouter } from 'connected-react-router';
import history from '@/history';
...
<ConnectedRouter history={history}>
    <ConfigProvider locale={zh_CN}>
        <main className="main-container">
            <Switch>
            </Switch>
        </main>
        <Tabs />
    </ConfigProvider>
</ConnectedRouter>
```
### react-redux配置
使用redux-promise,redux-thunk以及redux-logger中间键
```
let store = applyMiddleware(routerMiddleware(history), promise, thunk, logger)(createStore)(rootReducer);
```
### 无限下拉加载（实践中采用了相对占性能的scroll加载，实际上可以使用IntersectionObserver优化）
展示商品页时始终采用三个div展示内容+上下两个div占位模拟滚动条
```
props.container.current.addEventListener('scroll', () => {
            if (props.container.current) {//说明div已经 homeContainer 已经有了
                let scrollTop = props.container.current.scrollTop;
                //轮出去轮播图高度
                if( (scrollTop > (4.266667 + 1.3333) * rootFontSize) ) {
                    let start = Math.floor((scrollTop - (4.266667 + 1.3333) * rootFontSize) / (8.66667 * rootFontSize))
                        if(lessonListRef.current.length - 2 >= start){
                            setStart(start);
                        }
                    
                }
            }
        });
```

![](https://user-gold-cdn.xitu.io/2020/5/11/17202ee53277b228?w=610&h=603&f=png&s=212547)

debounce防抖优化scroll
```
export function debounce(fn: Function, wait: number) {
    let timeout: number = null;
    return function () {
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}
export function loadMore(element: HTMLDivElement, callback: Function) {
    function _loadMore() {
        let containerHeight = element.clientHeight;//容器的高度
        let scrollTop = element.scrollTop;//向上卷去的高度
        let scrollHeight = element.scrollHeight;//内容的高度
        if (containerHeight + scrollTop + 20  >= scrollHeight) {
            callback();
        }
    }
    element.addEventListener('scroll', debounce(_loadMore, 300));
}
```

