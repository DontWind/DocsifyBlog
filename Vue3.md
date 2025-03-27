## 1 setup

  *1.setup 执行时机*

​    *beforeCreate:表示组件刚刚被创建出来，组件的data和methods还没有初始化好*

​    *setup：*

​    *created:表示组件刚刚被创建出来，并且组件的data和methods已经初始化好*

  *2.setup注意点*

  *- 由于子啊执行setup函数的时候，还没有执行Created生命周期方法*

​    *所以在setup函数中，是无法使用data和methods的*

  *- 由于我们不能在函数中使用data和methods，*

​    *所以Vue为了避免我们错误的使用，将setup函数中this修改成了undefined*

  *- setup函数只能是同步的，不能是异步的*

# 2

*/** 

  *1.什么是reactive？*

​    *- reactive是vue3中提供的实现响应式数据的方法*

​    *-  在vue2中响应式数据是通过defineProperty来实现的*

​      *在vue3中响应式数据是通过Proxy来实现的*

  *2.reactive注意点：*

​    *- reactive参数必须是对象（json/arr）*

​    *- 如果传递了其他对象*

​      *+ 默认情况下修改对象，页面不会自动更新*

​      *+ 如果想更新，可通过重新赋值的方式*

  **/*

# 3

*1.什么是ref？*

​    *- ref和reactive一样，都是用来实现响应式数据的方法*

​    *- reactive必须传递一个对象，ref实现对简单值的监听*

  *2.ref本质：*

​    *- ref底层的本质其实还是reactive*

​      *系统会自动根据我们给ref传入的值将他转换成*

​      *ref(xx) -> reactive({value:xx})*

  *3.ref注意点：*

​    *- 在vue中使用ref的值不用通过value获取*

​    *- 在js中使用ref的值必须通过value获取*

# 4

*1.ref和reactive区别*

​      *- 通过ref创建的数据，那么在template中使用的时候不用通过.value获取*

​        *因为vue会自动添加.value*

​        *通过reactive创建的数据，vue不会自动添加.value*

​      *- vue如何决定是否需要自动添加.vue*

​        *vue在解析数据之前，会自动判断这个数据是否是ref类型*

​        *是则自动添加，不是则不添加*

​      *- vue通过__v_isRef是否为true来判断是否是ref类型的数据*

# 5

*1.递归监听*

​    *默认情况下，无论是通过ref还是reactive都是递归监听*



​    *2.递归监听存在的问题*

​    *如果数据量比较大，非常消耗性能*



​    *3.非递归监听*



# 6

*1.递归监听*

​    *默认情况下，无论是通过ref还是reactive都是递归监听*



​    *2.递归监听存在的问题*

​    *如果数据量比较大，非常消耗性能*



​    *3.非递归监听*

​      *-  shallowRef:如果是通过shallowRef创建数据，*

​        *vue监听的是.value的变化，并不是第一层的变化*

​      *-  triggerRef:指定更新shallowRef的某一变量* 

​      *- shallowReactive:只监听第一层的变化*

​    *4.应用场景*

​      *一般使用ref和reactive*

​      *在有大数据的情况下使用shallowRef，shallowReactive*



# 7

*1.shallowRef的底层本质是shallowReactive*

​    *所以如果是通过shallowRef创建的数据监听的是.value的变化，*

​    *因为底层本质上value才是第一层*

# 8



```
diff算法优化：
	vue2中是全量对比
	vue3中使用的是静态标记
		在与上次虚拟节点进行对比时，只对比带有patch flag标记的节点
		并且可以通过flag的信息得知当前节点需要对比的内容

静态提升
	vue2中所有元素无论是否参与更新，每次都会重新创建、重新渲染
	vue3对不参与更新的元素，会做静态提升，只创建一次，在渲染时直接复用即可
	
cacheHandlers 事件侦听器缓存
	因为默认情况下onclick被视为动态绑定，所以每次都会追踪它的变化，但是因为是同一个函数，所以不需要追踪变换，直接缓存复用即可
```

