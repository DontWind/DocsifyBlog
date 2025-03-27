# 1.文件目录

```
.
├── package.json
├── .umirc.ts
├── .env
├── dist
├── mock
├── public
└── src
    ├── .umi
    ├── layouts/index.tsx
    ├── pages
        ├── index.less
        └── index.tsx
    └── app.ts
```

- package.json

- .umirc.ts

  配置文件，包含umi内置功能和插件的配置

- .env

  环境变量

  ```json
  PORT=8888
  COMPRESS=none
  ```

- dist目录

  打包文件

- mock目录

  存储mock文件,此目录下所有js和ts文件会被解析为mock文件

- public目录

  此目录下所有文件会被copy到输出路径

- src

  - .umi目录

    临时文件目录,例如入口文件、路由等,都会被临时生成到这里

  - layouts/index.tsx

    约定式路由时的全局布局文件

  - pages目录

    所有路由组件都放在这里

  - app.ts

    运行时配置文件,扩展运行时的能力,例如修改路由、修改render方法。

# 2.配置

[配置](https://umijs.org/zh-CN/docs/config)

# 3.运行时配置

运行时配置和配置区别在于运行时配置运行在浏览器端

- 配置方式

  约定 src/app.tsx为运行时配置

- 配置项

  - modifyClientRenderOpts(fn)

    修改clientRender参数

    在微前端里动态修改渲染根节点

    ```react
    let isSubApp = false;
    export function modifyClientRenderOpts(memo) {
      return {
        ...memo,
        rootElement: isSubApp ? 'sub-root' : memo.rootElement,    
      };
    }
    ```

  - pathRoutes({routes})

    修改路由

    在路由列表前添加一个 /foo路由

    ```react
    export function patchRoutes({ routes }) {
      routes.unshift({
        path: '/foo',
        exact: true,
        component: require('@/extraRoutes/foo').default,
      });
    }
    ```

    可和render配置配合使用，请求服务端根据响应动态更新路由

  - render(oldRender:Function)

    覆写render

    用于渲染前之前做权限校验

    ```react
    import { history } from 'umi';
    
    export function render(oldRender) {
      fetch('/api/auth').then(auth => {
        if (auth.isLogin) { oldRender() }
        else { 
          history.push('/login'); 
          oldRender()
        }
      });
    }
    ```

  - onRouteChange({routes,matcheRoutes,location,action})

    在初始加载和路由切换时做一些事情

    设置标题

    ```react
    export function onRouteChange({ matchedRoutes }) {
      if (matchedRoutes.length) {
        document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
      }
    }
    ```

  - rootContainer(LastRootContainer,args)

    修改交给react-dom渲染时的根组件

    在根组件外面包一个Provider

    ```react
    export function rootContainer(container) {
      return React.createElement(ThemeProvider, null, container);
    }
    ```

    args包含:

    - routes,全量路由配置
    - plugin,运行时插件机制
    - history,history实例

# 4.路由

```js
export default {
  routes: [
    { exact: true, path: '/', component: 'index' },
    { exact: true, path: '/user', component: 'user' },
  ],
}
```

- **path**

  - Type: string

- **component**

  - Type:string
  - 相对路径: 会从src/pages开始寻找
  - 绝对路径: 如果指向src目录的文件,可以用@,也可以用../。

- **exact**

  - Type:boolean
  - Default:True

  是否严格匹配,即location是否和path完全一样

  ```react
  export default {
    routes: [
      // url 为 /one/two 时匹配失败
      { path: '/one', exact: true },
      { path: '/one' },
      
      // url 为 /one/two 时匹配成功
      { path: '/one', exact: false },
    ],
  }
  ```

- **routes**

- **redirect**:  路由跳转

- **wrappers**

  - Type:string[]

  配置路由的高阶组件封装

  可用于路由级别的权限校验

  ```js
  export default {
    routes: [
      { path: '/user', component: 'user',
        wrappers: [
          '@/wrappers/auth',
        ],
      },
      { path: '/login', component: 'login' },
    ]
  }
  
  在src/wrappers/auth 中
  import { Redirect } from 'umi'
  
  export default (props) => {
    const { isLogin } = useAuth();
    if (isLogin) {
      return <div>{ props.children }</div>;
    } else {
      return <Redirect to="/login" />;
    }
  }
  
  这样访问/user,就通过useAuth做权限校验，通过则渲染 user，否则跳转到login，渲染login
  ```

- **title**

  - Type：string  

    配置路由标题

- **页面跳转**

  ```js
  import {history} from 'umi'
  
  跳转到指定路由
  history.push('/list')
  
  带参数跳转到指定路由
  history.push('/list?a=b')
  history.push({
    pathname:'/list',
    query:{a:'b'}
  })
  
  跳转到上一个路由
  history.goBack();
  ```

  ![history](C:\Users\12411\Desktop\VSCode\Umi学习\图片\Snipaste_2021-06-16_09-04-11.png)

- **Link组件**

  ```js
  <Link to="/users">Users Page</Link>
  点击即可跳转到/users 路由
  ```

  - Link组件只用于单页应用的内部跳转，外部地址跳转请使用 a 标签

- **路由组件参数（props）**

  - match（匹配）：当前路由和 url match后的对象，包含 params、path、url 和 isExact属性
  - location：表示应用当前处于哪个位置，包含pathname、search、query等属性
  - history：https://umijs.org/zh-CN/api#history
  - route：当前路由配置，包含path、exact、component、routes
  - routes：全部路由信息

- **传递参数给子路由**

  ```
  import React from 'react';
  
  export default function Layout(props) {
    return React.Children.map(props.children, child => {
      return React.cloneElement(child, { foo: 'bar' });
    });
  }
  ```

# 5.约定式路由

**如果没有routes配置，Umi会进入约定式路由模式**

约定式路由也叫文件路由，就是不需要手写配置，**文件系统即路由**，通过目录和文件及其命名分析出路由配置。

https://umijs.org/zh-CN/docs/convention-routing

# 6.插件

**https://umijs.org/zh-CN/docs/convention-routing**

# 7.Mock数据

通过预先跟服务端约定好的接口，模拟请求数据和逻辑，能够让前端开发独立自主，不会被服务端的开发所阻塞。

- 约定式mock文件

  mock文件夹下所有的文件为mock文件。

- 关闭mock

  ```js
  配置关闭
  export default{
  	mock:false
  }
  
  环境变量临时关闭
  Mock=none umi dev
  
  ```

- 引入mock.js

  ```
  import mockjs from 'mockjs'; //
  
  export default {
    // 使用 mockjs 等三方库
    'GET /api/tags': mockjs.mock({
      'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
    }),
  };
  ```

# 8.环境变量、命令行工具

https://umijs.org/zh-CN/docs/env-variables、https://umijs.org/zh-CN/docs/cli

# 9. 按需加载

https://umijs.org/zh-CN/docs/load-on-demand

# 10.快速刷新

Fast Refresh 功能最大的特性是：开发环境下，可以保持组件状态，同时编辑提供即时反馈。

在配置文件加上 `fastRefresh:{}`即可开启

**限制：**

- Class类组件一律重刷，状态会被重置，包括高阶组件返回的Class组件
- 不纯组件模块，所编辑的模块除导出React组件外，还导出了其他模块
- 特殊的，还可以通过// @refresh reset 指令强制重刷，最大限度地保证可用性

# 11.服务端渲染

服务端渲染指由服务器完成页面的HTML结构拼接的页面处理技术，发送到浏览器，然后为其绑定状态与事件，成为完全可交互页面的过程

SSR应用场景：

- 有SEO诉求，用在搜索引擎检索以及社交分享，用在前台类应用。

- 首屏渲染时长有要求，常用在移动端、弱网情况下。

- 特性![服务端渲染特性](C:\Users\12411\Desktop\VSCode\Umi学习\图片\Snipaste_2021-06-16_11-16-34.png)

- 过程：解析执行JS=>构建HTML页面=>输出至浏览器

- 页面级数据预获取

  - 使用

    ```react
    每个页面可能有单独的数据预获取逻辑,可以通过获取页面组件上的 getInitialProps静态方法,执行后将结果注入到该页面的props中
    // pages/index.tsx
    import { IGetInitialProps } from 'umi';
    import React from 'react';
    
    const Home = (props) => {
      const { data } = props;
      return (
        {/* <div>Hello World</div> */}
        <div>{data.title}</div>
      )
    }
    
    Home.getInitialProps = (async (ctx) => {
      return Promise.resolve({
        data: {
          title: 'Hello World',
        }
      })
    }) as IGetInitialProps;
    
    /** 同时也可以使用 class 组件
    class Home extends React.Component {
      static getInitialProps = (async (ctx) => {
        return Promise.resolve({
          data: {
            title: 'Hello World',
          }
        })
      }) as IGetInitialProps
      render() {
        const { data } = props;
        return (
          <div>{data.title}</div>
        )
      }
    }
    */
    
    export default Home;
    ```

  - getInitialProps参数

    - match：与客户端页面props中的match一致，有当前路由的相关数据
    - isServer：是否为服务端在执行该方法。
    - route：当前路由对象
    - history：history对象

https://umijs.org/zh-CN/docs/ssr

# 12.预渲染

预渲染与服务端渲染唯一的不同点在于渲染时机：

- 服务端渲染的时机是在用户访问时执行渲染（即服务器渲染，数据一般是最新的）
- 预渲染的时机实在项目构建时，当用户访问时，数据不一定是最新的。预渲染在构建时执行渲染，将渲染后的HTML片段生成静态HTML文件。无需使用web服务器实时动态编译HTML，适用于静态站点生成。
- 过程:构建HTML页面=>输出至浏览器