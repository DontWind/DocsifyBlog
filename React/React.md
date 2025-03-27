# 1. JSX

```js
JSX使用小驼峰命名
例如：class->className； tabindex->tabIndex

JSX防止注入攻击
React DOM在渲染所有输入内容之前，会默认进行转义

JSX表示对象
Babel会把JSX转译成一个名为React.createElement()函数调用
React.createElement()会预先执行一些检查，以帮助编写无错代码
例如：
const element=(
	<h1 className="greeting">
    	Hello,world!
    </h1>
)
const element = React.createElement(
	'h1',
    {className:'greeting'},
    'Hello,world!'
)
```



# 2.元素渲染

元素是构成React应用的最小砖块

```
相对于浏览器的DOM元素，React元素是创建开销极小的普通对象

更新已渲染的元素：
	React元素是不可变对象，一旦被创建，便无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的UI
	更新UI唯一的方式是创建一个全新的元素，并将其传入ReactDOM.render()
	
局部更新：
	React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使DOM达到预期状态
```



# 3.组件

注意：组件名称必须以大写字母开头

```js
函数组件：
	function Welcome(props){
		return <h1>Hello,{props.name}</h1>
    }
	这是一个有效地React组件，接受唯一带有数据的“props”对象并返回一个React元素
```

```js
Class组件：
	class Welcome extends React.Component{
        render(){
            return <h1>Hello,{this.props.name}</h1>
        }
    }
```

```js
渲染组件：
	当React元素为用户自定义组件时，他会将JSX所接收的属性以及子组件转为props对象传递给组件
	function Welcome(props){
		return <h1>Hello,{props.name}</h1>
    }
	ReactDOM.render(
    	<Welcome name="Sara"/>,
        document.getElementById('root')
    )
    
过程：
	1.调用React.render()函数，并传入<Welcome name="sara"/>作为参数
	2.React调用该组件，并将{name:'Sara'}作为props传入
  3.该函数组件将<h1>hello,Sara</h1>元素作为返回值
	4.React DOM将DOM高效更新为返回的元素
```

# 4.State

State与props**类似**,但是State是**私有的**,并且完全受控于当前组件

```js
不可直接修改State,应该使用setState()方法

State的更新有可能是异步的
(因为出于性能的考虑,React可能会把多个setState()调用合并成一个调用)
解决方法,通过setState()接收函数,state,props作为函数的参数
this.setState((state,props)=>({
	counter:state.counter+props.increment
}))

数据是向下流动的
```

# 5.生命周期

1. 挂载/卸载

   ```
   constructor():完成了React数据的初始化,接受两个参数:props和context,想在函数内使用时,需使用super()传入这两个参数
   
   componentWillMount():代表组件已经经历了constructor()初始化数据后,但是还未渲染DOM时
   
   componentDidMount():组件第一次渲染完成,此时dom节点已经生成.
   
   componentWillUnmount():在此处完成组件的卸载和数据的销毁
   ```

2. 更新

   ```js
   componentwillReceiveProps(nextProps):
   	1.在接受父组件改变后的props需要重新渲染组件时用到的比较多
   	2.接受一个参数nextProps
   	3.通过对比nextProps和this.props,将nextProps的state作为当前组件的state,从而重新渲染组件
   	
   shouldComponentUpdate(nextProps,nextState)
   	1.主要用于性能优化
   	2.唯一用于控制组件重新渲染的生命周期，由于在React中，setState以后，state发生变化，组件会进入重新渲染的流程，在这里return false可以阻止组件的更新
   	3.当父组件重新渲染时，所有子组件都会重新渲染，可以在子组件的该生命周期中进行判断
   
   componentWillUpdate(nextProps,nextState)
   	在组件更新前，读取当前某个DOM元素的状态，并在componentDidUpdate中进行相应的处理
   	shouldComponentUpdate返回true以后,组件进入重新渲染的流程,进入此生命周期
   	
   componentDidUpdate(prevProps,prevState)
   	组件更新完毕。React只会在第一次初始化成功后进去componentDidMount,之后每次重新渲染都会进入此生命周期,可以获取到更新前的props和state.
   
   render()
   	此函数会插入jsx生成的dom结构,react会生成一份虚拟dom树,在此react会通过diff算法比较新旧DOM树,找到最小的有差异的DOM节点,并重新渲染.
   ```

   getDerivedStateFromProps **VS** componentWillReceiveProps

   ```
   在getDerivedStateFromProps中还禁止了组件访问this.props,强制让开发者去比较nextProps与prevState中的值，以确保当开发者用到getDerivedStateFromProps这个生命周期函数时，就是在根据当前的props来更新组件的state，而不是去做其他一些让组件自身状态变得更加不可预测的事情
   ```

   getSnapshotBeforeUpdate **VS** componentWillUpdate

   ```
   若react开启异步渲染模式后，无法保证在render阶段读取到的DOM元素状态并不一定和commit阶段相同，这就导致componentDidUpdate使用componentWillUpdate中读取到的DOM元素状态是不安全的，因为这时的值可能已经失效
   
   getSnapshotBeforeUpdate会在最终的render之前被调用，也就是此生命周期读取到的DOM元素状态是可以保证与componentDidUpdate一致。
   ```

# 5.5 组件的生命周期

- 挂载

  - constructor

    - 通过this.state赋值对象来初始化内部state
    - 为事件处理函数绑定实例

  - static getDerivedStateFromProps(props,state)

    目的：让组件在props变换时更新state

    在调用render方法之前调用，并且在初始挂载及后续更新时都会被调用。

    - 应返回一个对象更新state，返回null则不更新任何内容
    - 此方法无权访问组件实例

  - render 渲染函数

  - componentDidMount

    在组件挂载后立即调用

- 更新

  - static getDerivedStateFromProps()

    目的：让组件在props变换时更新state

    在调用render方法之前调用，并且在初始挂载及后续更新时都会被调用。

    - 应返回一个对象更新state，返回null则不更新任何内容
    - 此方法无权访问组件实例

  - shouldComponentUpdate()

    当props或state发生变化时，该方法会在渲染执行之前被调用，首次渲染或使用forceUpdate()时不会调用该方法。

    判断React组件的输出是否受当前state或props更改的影响。

    - 默认返回true，返回false则跳过更新。
    - 适合prevProps和nextProps，prevState和nextState的浅层比较。深层比较非常影响效率，且影响性能。

  - render()

  - getSnapshotBeforeUpdate()

    在最近一次渲染输出之前调用。

    使组件能在发生更改之前从DOM中捕获一些信息。

    此生命周期任何的返回值将作为参数传递给componentDidUpdate，故应返回snapshot的值

  - componentDidUpdate()

    更新之后会被立即调用。首次渲染不执行此方法。



# 6.事件处理

```
与传统html的差别：
	1.必须显示的使用preventDefault来阻止默认行为
```

```js
绑定事件
1. this.handleClick=this.handleClick.bind(this)
2. handleClick=()=>{console.log(this)}
3. onClick={()=>this.handleClick()}

第三种方法的问题在于每次渲染组件时都会创建不同的回调函数。大多数情况下，没有什么问题。但若将该回调函数作为prop传入子组件时，这些组件可能会进行额外的重新渲染
```

```html
事件传参

1.<button onClick={(e)=>this.deleteRow(id,e)}>Delete Row</button>}
1.<button onClick={this.deleteRow(this,id)}>Delete Row</button>}

在这两种情况下，React的事件对象e会被作为第二个参数传递，
	箭头函数：事件对象必须显示传递
	bind：事件对象以及更多的参数将会被隐式传递
```

# 7.key

```
key帮助React识别哪些元素改变，更加高效的更新虚拟dom，
如果使用下标作为key，当修改顺序时会修改当前的key，导致非受控组件的state可能相互篡改而导致无法预期的变动

key值在兄弟节点中唯一，并不需要全局唯一
```

# 8.React.lazy

```js
用于像渲染常规组件一样处理动态引入的组件

React.lazy()接受一个函数,这个函数需要动态调用import(). 它必须返回一个Promise,该Promise需要resolve一个defalut export的React组件

使用之前:
	import OtherComponent from './OtherComponent';
使用之后:
	const OtherComponent = React.lazy(()=>import('./OtherComponent'));
	此代码会在组件首次渲染时，自动导入包含OtherComponent组件的包
  	然后应在Suspense组件中渲染lazy组件，如此可以使用在等待加载lazy组件时显示加载动画
    import React,{Suspense} from 'react'
	const OtherComponent = React.lazy(()=>import('./OtherComponent'));
	function MyComponent(){
        return (
        	<div>
            	<Suspense fallback={<div>Loading...</div>}>
            		<OtherComponent/>
            	</Suspense>
            </div>
        )
    }
	fallback属性接受任何在组件加载过程中想展示的React元素。可以将Suspense组件置于懒加载组件之上的任何位置，也可以包裹多个懒加载组件
  
和路由使用可以达到路由切换效果
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

# 9.**错误边界**

错误边界是一种React组件，它可以捕获并打印发生在子组件树任何位置的JavaSctipt错误，并且渲染出备用UI。

错误边界在**渲染期间**、**生命周期方法**和**整个组件树的构造函数**中捕获错误，无法捕获自身的错误。无法渲染的错误信息会冒泡最近的上层错误边界

任何未被错误边界捕获的错误将会导致整个React组件树被卸载

无法捕获一下场景的错误：

		1. 事件处理
		2. 异步代码
		3. 服务端渲染
		4. 它自身抛出来的错误

**定义错误边界组件**

```react
如果一个class组件定义而来 static getDerivedStateFromError()或componentDidCatch() 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。

抛出错误后，可使用static getDerivedStateFromError()渲染备用UI，使用componentDidCatch() 打印错误信息

只有class组件才可以成为错误边界组件，可以冒泡，类似于JS中的catch{}的工作机制

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```



```html
用于模块加载失败，它会触发一个错误
import MyErrorBoundary from './MyErrorBoundary'
<MyErrorBoundary>
	...
</MyErrorBoundary>
```

# 10.Context

使用场景：

​	通用的场景包括管理当前的locale，theme或者一些缓存数据

```html
Context提供了一个无需为每层组件手动添加props，就能在组件树进行数据传递的方法。

1.通过React.createContext('light')创建一个context
const ThemeContext= React.createContext('light')

2.使用Provider方法来讲当前的theme传递给一下的组件树
return(
	<ThemeContext.Provider value="dark">
		....
	</ThemeContext.Provider>
)

3.组件树的组件可以通过context名来获取值
static contextType = ThemeContext

缺点：使得组件的复用性变差
```

**API**

1. **React.createContext(defaultCalue)**：创建一个Context对象,组件会从组件树中离自身最近的那个匹配的Provider读取到当前的值，只要没有匹配到Provider时，其defaultValue参数才会生效。如果赋值provider的value为undefined时，defaultValue不会生效

2. **Context.Provider**
   	允许消费组件订阅context的变化。
   	一个Provider可以和多个消费组件有对应关系
   	多个Provider嵌套使用时，里层的会覆盖外层的数据
   	当value值变化时，它内部所有的组件都会重新渲染，且不受制于shouldComponentUpdate函数。因此当consumer组件在其祖先组件退出更新的情况下也能更新。

   ```html
   <MyContext.Provider value={}></MyContext.Provider>
   ```

3. **Class.contextType**

   ```react
   class MyClass extends React.Component{
       componentDidMount(){
           let value = this.context;
       }
       render(){
   		let value = this.contextt
       }
   }
   MyClass.contextType = MyContext
   ```

   挂载在class上的**contextType**属性会被重新赋值为一个由**React.createContext()**创建的Context对象。因此可以使用this.context来使用最近Context上的那个值且可以在任何生命周期中访问到它，包括render函数。

4. **Context.Consumer**

   ```html
   <Mycontext.Consumer>
   	{value => 基于context值进行渲染}
   </Mycontext.Consumer>
   ```

   这个函数接收当前的context值，返回一个React节点。传递给函数的value值来自于离这个context最近的Provider提供的value值，没有则使用defaultValue

5. **Context.displayName**

   React DevTools使用该字符串来确定context要显示的内容

   ```react
   const Mycontext = React.createContext(1)
   MyContext.displayName = 'MydisplayName'
   <MyContext.Provider>// "MyDisplayName.Provider" 在DevTools中
   ```

**注意事项**

​	context会使用参考标识来决定何时进行渲染。当provider的父组件进行重渲染时，可能会在consumers组件中触发意外的渲染。

```html
<MyContext.Provider value={{something:'something'}}>
	<Toolbar />
</MyContext.Provider>
```

​	为避免以上情况，应将value状态提升到父节点的state里

```html
<Provider value={this.state.vale}>
    <Toolbae />
</Provider>
```

# 11.Refs转发

**创建ref对象**:可通过ref.current获取绑定了ref的元素的DOM节点

```react
const ref = React.createRef()
```

**转发ref**

```react
const FancyButton = React.forward((props,ref)=>{
    <button ref={ref} className="FancyButton">
    	{props.children}
    </button>
});
const ref = React.createRef()
<FancyButton ref={ref}>Click me!</FancyButton>
    
1.通过调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量。
2.通过指定 ref 为 JSX 属性，将其向下传递给 <FancyButton ref={ref}>。
3.React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数。
4.向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性。
5.当 ref 挂载完成，ref.current 将指向 <button> DOM 节点。
```

**访问Refs**

​	当ref被传递给render中的元素时，对该节点的引用可以在ref的current属性中被访问。

​	ref的值根据节点的类型而有所不同：

- 当ref属性用于HTMl元素时，ref对象接收底层DOM元素作为其current属性
- 当ref属性用于自定义class组件时，ref对象接收组件的挂载实例作为其current属性
- 不能在函数组件上使用ref属性，因为他没有实例，但可以在函数组件内部使用，只要ref指向DOM元素或class组件。

**Refs更新**

​	React组件会在组件挂载时给current属性传入DOM元素，并在组件卸载时传入null值。ref会在componentDidMount或componentDidUpdate生命周期钩子触发前更新。

**回调Refs**

​	不同于传递createRef()创建的ref属性，这个需要传递一个函数，这个函数接受React组件实例或HTML DOM元素作为参数，以使它们能在其他地方被储存和访问。

```react
<input type="text" ref={this.setTextInputRef}/>

this.setTextInputRef = element =>{
    this.textInput = element
}
```



# 12.Fragments

Fragments允许将子列表分组,而无需向DOM添加额外节点

```react
使用前需要额外添加一个父节点div来包裹所有li子项
render(){
	return (
    	<div>
        	<li></li>
        	<li></li>
        	<li></li>
        </div>
    )
}

可以通过Fragmnet包裹这些子项，且在真正的DOM节点中不会渲染出来
render(){
	return (
    	<React.Fragment>
        	<li></li>
        	<li></li>
        	<li></li>
        </React.Fragment>
    )
}
短语法：两者等价
render(){
	return (
    	<>
        	<li></li>
        	<li></li>
        	<li></li>
        </>
    )
}

key属性用于数组列表的渲染，也是唯一可以传递给Fragment的属性：
render(){
    return (
    	<dl>
        	{props.items.map(item=>(
            	<React.Fragment key={item.id}>
                	<dt>{item.term}</dt>
                	<dt>{item.description}</dt>
                </React.Fragment>
            ))}
        </dl>
    )
}
```

# 13.高阶组件

**高阶组件时参数为组件，返回值为新组件的函数**

通过将组件和prop传入包裹组件，返回一个新的组件，这个**新组件的数据来自于包裹组件**

```react
// 此函数接收一个组件...
function withSubscription(WrappedComponent, selectData) {
  // ...并返回另一个组件...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ...负责订阅相关的操作...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... 并使用新数据渲染被包装的组件!
      // 请注意，我们可能还会传递其他属性
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```



**不要在Render方法中使用HOC**

```
React的diff算法使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树。如果从render返回的组件与前一个渲染中的组件相同（===），则React通过将子树与新子树进行区分来递归更新子树。如果它们不想等，则完全卸载前一个子树。

缺点:性能消耗高，导致组件及其所有子组件状态丢失

一般应在组件之外创建HOC，极少数需要动态调用HOC的情况下，可以在组件的生命周期方法或其构造函数中进行调用
```



**复制被包裹组件的静态方法**

```react
1. 在返回之前将被包裹组件上的静态方法拷贝到容器组件上
2. 可以使用hoist-non-react-statics自动拷贝所有非React静态方法
	import hoistNonReatStatic from 'hoist-non-react-statics'
	function enhance(WrappedComponent){
        class Enhance extends React.Component{/*....*/}
        hoistNonReactStatic(Enhance,WrappedComponent)
        return Enhance
    }
3. 可额外导出静态方法，然后再需要使用的组件中引用
```

# 14.深入JSX

```react
<MyButton color="blue" shadowSize={2}>
	Click Me
</MyButton>
||
||
React.createElement(
	MyButton,	//标签名(指定元素类型)
    {color:'blue',shadowSize:2},//属性
    'Click Me'	//内容
)
```

1. 用户定义的组件必须以大写字母开头

2. JSX元素类型可以是一个大写字母开头的变量,但不可以是表达式

3. props的默认值是true

4. JSX会移除首尾的空格以及空行。

   ```html
   与标签相邻的空行均会被删除，文本字符串之间的新行会被压缩为一个空格。因此以下几种方法都是等价的
   <div>Hello World</div>
   
   <div>
     Hello World
   </div>
   
   <div>
     Hello
     World
   </div>
   
   <div>
   
     Hello World
   </div>
   ```

5. 可使用JavaScript表达式作为子元素，函数也可作为子元素。

   ```react
   布尔类型、NULL以及Undefined将会忽略，以下几种方法是等价的
   <div />
   
   <div></div>
   
   <div>{false}</div>
   
   <div>{null}</div>
   
   <div>{undefined}</div>
   
   <div>{true}</div>
   
   使用与表达式时，0仍然会被渲染
   {0&&<MistList></MistList>} 这仍会被渲染
   
   如果想渲染false、true、null、undefined等值，需要先转化为字符串
   ```



# 15.性能优化

生产环境优化：https://react.docschina.org/docs/optimizing-performance.html

其他优化：

1. 虚拟化列表

2. 避免调停：通过组件的生命周期函数shouldComponentUpdate来进行有选择的跳过整个渲染过程，从而达到提速

   ```
   可以在shouldComponentUpdate生命周期函数中比较组件所必需的数据是否发生改变来确定是否需要进行渲染
   
   也可以继承React.PureComponent进行浅比较
   ```

# 16.Portals

**Protals提供了一种将子节点渲染到存在于父组件以外的DOM节点的方法**

```react
ReactDOM.createPortal(child,container)
第一个参数（child）是任何可渲染的React子元素
第二个参数（container）是一个DOM元素
```

**事件冒泡**

```
挂载到其他组件下的Portals的事件冒泡可以被Parent组件捕获到

案例：https://codepen.io/gaearon/pen/jGBWpE
```

# 17.Profiler

**Profiler用于测量渲染一个React应用多久渲染一次以及渲染一次的“代价”**

```react
Profiler 能添加在React树中的任何地方来测量树中这部分渲染所带来的的开销。
两个prop：
	id（string）
	onRender（function）：当组件树中的组件“提交”更新的时候被React调用的回调函数
可以嵌套使用
    
render(
	<App>
    	<Profiler id="Navigation" onRender={callback}>
        	<Navigation {...props}/>
        </Profiler>
    </App>
)
```



**onRender回调**

- 参数：

  ```
    id, // 发生提交的 Profiler 树的 “id”
    phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
    actualDuration, // 本次更新 committed 花费的渲染时间
    baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
    startTime, // 本次更新中 React 开始渲染的时间
    commitTime, // 本次更新中 React committed 的时间
    interactions // 属于本次更新的 interactions 的集合
  ```

  - **`id: string`** - 发生提交的 `Profiler` 树的 `id`。 如果有多个 profiler，它能用来分辨树的哪一部分发生了“提交”。
  - **`phase: "mount" | "update"`** - 判断是组件树的第一次装载引起的重渲染，还是由 props、state 或是 hooks 改变引起的重渲染。
  - **`actualDuration: number`** - 本次更新在渲染 `Profiler` 和它的子代上花费的时间。 这个数值表明使用 memoization 之后能表现得多好。（例如 [`React.memo`](https://react.docschina.org/docs/react-api.html#reactmemo)，[`useMemo`](https://react.docschina.org/docs/hooks-reference.html#usememo)，[`shouldComponentUpdate`](https://react.docschina.org/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate)）。 理想情况下，由于子代只会因特定的 prop 改变而重渲染，因此这个值应该在第一次装载之后显著下降。
  - **`baseDuration: number`** - 在 `Profiler` 树中最近一次每一个组件 `render` 的持续时间。 这个值估计了最差的渲染时间。（例如当它是第一次加载或者组件树没有使用 memoization）。
  - **`startTime: number`** - 本次更新中 React 开始渲染的时间戳。
  - **`commitTime: number`** - 本次更新中 React commit 阶段结束的时间戳。 在一次 commit 中这个值在所有的 profiler 之间是共享的，可以将它们按需分组。
  - **`interactions: Set`** - 当更新被制定时，[“interactions”](https://fb.me/react-interaction-tracing) 的集合会被追踪。（例如当 `render` 或者 `setState` 被调用时）。

# 18.Diff算法

React在以下两个假设的基础之上提出了一套O(n)的启发式算法：

1. 两个不同类型的元素会产生出不同的树
2. 开发者可以通过key prop 来暗示哪些子元素在不同的渲染下保持稳定

对比两颗树时，首先比较两棵树的根节点。

- **比对不同类型的元素**

  当新旧两颗树的根节点为不同类型的元素时，React会拆卸原有的树并且建立起新的树。

  当拆卸一棵树时，对应的DOM节点也会被销毁，组件实例将执行**componentWillUnmount()**方法。

  当建立一棵树时，对应的DOM节点会被创建以及插入到DOM中。组件实例将执行**componentWillMount()**、**componentDidMount()**。所有跟之前的树所关联的state也会被销毁。

  ```react
  <div>
  	<Counter></Counter>
  </div>
  
  <span>
  	<Counter></Counter>
  </span>
  
  React会销毁Counter组件并且重新装载一个新的组件
  ```

- **比对同一类型的元素**

  当比对两个相同类型的React元素，React会保留DOM节点，仅比对及更新有改变的属性。

- **比对同类型的组件元素**

  当一个组件更新时，组件实例保持不变，故state在跨越不同的渲染时保持一致。

  React将更新该实例的props以跟最新的元素保持一致，并且调用该实例的**componentWillReceiverProps()**、**componentWillUpdate()**方法。下一步调用render()方法，diff算法将在之前的结果以及新的结果中进行递归。

- **对子节点进行递归**

  在默认条件下，当递归DOM节点的子元素时，React会同时遍历两个子元素的列表，当产生差异时，生成一个mutation。

- **keys**：特异标识组件实例，高效的更新虚拟DOM

# 19.Render Prop

**Render Prop**是一个用于告知组件需要渲染什么内容的函数prop

```react
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

# 20.严格模式

严格模式会允许检查被React.StrictMode包裹的组件及其所有后代元素

优点：

- 识别不安全的生命周期
- 关于使用过时字符串ref API的警告
- 关于使用废弃的 findDOMNode方法的警告
- 检测意外的副作用
- 检测过时的context API

# 21.PropTypes

用于检查props的数据类型

**设置默认值**：

```react
class Greeting extends React.Component{
    render(){}
}
Greeting.defaultProps={
    name:'Stranger'
}
```

**类型**

```react
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以将属性声明为 JS 原生类型，默认情况下
  // 这些属性都是可选的。
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、元素或数组）
  // (或 Fragment) 也包含这些类型。
  optionalNode: PropTypes.node,

  // 一个 React 元素。
  optionalElement: PropTypes.element,

  // 一个 React 元素类型（即，MyComponent）。
  optionalElementType: PropTypes.elementType,

  // 你也可以声明 prop 为类的实例，这里使用
  // JS 的 instanceof 操作符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以让你的 prop 只能是特定的值，指定它为
  // 枚举类型。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是几种类型中的任意一个类型
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 可以指定一个数组由某一类型的元素组成
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 可以指定一个对象由某一类型的值组成
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 可以指定一个对象由特定的类型值组成
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
  
  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   

  // 你可以在任何 PropTypes 属性后面加上 `isRequired` ，确保
  // 这个 prop 没有被提供时，会打印警告信息。
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的数据
  requiredAny: PropTypes.any.isRequired,

  // 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
  // 请不要使用 `console.warn` 或抛出异常，因为这在 `onOfType` 中不会起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 你也可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。
  // 它应该在验证失败时返回一个 Error 对象。
  // 验证器将验证数组或对象中的每个值。验证器的前两个参数
  // 第一个是数组或对象本身
  // 第二个是他们当前的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

# 22.非受控组件

**设置默认值**：指定defaultValue、defaultChecked

```react
<input defaultValue="Bob" type="text" ref={this.input} />

支持defaultChecked：<input type="checkbox"/><input type="radio"/>
支持defaultValue：<select><textarea></textarea>
```

# 23.异步 setState

在 **事件处理函数内部**的setState时异步的，有益于在大型应用中得到很好的提升

```
如果 Parent 和 Child 在同一个 click 事件中都调用了 setState ，这样就可以确保 Child 不会被重新渲染两次。取而代之的是，React 会将该 state “冲洗” 到浏览器事件结束的时候，再统一地进行更新。
```

- 为什么不同步地更新this.state？

  可以通过避免不必要的重新渲染来提升性能

# 24.memoized

缓存最后一次的参数和结果，当依赖的参数改变了才重新计算，否则直接返回缓存结果

```react
import memoize from "memoize-one";

class Example extends Component {
  // state 只需要保存当前的 filter 值：
  state = { filterText: "" };

  // 在 list 或者 filterText 变化时，重新运行 filter：
  filter = memoize(
    (list, filterText) => list.filter(item => item.text.includes(filterText))
  );

  handleChange = event => {
    this.setState({ filterText: event.target.value });
  };

  render() {
    // 计算最新的过滤后的 list。
    // 如果和上次 render 参数一样，`memoize-one` 会重复使用上一次的值。
    const filteredList = this.filter(this.props.list, this.state.filterText);

    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>{filteredList.map(item => <li key={item.id}>{item.text}</li>)}</ul>
      </Fragment>
    );
  }
}
```

