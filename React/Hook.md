# 1.Hook概念<!-- {docsify-ignore-all} -->

**可以在不编写class的情况下使用state以及其他的React特性**

# 2.State Hook

- **useState**

  ```React
  import React, { useState } from 'react';
  
  function Example() {
    // 声明一个叫 "count" 的 state 变量
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
  
  useState方法返回 属性名和一个更改该属性的函数，接受一个参数作为属性的初始值
  它定义了一个“state变量”，与class里的this.state提供的功能完全相同
  ```

  

# 3.Effect Hook

可以在函数组件中执行副作用操作

（相当于componentDidMount、componentDidUpdate、componentWillUnmount三个生命周期函数的结合）

- **useEffect**

  ```react
  import React, { useState, useEffect } from 'react';
  
  function Example() {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    });
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
  
  通过此函数可以告诉React组件需要在渲染后执行某些操作，React会保存传递的函数，并且在执行DOM更新之后调用它。
  
  useEffect放在组件内部可以直接访问 useState的变量。Hook使用的是JavaScript闭包机制
  
  默认情况下,会在第一次渲染和每次更新之后都会执行，保证每次运行effect的时候，DOM都已经更新完毕（componentDidMount和componentDidUpdate）
  useEffect返回的函数会在每次重新渲染清除的时候调用（componentWillUnmount只在组件卸载的时候调用）
  避免了在class组件中因为没有处理更新逻辑而导致常见的bug
  
  
  相对于class的生命周期函数，可以将相关的逻辑放在同一个useEffect中，不相关的逻辑放在不同的useEffect中
  ```

  - 性能优化

    ```
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    }, [count]); // 仅在 count 更改时更新
    
    第二参数是一个数组，只有在这个数组里的元素更新之后才会执行effect，如果没变则不执行从而达到性能优化的目的
    ```

    

# 4.Hook 规则

- **只在最顶层使用Hook**
  - 不在循环、条件或嵌套函数中调用Hook
- **只在React函数中调用Hook**
- 通过Hook的调用顺序，Hook的调用顺序在每次渲染中都是相同的，以此来获知state的对应useState

# 5.自定义Hook

- 将Hook定义在一个单独的函数中，可以自定义该函数需要的参数以及返回值，在需要使用的组件中引用该函数并传入相关参数。
  - 自定义Hook必须以use开头
  - 在两个组件中使用相同的Hook不会共享state和effect，它们是完全隔离的

