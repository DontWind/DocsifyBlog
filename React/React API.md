# 1.创建React元素

- cloneElement()

  - 参数

    ```react
    React.cloneElement(
    	element,
        [props],
        [...children]
    )
    
    以element元素为样板克隆并返回新的React元素。返回元素的props是将新的props与原始元素的props浅层合并后的结果。新的子元素将取代现有的子元素。而来自原始元素的key和ref将被保留
    
    等同于
    <element.type {...element.props} {...props} key={element.key} ref={element.key} >{children}</element.type>
    ```

- isValidElement()

  ```
  React.isValidElement(object)
  验证对象是否为React元素，返回值为true或false
  ```

- React.Children

  ```
  用于处理this.props.children不透明数据结构的实用方法
  ```

  - React.Children.map(...)

    ```
    React.Children.map(children,func)
    
    在children里的每个子节点上调用一个函数,并返回处理后的数组。如果子节点为null或undefined，则此方法将返回null或是undefined
    
    如果children时一个Fragment对象，它将被视为单一节点的情况处理，而不会被遍历
    ```

  - React.Children.forEach

    ```
    与React.Children.map()类似,但不但会数组
    ```

  - React.Children.count

    ```
    React.Children.count(children) 返回children中的组件数量
    ```

  - React.Children.only

    ```
    ...(Children) 验证children是否只有一个子节点，如果有则返回该子节点，否则抛出错误
    ```

  - React.Children.toArray

    ```
    ...(Children) 将children这个复杂的数据结构以数组的方式扁平展开并返回,并为每个子节点分配一个key.
    ```

# 2.ReactDOM

- hydrate

  ```
  用于服务端渲染
  ```

- unmountComponentAtNode()

  ``` react
  ...(container) 从指定DOM元素中卸载组件，会将其事件处理器和state一并清除。如果指定容器上没有对应已挂载的组件，这个函数什么也不做。如果组件被移除将返回true，如果没有组件可被移除会返回FALSE
  ```




# 3.合成事件

- **SyntheticEvent**

  它的实例将被传递给你的事件处理函数，它是React的浏览器的原生事件的跨浏览器包装器

- **焦点事件(onFocus、onBlur)**

  焦点事件在React DOM上的所有元素都有效，不只是表单元素。

  ```
  监听焦点的进入与离开
  function Example() {
    return (
      <div
        tabIndex={1}
        onFocus={(e) => {
          if (e.currentTarget === e.target) {
            console.log('focused self');
          } else {
            console.log('focused child', e.target);
          }
          if (!e.currentTarget.contains(e.relatedTarget)) {
            // Not triggered when swapping focus between children
            console.log('focus entered self');
          }
        }}
        onBlur={(e) => {
          if (e.currentTarget === e.target) {
            console.log('unfocused self');
          } else {
            console.log('unfocused child', e.target);
          }
          if (!e.currentTarget.contains(e.relatedTarget)) {
            // Not triggered when swapping focus between children
            console.log('focus left self');
          }
        }}
      >
        <input id="1" />
        <input id="2" />
      </div>
    );
  }
  ```

# 4.测试-Test Utilities

搭配所选的测试框架，轻松实现React组件测试 https://react.docschina.org/docs/test-utils.html

# 5.Test Render

提供一个React渲染器，用于将React组件渲染成纯JavaScript对象，无需依赖DOM或原生移动环境

https://react.docschina.org/docs/test-utils.html
