# 0. 原型/构造函数/实例

- 原型（prototype）：一个简单的对象，用于实现对象的**属性继承**。
- 构造函数：可以通过 ***new*** 关键字 来新建一个对象的函数
- 实例：通过构造函数和 new 创建出来的对象，便是实例。 **实例通过 __proto__ 指向原型，通过constructor 指向构造函数**



# 1. 原型链

原型链是由原型对象组成，每个对象都有 __proto__  属性，指向了创建该对象的构造函数的原型， __proto__ 将对象连接起来组成了原型链。 是一个用来**实现继承和共享属性**的有限的对象链。

- **属性查找机制**：先在自身查找，后自动往上查询，若依然找不到则返回undefined
- **属性修改机制**：只会修改实例对象本身的属性，如果不存在，则添加该属性。



# 2. 执行上下文（EC)

执行上下文可以简单理解为一个**对象**：

- 它包含三个部分：
  - 变量对象（AO）
  - 作用域链
  - this 指向
- 它的类型：
  - 全局执行上下文
  - 函数执行上下文
  - eval 执行上下文
- 代码执行过程
  - 创建全局上下文
  - 全局执行上下文 逐行  **自上而下** 执行。遇到函数时，**函数执行上下文**被 **push** 到执行**栈顶层**
  - 函数执行上下文被激活，成为 active EC ,开始执行函数中的代码，全局执行上下文被**挂起**
  - 函数执行完毕后， 函数执行上下文被**pop**移除出执行栈，控制权交还全局上下文，继续执行

## 变量对象

变量对象，是执行上下文汇总的一部分，可以抽象为一种  **数据作用域** ，其实也可以理解为就是一个简单的对象，它存储着**该**执行上下文中的**所有变量和函数声明（不包括函数表达式）**

当变量对象所处的上下文为active EC时，称为活动对象。

# 3. 作用域

为该上下文中声明的变量和声明的作用范围。可分为 **块级作用域**、**函数作用域**和**全局作用域**。

## 特性

- 声明提升：函数提升优先于变量提升
- 非匿名自执行函数，函数变量为 **只读** 状态，无法修改

```JavaScript
let foo = function() { console.log(1) };
(function foo() {
    foo = 10  // 由于foo在函数中只为可读，因此赋值无效
    console.log(foo)
}()) 

// 结果打印：  ƒ foo() { foo = 10 ; console.log(foo) }

```

# 4. 作用域链

作用域链可以理解为一组对象列表，包含**父级和自身的变量对象**，因此我们便能通过作用域链访问到父级里声明的变量或者函数。

- 由两部分组成：
  - [[ scope ]] 属性：指向父级变量对象和作用域链，也就是包含了父级的 [[ scope ]] 和 AO
  - AO：自身活动对象



# 5. 闭包

闭包：指有权访问另一个函数作用域中的变量的函数

闭包属于一种特殊的作用域，称为 **静态作用域**。它的定义可以理解为： 父函数被销毁的情况下，返回出的子函数的作用域中仍保留着父级的单变量对象和作用域链，因此可以继续访问到父级的变量对象，这样的函数称为闭包。

- 闭包存在的问题：
  - 多个子函数的 **[[ scope ]]** 都是同时指向父级，是完全**共享**的，因此当父级的变量对象被修改时，所有子函数都受到影响。
    - 变量可以通过 **函数参数的形式** 传入，避免使用默认的 [[ scope ]] 向上查找。
    - 使用 setTimeout 包裹，通过第三个参数传入
    - 使用 **块级作用域**，让变量成为自己上下文的属性，避免共享
  - 闭包导致变量不会被自动回收，可能导致内存泄露

# 6. script 引入方式

- html 静态 <script> 引入
- js 动态插入 <script> 
-  </script defer> ：**延迟**加载，元素解析完成后执行
- </script async> : **异步**加载，但执行时会**阻塞元素渲染**

# 7. 对象的拷贝

- 浅拷贝：以赋值的形式拷贝引用对象，仍指向同一个地址，**修改时原对象也会受到影响**

  - Object.assign

    > - Object.assign()的使用 https://www.jianshu.com/p/f9ec860ecd81

  - 展开运算符（...）

    > - https://www.jianshu.com/p/3935a80342a0
    > - https://segmentfault.com/q/1010000019026761

- 深拷贝：完全拷贝一个新对象，修改时原对象不在受到任何影响。

  - JSON.parse(JSON.stringify(obj))：性能最快
    - 具有**循环引用**的对象时，报错
    - 当值为**函数**、**undefined**或 **Symbol** 时 ，无法拷贝
  - 递归遍历进行逐一赋值



# 8. new运算符的执行过程

- **新生成一个对象**

- **链接到原型**： obj.\__proto__ = Con.prototype

- 绑定this： **apply**

- 返回新对象（如果构造函数有自己的return值时,则返回该值）

## this

  ```js
  1. 调用场景
  	var obj = {
          a:1,
          b:function(){console.log(this)}
      }
      · 作为对象调用时，指向该对象obj.b();  //指向obj
  	· 作为函数调用， var b = obj.b();b(); //指向全局window
  	· 作为构造函数调用 var b = new Fun(); // this指向实例
  	· 作为call 与 apply调用 obj.b.apply(object,[]) //指向object
  
  2. ()左边部分，若有计算、赋值、获取值后都视为函数调用，则this 指向 window
  var value = 1;
  
  var foo = {
    value: 2,
    bar: function () {
      return this.value;
    }
  }
  
  //示例1
  console.log(foo.bar()); // 2
  //示例2
  console.log((foo.bar)()); // 2
  //示例3
  console.log((foo.bar = foo.bar)()); // 1
  //示例4
  console.log((false || foo.bar)()); // 1
  //示例5
  console.log((foo.bar, foo.bar)()); // 1
  ```

# 9. typeof和instanceof原理

```js
typeof: js在底层存储变量时，会将变量的机器码的低位1-3位存储器类型信息，通过这3位来判断类型。
 000：对象
 010：浮点数
 100：字符串
 110：布尔
 1：整数
 
 然而 null的所有机器码均为0，故typeof判断其为object
 undefined用-2^30整数表示
```

```js
instanceof
作用：	1. 用于判断实例是否属于某种类型
	  2. 判断实例是否是其父类或者祖先类的实例
      
原理： 即只要右边变量的prototype在左边变量的原型链上即可
```

能在**实例的原型对象链**中找到该构造函数的prototype 属性所指向的 **原型对象**，就返回true。

```javascript
// __proto__: 代表原型对象链
instance.[__proto__...] === instance.constructor.prototype

// return true
	
```

# 10. 代码的复用

- 函数封装
- 继承
- 赋值 extend
- 混入 mixin
- 借用 apply/call



# 11. 继承

继承通常指的是原型链继承，也就是通过指定原型，并可以通过原型链继承原型上的属性或者方法

- 最优化： **圣杯模式**

  > - https://www.cnblogs.com/y-y-y-y/p/10357697.html

  ```javascript
  var inherit = (function(c,p){
      var F = function(){}
          return function(c,p){
              F.prototype = p.prototype;
              c.prototype = new F();
              c.uber = p.prototype;
              c.prototype.constructor = c;
          
      }
  })();
  ```

- 使用ES6的语法糖 class/extends



# 12. 类型转换

- -、*、/、%：一律转换成数值后计算
- +：
  - 数字+字符串 = 字符串
  - 数字+对象，优先调用对象的valueOf -> toString
  - 数字+boolean/null -> 数字
  - 数字+undefined -> NaN
- [1].toString === '1'
- {}.toString() === '[object object]'
- NaN !== NaN、 NaN+undefined 为 NaN



# 13. 类型判断

- 基本类型（null）：使用 String(null)
- 基本类型（string / number / boolean / undefined) +function: 直接使用 typeof 即可
- 其余引用类型（Array / Date / RegExp / Error)：调用toString 后根据[object XXX] 进行判断。

判断函数封装

```javascript
let class2type = {}
'Array Date RegExp Object Error'.split(' ').forEach(e=>class2type['[object'+e+']']=e.toLowerCase())

function type(obj){
    if(obj === null){
        return String(obj)
    }
    return typeof obj ==='object'?class2type[Object.prototype.toString.call(obj)]||'object':
    typeof obj
}
```



# 14. 模块化

提高了项目的 **可维护、可拓展、可协作性**

**在浏览器中使用ES6的模块化支持，在Node中使用commonjs的模块化支持**

- 分类
  - es6：import / export
  - commonjs: require / module.exports / exports
  - amd: require / defined
- require 与 import 的区别
  - require 支持**动态导入** ，import不支持
  - require 是 **同步导入**， import 属于 **异步导入**
  - require是 **值拷贝**，导出值不会影响导入值；import 指向 **内存地址**，导入值会随导出值变化。



# 15. 函数执行改变this

> call、bind、apply的区别：https://blog.csdn.net/hexinyu_1022/article/details/82795517

- ```javascript
  call: fn.call(target,1,2)
  ```

  - 首先把**要操作的函数中的this**变为 **call**方法第一个传递的实参
  - 把call 方法第二个及之后的实参获取到
  - 把要操作的函数执行，并且把第二个以后传递进来的实参传递给函数

- ```
  apply: fn.apply(target,[1,2])
  ```

  - 与call相同，唯一区别在与传参方式

- ```
  bind: fn.bind(target)(1,2)
  ```

  - 语法和call一样，区别在于立即执行还是等待执行
  
  - **bind 的模拟实现**
  
    ```js
    Function.prototype.bind = function(context){
        //判断是不是函数调用了bind方法
        if(typeof this !=="function"){
            throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
        }
        
        var self = this
        // 将arguments 从第二个参数开始分割
        var args = Array.prototype.slice.call(arguments,1)
        
        var fNOP = function(){}
        var fBound = function(){
            // 获取传入的参数
            var bindArgs = Array.prototype.slice.call(arguments)
            return self.apply(this instanceof fNOP?this:context,args.concat(bindArgs))
        }
        fNOP.prototype = self.prototype
        fBound.prototype = new fNOP()
        return fBound
    }
    ```
  



# 16. ES6\ES7

- 声明

  - let / const ： 块级作用域，不存在变量提升、暂时性死区、不允许重复声明。
  - const：声明常量，无法修改。

- 解构赋值

- class/extend：类声明与继承

- Set/Map：新的数据结构

- 异步解决方案

  - Promise的使用与实现

  - generator

    - yield: 暂停代码

    - next(): 继续执行代码

    - ```javascript
      function* helloworld(){
      	yield 'hello';
          yield 'world';
          return 'ending';
      }
      const generator = helloworld();
      generator.next();//{value:'hello',done:false}
      generator.next();//{value:'world',done:false}
      generator.next();//{value:'ending',done:true}
      generator.next();//{value:'undefined',done:true}
      ```

    - await / async:是generator的语法糖，babel中是基于promise实现



# 17. AST

**抽象语法树，是将代码逐字母解析成树状对象的形式。**

是语言之间的转换、代码语法检查、代码风格检查、代码格式化、代码高亮、代码错误提示、代码自动补全等等的基础。

例：

```javascript
function square(n){
	return n * n
}

```

通过解析转化成的AST如下图：

![img](https://user-gold-cdn.xitu.io/2019/2/14/168e9d95910dd187?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



# 18. babel 编译原理

- babylon 将ES6/ES7 代码解析成AST
- babel-traverse 对AST进行遍历转译，得到新的AST
- 新AST通过babel-generator 转换成ES5



# 19. 函数柯里化

> https://www.jianshu.com/p/2975c25e4d71

在一个函数中，首先填充几个参数，然后在**返回一个新的函数**的技术，称为函数的柯里化。通常可用于在**不侵入函数**的前提下，为函数**预置通用参数**，供多次重复调用。

参数复用
用闭包将参数保存起来，当参数的数量足够执行函数时，就执行函数



```js
function curry(fn, args) {
            // 获取函数的参数长度
            var length = fn.length
            // 将参数重新赋值，若参数为空则赋值一个空数组
            args = args || []

            return function () {
                var _args = args.slice(0),
                    arg, i;
                // 参数拼接
                for (i = 0; i < arguments.length, i++) {
                    arg = arguments[i]
                    _args.push(arg)
                }
                // 判断参数长度是否足够
                if (_args.length < length) {
                    return curry.call(this, fn, _args)
                } else {
                    return fn.apply(this, _args)
                }
            }
        }

var curry = fn=> 
	judge =(...args)=>
		args.length===fn.length
			? fn(...args)
			: (arg)=>judge(...args,arg)
```

```js
add(1)(2)(3)
add(1,2,3)(4)
add(1)(2)(3)(4)(5)

function add(){
	var _args = [].slice.call(arguments);
    var _adder = function(){
        _args.push(...arguments)
        return _adder
    }
    _adder.toString = function(){
		return _args.reduce((a,b)=>{
			return a+b
        })
    }
    return _adder
}
```

# 

```javascript
const add = function add(x){
    return function(y){
        return x+y
    }
}

const add1 = add(1)

add1(2) === 3
add1(20) === 21
```



# 20. 数组（array）

- **map** ：遍历数组，返回回调返回值组成的新数组

  > - https://www.jianshu.com/p/aa65f961af86
  > - ![img](https://upload-images.jianshu.io/upload_images/14352809-978d2b872aee82eb.png?imageMogr2/auto-orient/strip|imageView2/2/w/544/format/webp)

- **forEach**：无法**break**，可以用 **try/catch** 中 **throw new Error** 来停止

- **filter**：过滤

- **some**：有**一项返回true**，则**整体为 true**（一人得道，鸡犬升天）

- **every**：有**一项返回false**，则**整体为false**（一颗老鼠屎，坏了一锅汤）

- **join**：通过指定连接符生成字符串

- **push/pop**：**末尾**推入和弹出，改变原数组，**push返回数组长度**，**pop返回原数组最后一项**

- **unshift/shift**：**头部**推入和弹出，改变原数组，**unshift返回数组长度**，**shift返回原数组第一项**。

- **sort(fn)/reverse**: 排序与反转，**改变原数组**。

- **concat**：连接数组，不影响原数组，**浅拷贝**（浅拷贝了第一层，第二层改变后会影响原数组）

  > - https://www.cnblogs.com/mike-mei/p/13130005.html

- **slice(start,end)**：返回截断后的新数组，不改变原数组，浅拷贝

  > - https://www.cnblogs.com/mike-mei/p/13130005.html

- **splice(start,number,value...)**：返回删除元素组成的数组，value为插入项，改变原数组

- **indexOf / lastIndexOf(value,fromIndex)**：查找数组项，返回对应的下标。

- **reduce / reduceRight(fn(prev,cur),defaultPrev)**：两两执行，**prev为上次化简函数的return值，cur为当前值**

  - 当传入defaultPrev时，从第一项开始；

  - 当位传入时，则为第二项。

  - > https://www.cnblogs.com/xjy20170907/p/11119795.html

- 数组乱序：

  - ```javascript
    let arr = [1,2,3,4,5,6,7,8,9,10]
    arr.sort(function(){
        return Math.random()-0.5;
    })
    ```

- 数组拆解：flat：[1,[2,3]]-->[1,2,3]

  - ```javascript
    Array.prototype.flat = function(){
        return this.toString().split(',').map(item=>+item);
    }
    ```

- 数组去重

  - ```javascript
    Array.prototype.unique=function(){
    	let obj={}
        return arr.filter(function(item,index,arr){
            return obj.hasOwnProperty(typeof item+item)?false:(obj[typeof item+item]=true)
        })
    }
    ```

# 21. ES7

Array.includes() 可以查询给定字符串是否包含指定字符

求幂运算符

# 22. ES8

async/await  提供了在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力

# 23.JS事件

```
指用户在某事务上由于某种行为所执行的操作
事件是文档或者浏览器窗口中发生的，特定的交互瞬间。

事件是用户或浏览器自身执行的某种动作，如click,load和mouseover都是事件的名字。

事件是javaScript和DOM之间交互的桥梁
```

# 24.为什么区分宏任务和微任务

```
区分微任务和宏任务是为了将异步队列任务划分优先级，通俗的理解就是为了插队。

一个 Event Loop，Microtask 是在 Macrotask 之后调用，Microtask 会在下一个 Event Loop 之前执行调用完，并且其中会将 Microtask 执行当中新注册的 Microtask 一并调用执行完，然后才开始下一次 Event Loop，所以如果有新的 Macrotask 就需要一直等待，等到上一个 Event Loop 当中 Microtask 被清空为止。由此可见，我们可以在下一次 Event Loop 之前进行插队。

如果不区分 Microtask 和 Macrotask，那就无法在下一次 Event Loop 之前进行插队，其中新注册的任务得等到下一个 Macrotask 完成之后才能进行，这中间可能你需要的状态就无法在下一个 Macrotask 中得到同步。
```

# 25.将图片转成base64编码

```
通过表单元素获取到上传的文件
通过fileReader对象的readAsDataURL获取
```

# 26.base64编码的作用

```
base64编码可将非ASCII字符的数据转换成ASCII字符的一种方法，且特别适合在http，mime协议下快速传输数据
```

# 27.微信支付为什么用长轮询

```
长轮询由客户端发起，间隔一定时间向服务器请求事件
优点：就是不需要保持和服务器一直联系，资源占用会少一点
缺点：可能会产生比较多的请求，或请求失败造成的数据混乱
服务器hold连接会消耗资源，返回数据顺序无保证，难于管理维护
长连接服务器和客户端会保持一个长久的联系
优点：数据更新即时性好，体验流畅
缺点：对服务器的资源会有一个占用，所以相对占用资源比较大，另外HTTP长连接有时效性，不是可靠连接
```

# 28.长连接

```
Connection：keep-alive

优点：减少资源的消耗，不需要经常建立及关闭连接
减少了网络的堵塞，因为减少了TCP请求
```

# 29.DNS解析域名过程

```
3.  如果至此还没有命中域名，才会真正的请求本地域名服务器（LDNS）来解析这个域名，这台服务器一般在你的城市的某个角落，距离你不会很远，并且这台服务器的性能都很好，一般都会缓存域名解析结果，大约80%的域名解析到这里就完成了。

4. 如果LDNS仍然没有命中，就直接跳到Root Server 域名服务器请求解析

5. 根域名服务器返回给LDNS一个所查询域的主域名服务器（gTLD Server，国际顶尖域名服务器，如.com .cn .org等）地址

6. 此时LDNS再发送请求给上一步返回的gTLD

7. 接受请求的gTLD查找并返回这个域名对应的Name Server的地址，这个Name Server就是网站注册的域名服务器

8. Name Server根据映射关系表找到目标ip，返回给LDNS

9. LDNS缓存这个域名和对应的ip

10. LDNS把解析的结果返回给用户，用户根据TTL值缓存到本地系统缓存中，域名解析过程至此结束

https://blog.csdn.net/yanshuanche3765/article/details/82589210
```

