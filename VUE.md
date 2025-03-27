# vue-router的实现原理

通过hash和History interface两种方式实现前端路由，更新视图但不重新请求页面

1. hash----利用URL中的hash('#')
2. 利用History interface在HTML5中新增的方法

通过mode参数控制路由的实现模式

hash('#')符号的本来作用是加在URL中指示网页中的位置：#符号本身以及它后面的字符称之为hash，可以通过window.location.hash属性读取。hash虽然出现在URL中，但不会被包括在HTTP请求中，它是用来指导浏览器动作的，对服务器端完全无用，所以改变hash不会重新加载页面。就可以实现前端路由更新视图但不重新请求页面的功能了。



H5History的新方法，pushState和replaceState，它们有个共同的特点，在调用它们修改浏览器的历史记录栈后，虽然URL被改变了，但浏览器不会立即请求该URL，这个特点为更新视图但不重新请求页面提供了基础。

# vue路由的钩子函数

**beforeEach** 主要有3个参数 to from next

**afterEach**

# MVVM

**Model** 代表数据模型，可以在Model中定义数据修改和操作的业务逻辑

**View** 代表UI组件，他负责将数据模型转化成UI展示

**ViewModel** 监听模型数据的改变和控制视图行为、处理用户交互。即是一个同步View和Model的对象，通过双向绑定将View和Model连接。

在MVVM架构下，开发者只需关注业务逻辑，不需要手动操作DOM，不需要关注数据的同步问题，复杂的数据状态维护由MVVM统一管理。

# 生命周期

**beforeCreate**  在数据观测和初始化事件还未开始

**Created**  完成了数据观测，属性和方法的运算，初始化事件，但$el属性还没有显示出来

**beforeMount** 在挂载开始之前被调用，相关的render函数首次被调用。此时实例已完成：编译配置，将data里面的数据和模板生成HTML，

**mounted**：在el被新创建的vm.$el替换，并挂载到实例上后调用。此时实例完成了将编译好的HTML内容替换el属性指向的DOM对象。完成模板中的html渲染到HTML页面中。

**beforeUpdate** 在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可在此钩子中进一步修改状态，不会触发附加的重渲染过程。

**updated** 在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用后，组件DOM已经更新，故可执行依赖于DOM的操作。

**beforeDestroy** 在实例销毁之前调用。

**destroyed** 发生在实例销毁之后。所有的事件监听器已被移除，所有的子实例都会被销毁。

1. 生命周期：vue实例从创建到销毁的过程，就是生命周期。从开始创建->初始化数据->编译模板->挂载DOM->渲染、更新->销毁等一系列过程，称之为vue的生命周期。

2. 作用：生命周期中有多个事件钩子函数，便于在控制整个vue实例的过程时更容易形成好的逻辑。
3. 第一次加载会触发beforeCreate，created，beforeMount，mounted
4. DOM渲染在mounted中已经完成。

# 双向绑定原理-Object.defineProperty（）

采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调。

将MVVM作为数据绑定的入口，整合Observer,Compile,Watcher三者，通过Observer来监听自己的model 的数据变化，通过Compile来解析编译模板指令，最终利用watcher搭起observer和Compile之间的通信桥梁

```js
function defineProperty(obj, attr) {
            var val;
            Object.defineProperty(obj, attr, {
                get: function () {
                    return val;
                },
                set: function (newValue) {
                    if (newValue === val) {
                        return;
                    }
                    val = newValue;
                    document.getElementById("input").value = newValue;
                    document.getElementById("show").innerHTML = newValue;
                }
            });
        }

        var obj = {};
        defineProperty(obj, "txt");
        document.getElementById("input").addEventListener("keyup", function (e) {
            obj.txt = e.target.value;
        })
```



# 参数传递

1. 子组件和父组件传值：
   1. 父组件传子组件：子组件通过props接收数据
   2. 子组件传给父组件：$emit 方法传递参数，或通过调用$parent传递
2. 兄弟组件传值：eventBus，创建事件中心或者使用vuex

# vuex

state：存放数据状态

mutations：同步改变状态

action：异步改变状态

getters: 类似于vue的计算属性，主要用于过滤一些数据

modules：项目较为复杂的时候使用，可以让每一个模块都拥有自己的state，mutation，action，getters，使代码结构更加清晰，方便管理。

在main.js中引入store

# 自定义指令

局部：

```javascript
directives:{
	dir1:{
        inserted(el){
            
        }
    }

```

​	全局：

```
vue.directive('dir1',{
	inserted(el){
	
	}
})
```

```
钩子函数

bind：只调用一次，指令第一次绑定到元素时调用
inserted：被绑定元素插入父节点是调用
update：所在的组件的VNode更新时调用，可能发生在其子VNode更新之前
componentUpdated：指令所在组件的VNode及其子Vnode全部更新之后调用
UNbind：只调用一次，指令与元素解绑时调用
```

```
函数参数：
el：指令所绑定的元素，可以用来直接操作DOM
binding：一个对象，包含以下property：
	name：指令名，value：指令的绑定值，
VNode：虚拟节点
oldVNode：上一个虚拟接地那
```



# 自定义过滤器

局部

```javascript
filters:{
	capitalize:function(value){
        if(!value)return ''
    }
}
```

全局

```
vue.filter('capitalize',function(value){
	if(!vlaue)
})
```

两者重名时使用局部过滤器

![image-20210531165402679](C:\Users\LZH\AppData\Roaming\Typora\typora-user-images\image-20210531165402679.png)

# keep-alive

keep-alive 是vue内置的一个组件，可以使被包含的组件保留状态或避免重新渲染。



include属性指被包含的组件缓存

exclude属性排除的组件不缓存，优先级大于include



```
被包含的组件不会被再次初始化

activated：包含的组件再次渲染的时候触发
deactivated：包含的组件销毁的时候触发
```



# $route和$router

**$route** 是“路由信息对象”，包含path，params，hash，query等路由信息参数

**$router** 是“路由实例”对象包含了路由的跳转方法，钩子函数。

# vue的两个核心

数据驱动和组件系统

# vue常用的修饰符

## v-model 修饰符:

​	**.lazy**:在输入框失去焦点或按下回车键才会更新数据

​	**.trim**：输入框过滤首尾的空格

​	**.number**：先输入数字就会限制输入只能是数字，先字符串就相当于没有加number

## 事件修饰符

**.stop** : 阻止事件冒泡

**.prevent**：阻止默认行为

**.self**:只有元素本身触发时才触发方法

**.once**：事件只触发一次

**.capture**：即是给元素添加一个监听器，当元素发生冒泡时，先触发带有该修饰符的元素。若有多个该修饰符，则由外而内触发

**.sync**：对prop进行双向绑定

**.keyCode**：监听按键的指令

# key的作用

当vue.js用v-for正在更新已渲染过的元素列表时，它默认用就地复用策略，如果数据项的顺序被改变，vue将不会移动dom元素来匹配数据项的顺序，而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。key的作用主要是为了高效的更新虚拟dom

```
高效的更新虚拟dom，提高性能
可通过key判断两个节点是否是同一个节点，
```

# 动态路由

在router目录下的index.js中，对path属性加上/:id,使用router对象的params.id获取。

# proxyTable

```
其实大概的原理就是请求首先发送到本地服务的api下去寻找数据的接口,但是本地服务不存在这个接口,刚好又做了转发,那么再去转发的目标域名下寻找对应的接口.从而实现由本地服务发送请求来解决跨域的问题.
```

# vue cli 原理

```
实际上webpack将代码转换为浏览器可以识别的代码
在将打包好的文件放到方服务器里面
插件将托管的文件自动引入，造成不需要刷新页面就能自动刷新
```

# nextTick是什么

```
在下次DOM更新循环结束之后执行延迟回调，在修改数据之后立即使用这个方法，获取更新后的DOM（将回调函数添加到微任务中，特殊情况下会降级为宏任务）
js的运行机制：宏任务和微任务 
浏览器会在一个task执行结束后下一个task任务执行开始前渲染页面，而微任务是在task执行结束后立即执行的任务。
所以nextTick优先使用Promise和MutationObserver这两个属于微任务，setImmediate和setTimeout属于宏任务，在执行开始前要等待渲染
```



# computed

它依赖与数据，数据更新，处理结果自动更新，在依赖数据不变的时候computed从缓存中获取，不会重新计算。

```
最主要也是通过事件的发布-订阅模式来监听对象数据的变化实现的
```



```js
应用场景：
	1.适用于一些重复使用数据或复杂及费时的运算。
	2.如果需要的数据依赖于其他数据的话

与methods的区别：
	1.computed基于响应性依赖来进行缓存，只有在响应式依赖发生改变时才会重新求值
    2.computed中的成员可以只定义一个函数作为只读属性，也可以定义get/set变成可读写属性
	3.computed若值未改变会直接从缓存中获取，若改变了才会重新计算
    
    https://zheyaoa.github.io/2019/09/07/computed/
```



# watch        

```
是一个对数据的监听回调，当数据改变时，会执行回调，在回调中会传入newVal和oldVal两个参数，

immediate：true 第一次页面加载就会执行一次 false等到数据改变了才执行
deep：true 深度监听 false 普通监听
```

```
和计算属性的相同点在于都是观察页面数据变化的
```

```
属性：
	1.handler：处理函数
	2.immediate：初始化时是否执行
	3.deep：深度监听，即json数据
```

# computed和watch的区别

```
computed：
	1. 支持缓存
	2. 不支持异步
	3. 默认走缓存
watch：
	1. 不支持缓存
	2. 支持异步
```

# vuex

```
定义：是一种状态管理模式

属性：
	1.State：vuex的基本数据
	2.Getter：从基本数据派生的数据，相当于state的计算属性
	3.Mutation：提交更新数据的方法，必须是同步
	4.Action：Action提交的是mutation，而不是直接变更状态，可以异步
	5.Module：模块化vuex
```

1. 请求写在组件的methods中还是vuex的actions中

   ```
   1. 若只有请求的组件使用则放在state里
   2. 如果其他组件需要复用，可以写在action里，并包装成promise返回，在调用处用async，awati处理
   ```

2. 更改数据

   ```
   dispatch：异步操作
   commit：同步操作
   ```

3. actions和mutations的区别

   ```
   mutation类似于事件，都有一个字符串的事件类型和一个回调函数，回调函数就是实际进行状态更改的地方，并且它会接受state作为第一个参数
   actions:提交的是mutation而不时直接变更状态，可以包含任意异步操作
   ```

   