# css盒模型

即用来放置页面上的元素的矩形区域

box-sizing : border-box,padding-box,content-box

## IE盒子模型

![2018-07-10 4 24 12](https://user-images.githubusercontent.com/17233651/42498075-d3496e3a-845d-11e8-919c-eb3a7866883b.png)

**width= border+padding+content**

## 标准盒模型

![2018-07-10 4 24 03](https://user-images.githubusercontent.com/17233651/42498021-b4dd6a46-845d-11e8-8bd9-ac2d90985f2a.png)

**width=content**

## 区别

主要在于width的包含范围，padding-box单位宽度等于padding+content

# BFC

块级格式化上下文，是一个独立的渲染区域，让处于BFC内部的元素与外部的元素相互隔离，使内外元素的定位不会互相影响。

> BFC:https://blog.csdn.net/sinat_36422236/article/details/88763187

## 触发条件

- float不为none
- overfloat不为visible
- 根元素
- position：absolute/fixed
- display：inline-block/table

## 规则

- 属于同一个BFC的两个相邻Box垂直排列
- 属于同一个BFC的两个相邻box的margin会发生重叠
- BFC中子元素的margin box的左边，与包含块（BFC）border box的左边相接触（子元素absolu除外）
- BFC的区域不会与float的元素区域重叠
- 计算BFC的高度时，浮动子元素也参与计算
- 文字层不会被浮动层覆盖，环绕于周围

## 应用

- 阻止margin重叠
- 可以包含浮动元素——清除内部浮动（清除浮动的原理是两个div都位于同一个BFC区域之中）
- 自适应两栏布局
- 可以阻止元素被浮动元素覆盖



# 层叠上下文

元素提升为一个比较特殊的图层，在三维空间中（z轴）高出普通元素一等。

> 层叠上下文 https://blog.csdn.net/llll789789/article/details/97562099 

## 触发条件

- 根层叠上下文（html）
- position：定义了position属性，且属性值为非static值（默认值，没有定位）
- css3属性
  - flex
  - transform
  - opacity
  - filter
  - will-change
  - -webkit-overflow-scrolling

## 层叠等级规则

- 在同一层叠上下文中，层叠等级才有意义
- z-index的优先级最高

![img](https://user-gold-cdn.xitu.io/2019/2/14/168e9d9f3a1d368b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



# 居中布局

## 水平居中

- 行内元素：text-align:center;
- 块级元素：margin:auto;
- position:absolute;+transform
- display:flex;justify-content:center;

## 垂直居中

- line-height:height;
- position:absolute; transform
- display:flex;align-items:center;
- 父元素：display:table-cell,vertical-align:center;

## 水平垂直居中

- position:absolute;transform
- displau:flex;justify-content:center;align-items:center;



# 选择器优先级

默认 < 继承 < * < tag < .class < #id < 行内样式 < !important





- 



# CSS预处理器（Sass/Less/Postcss)

css预处理器的原理，是将类css语言通过webpack编译转成浏览器可读的真正css。在这层编译之上，便可以赋予css更多更强大的功能，常用功能：

- 嵌套
- 变量
- 循环语句
- 条件语句
- 自动前缀
- 单位转换
- mixin复用



# CSS动画

## transition 过渡动画

- transition-property : 属性
- transition-duration : 间隔
- transition-timing-function : 曲线
- transition-delay : 延迟
- 常用钩子：transitionend

## animation/keyframes

- animtaion-name: 动画名称， 对应@keyframes
- animation-duration: 间隔
- animation-timing-function: 曲线
- animation-delay: 延迟
- animation-iteration-count：次数
  - infinite:循环动画
- animation-direction: 方向
  - alternate:反方向播放
- animation-fill-mode: 静止模式
  - forwards：停止时，保留最后一帧
  - backwards: 停止时，回到第一帧
  - both: 同时运用 forwards / backwards
- 常用钩子：animationend

## transform 动画属性

尽量使用动画属性进行动画制作，能拥有较好的性能表现

- translate
- scale
- rotate
- skew
- opacity
- color

# 双飞翼布局和圣杯布局

> https://blog.csdn.net/smlljet/article/details/93379411

