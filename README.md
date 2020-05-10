# redux-bridge
Redux与组件之间的桥梁，声明式获取state，使用简单，通过useSelector获取store中你需要的一个或者一组state，通过controlUpdate回调方法，实现shouldComponentUpdate内控渲染。

[![npm package](https://img.shields.io/npm/v/redux-bridge.svg?style=flat-square)](https://www.npmjs.org/package/redux-bridge)
## Installation
```sh
npm install redux-bridge  --save
// or
yarn add redux-brige
```
## usage
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {Provider,useSelector,useDispatch} from 'redux-bridge';


// 1️⃣ Create the store
const reducer=(state,action)=> {
    switch (action.type) {
        case 'add':
            return {
                count: ++state.count
            }
        case 'subtract':
            return {
                count: --state.count
            }
        default:
            return state
    }

}
const store = createStore(reducer,{count:0});



function Counter() {
    const {count} = useSelector(['count']);
    const dispatch = useDispatch()
    return (
        <div>
            <span>{count}</span>
            <button type="button" onClick={()=>dispatch({type:'add'})}>+</button>
            <button type="button" onClick={()=>dispatch({type:'subtract'})}>-</button>
        </div>
    );
}

function DoubleCounter() {
    const {count} = useSelector(['count'],(prevState,nextState)=>{
        return nextState.count%2===0
    });
    return (
        <div>
            <span>{count}</span>
        </div>
    );
}



// 4️⃣ Wrap your components with Provider
function App() {
    return (
        <Provider store={store}>
            <Counter />
            <DoubleCounter />
        </Provider>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

```
## Api
### Provider
`Provider(props: { children,store,context })`
将 store 和 React 应用进行绑定。

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'redux-bridge';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  rootEl
); 
```
|属性|类型|说明|
|--:|--:|--:|
|store|Store|通过redux createStore生成的store供应用消费|
|context|Context|react Context，如果使用多store的情况，一般为三方库使用，需要指定自己的Context，以防与其他应用冲突|

### useSelector
`useSelector<T>(selector: string[], controlUpdate?: ControlUpdate<T>, stateDeep?: string)`

状态选择器，通过声明好的state 属性名数组，获取一组states

##### selector 声明状态选择器
```
//store中的状态树
{
a:1,
b:2,
c:3,
d:{
  e:5,
  f:6,
  g:{h:7}
  }
}
//获取想要的状态
const{a,b}= useSelector(['a','b'])
```
通过设置 selector 从store中获取你想要的状态
##### controlUpdate 控制更新类似shouldComponentUpdate
```
const{a,b}= useSelector(['a','b'],(preState,nextState)=>{
return preState.a!==nextState.a||preState.b!==nextState.b
})
```
如果返回`true`更新组件`false`不更新组件

##### stateDeep 状态深度
```
const{e,f}= useSelector(['e','f'],undefined，'d')
const {h}=useSelector(['h'],undefined,'d.g')
```
### useDispatch 获取redux dispatch
```jsx
const dispatch=useDispatch()
```

