## 介绍HTTP协议

HTTP是一个**基于TCP/IP**通信协议来传递数据。HTTP是一个属于**应用层**的**面向对象**的协议，由于其**简捷、快速**的方式，使用于分布式超媒体信息系统。浏览器作为HTTP客户端通过URL向HTTP服务端即WEB服务器发送所有请求。Web服务器根据接收到的请求后，向客户端发送响应信息。

## http和**https**

**基本概念**

**http**:超文本传输协议，是互联网上应用最为广泛的一种网络协议，是一个客户端和服务器端请求和应答的标准（TCP），用于从**www服务器**传输超文本到本地浏览器的**传输协议**，它可以使浏览器更加**高效**，使网络传输**减少**

**https**:以**安全**为目标的HTTP通道，简单讲是HTTP的安全版，即HTTP下加**SSL层**，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。

https协议的主要作用是：建立一个**信息安全通道**，来确保**数据**的传输，确保网站的**真实性**。

**区别**

- HTTPS协议需要ca证书（数字证书）,费用较高
- http是超文本传输协议，信息是**明文**传输，https则是具有安全性的ssl**加密**传输协议
- 一般而言，http协议的端口为**80** ，https的端口为**443**
- http的连接**简单**，是**无状态**的；https是可进行**加密传输**、**身份认证**的网络协议。

**工作原理**

1. 客户端使用https访问服务器，则要求web服务器建立ssl连接。
2. web服务器接收到客户端的请求之后，会将网站的证书（证书中包含了公钥），返回或者说传输给客户端
3. 客户端和服务器端开始协商SSL链接的安全等级，也就是加密等级。
4. 客户端浏览器通过双方协商一致的安全等级，**建立会话密钥**，然后通过网站的公钥来**加密会话密钥**，并传送个网站。
5. web服务器通过自己的**私钥解密**出**会话密钥**
6. web服务器通过会话密钥加密与客户端之间的通信

**HTTPS协议的优点**

1. 可确保数据发送到**正确**的客户机和服务器。
2. 因为可进行加密传输，身份认证，所以可防止数据在传输过程中**不被窃取、改变、确保数据的完整性**
3. 大幅增加了中间人攻击的成本

**HTTPS的缺点**

1. https握手阶段比较**费时**，会使页面加载时间**延长**，增加**耗电**
2. 缓存不如http高效，会**增加**数据**开销**
3. 费用较高
4. SSL证书需要绑定ip，不能再同一个ip上绑定多个域名，Ipv4资源支持不了这种消耗。

## TCP

**三次握手**

第一次握手：S只可以确认自己可以接收C发送的报文段

第二次握手：C可以确认S收到了自己发送的报文段，并且确认自己可以接收S发送的报文段

第三次握手：S可以确认C收到了自己发送的报文段

### TCP三次握手

客户端发送syn报文询问服务器是否可以建立连接

服务器接收到syn报文后，发送syn报文和ack报文

客户端收到服务器的syn和ack报文后，返回确认包ack，此包发送完毕后，双方进入连接状态



### TCP四次挥手

https://baijiahao.baidu.com/s?id=1654225744653405133&wfr=spider&for=pc

客户端发送连接释放FIN报文，FIN=1，请求关闭连接，并进入终止等待1状态

服务器接收FIN报文后，返回确认报文ACK=1，并进入关闭等待状态

客户端收到服务器发送的ACk报文后，进入终止等待2状态

服务器在将最后的数据发送完毕后，就发送FIN报文，FIN=1，并进入最后确认状态

客户端收到FIN报文后，返回确认包ACK=1，并进入TIME_wait状态，若在经过2MSL时间后都没有再次收到FIN报文，便结束此次链接

服务器在收到确认报文后，便结束了此次TCP连接

### 为什么连接的时候是三次握手，关闭的时候却是四次挥手？

因为当服务器收到客户端的syn连接请求报文后，可以直接发送ack和syn报文，ack报文是用来应答的，syn报文是用来同步的。

但是当服务器收到FIN报文后，很可能不会立即关闭SOCKET，所以只能先回复一个ack报文，告诉客户端自己收到了FIN报文，然后只有等待服务器发送完所有的数据后，服务器才能发送FIN报文，因此不能一起发送。所以需要四次挥手。

### TCP和UDP的区别

1. TCP是**面向连接**的，udp是**无连接**的即发送数据前不需要先建立连接

2. TCP提供**可靠**的服务：**无差错、不丢失、不重复、按需到达**，因此适合大数据量的交换；UDP尽最大努力交付，即**不保证**可靠交付。

3. TCP是**面向字节流**；UDP**面向报文**，

4. TCP只能是**1对1**；UDP支持**1对1**，**1对多**

5. TCP的首部较大为**20字节**；UDP只有**8字节**

6. TCP是面向连接的**可靠性传输**，而UDP是**不可靠**的 

   ```
   tcp:面向连接、字节流提供可靠的服务，无差错、不丢失、不重复、按需到达，只能1对1,首部20字节
   udp:无连接、面向报文的不可靠服务，尽最大努力交付，可1对多，首部8字节
   ```

   

## WebSocket的实现和应用

**什么是WebSocket**

WebSocket是HTML5中的协议，**支持持久连接**，http协议不支持持久性连接。HTTP1.0 和 HTTP1.1 都不支持持久性的链接，HTTP1.1中的 **keep-alive**，讲**多个**http请求**合并**为**一个**。

**WebSocket是什么样的协议，具体有什么优点？**

HTTP的生命周期通过Request来界定，也就是**一个Request对应一个Response**，在HTTP1.1 中进行了改进，有一个connection：Keep-alive，也就是在一个HTTP连接中，可以发送多个Request，接收多个Response。但是它们依然是**一一对应**的，而且Response是**被动**的，不能主动发起。

WebSocket是基于Http协议的，或者说借用了Http协议来完成一部分握手，在**握手阶段**与Http是**相同**的。

## HTTP请求的方式，HEAD方式

head:类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头

options：允许客户端查看服务器的性能，获取服务器支持的请求方式

## 一个图片url访问后直接下载怎样实现

请求的返回头里面，用于浏览器解析的重要参数就是**OSS**的API文档里面的返回**http头**，决定用户下载行为的参数。

下载的情况下：

1. x-oss-object-type:Normal
2. x-oss-request-id:598D5ED34F29D01FE2925F41
3. x-oss-storage-class:Standard

## Web Quality (无障碍)

能够被残障人士使用的网站才能称得上一个易用的（易访问的）网站。

残障人士指的是那些带有残疾或者身体不健康的用户。

使用alt属性：

<img src="person.jpg"  alt="this is a person"/>

有时候浏览器会无法显示图像。具体的原因有：

用户关闭了图像显示

浏览器是不支持图形显示的迷你浏览器

浏览器是语音浏览器（供盲人和弱视人群使用）
如果您使用了alt 属性，那么浏览器至少可以显示或读出有关图像的描述。

## BOM属性对象方法

BOM是浏览器对象

### location对象

- location.**href**--**返回**或**设置**当前文档的**URL**
- location.**search**--返回URL中的**查询字符串**部分，即包括（?）后面的内容
- location.**hash**--返回URL **# 后面**的的内容，如果没有#，返回空
- location.**host**--返回URL中的**域名**部分,例如www.dreamdu.com
- location.**hostname**--返回URL中的**主域名**部分，dreamdu.com
- location.**pathname**--返回**域名后**的部分,例如 http://www.dreamdu.com/xhtml/ 返回/xhtml/
- location.**port**--返回URL的**端口号**
- location.**protocol**--返回URL中的**协议**部分
- location.**assign**--**设置**当前文档的URL
- location.**replace()**--**替换**当前文档的URL，并且在history对象的地址列表中**移除**这个URL
- location.**reload()**--重新**加载**当前页面

### history对象

- history.**go()**--**前进**或**后退**指定的页面数
- history.**back()**--**后退一页**
- history.**forward()**--**前进一页**

### Navigator对象

- navigator.**userAgent**--返回用户代理头的字符串表示（包括浏览器版本信息等的字符串）
- navigator.**cookieEnabled**--返回浏览器是否支持cookie

## HTML5 drag api

- **dragset**:事件主体是被拖放元素，在**开始**拖放被拖放元素时触发
- **drag**:事件主体是被拖放元素，在**正在**拖放被拖放元素时触发
- **dragenter**:事件主体是目标元素，在被拖放元素**进入**某元素时触发。
- **dragover**:事件主体是目标元素，在被拖放在某元素内**移动**时触发
- **dragleave**:事件主体是目标元素，在被拖放元素**移出**目标元素时触发
- **drop**:事件主体是目标元素，在目标元素**完全接受**被拖动元素时触发
- **dragend**：事件主体是被拖放元素，在整个拖放**操作结束**时触发

## HTTP2.0

HTTP2.0是基于1999年发布的http1.0之后的首次更新

1. **提升了访问速度**
2. 允许**多路复用**，多路复用允许同时通过单一的HTTP/2连接发送**多重请求-响应信息**。改善了：在http1.1中，浏览器客户端在同一时间，针对同一域名下的请求有一定数量限制，超过限制会被阻塞
3. **二进制分帧**：HTTP2.0会将所有的传输信息**分割**为**更小**的信息或者帧，并对他们进行二进制**编码**
4. **首部压缩**
5. **服务器端推送**

## 400、401、403状态码

### 400:请求无效

产生原因：

- 前端提交数据的字段名称和字段类型与后台的实体没有保持一致
- 前端提交到后台的数据应该是json字符串类型，但是前端没有将对象JSON转化成字符串

### 401：当前请求需要进行用户身份验证

### 403：服务器已经收到请求，但是拒绝执行，即禁止访问

## fetch发送2次请求的原因

fetch发送post请求的时候，总是发送2次，第一次状态码是204，第二次才成功

因为用fetch的post请求的时候，fetch先发送了一个**Options请求**，询问服务器是否支持修改的请求头，如果服务器支持，则在第二次中发送**真正**的请求。

## Web Worker

> http://www.ruanyifeng.com/blog/2018/07/web-worker.html

在HTML页面中，如果在**执行**脚本时，页面的状态是**不可相应**的，知道脚本执行**完成**后，页面才变成**可相应**。web worker是运行在**后台**的js，**独立**于其他脚本，不会影响页面的性能，并且通过**postMessage**将结果回传到主线程。

**注意点：**

1. 同源限制

   分配给worker线程运行的脚本，必须与主线程的脚本文件同源

2. DOM限制

   无法读取主线程所在网页的DOM对象，只能使用**navigator**和**location**对象

3. 通信联系 

   与主线程不能直接通信，必须通过**消息 postMessage**完成

4. 脚本限制

   不能执行**alert（）**和**confirm（）**方法，可以使用 **XMLHTTPRequest**对象发出ajax请求

5. 文件限制

   不能读取本地文件，所加载的脚本必须来自网络

**如何创建Web Worker：**

检测浏览器对于web worker的支持性

创建web worker文件

创建web worker对象

## HTML语义化标签指正确的标签包含了正确的内容

HTML语义化标签指正确的标签包含了**正确的内容**、**结构良好**、**便于阅读**

## iframe是什么？有什么缺点？

定义：iframe元素会创建**包含**另一个文档的**内联框架**

提示：可以将提示文字放在标签内，来提示某些不支持iframe的浏览器

缺点：

1. 会**阻塞**主页面的onLoad事件
2. 搜索引擎无法解读这种页面，**不利于SEO**
3. iframe和主页面**共享连接池**，而浏览器对相同区域有限制所以会**影响性能**。

## Doctype作用？

Doctype声明于文档**最前面**，告诉浏览器以**何种方式**来**渲染**页面

严格模式的**排版**和**JS运作模式**是以该浏览器支持的**最高标准**运行

混杂模式，**向后兼容**，模拟老式浏览器，防止浏览器无法兼容页面

## Cookie如何防范XSS攻击

XSS攻击是指攻击者在返回的HTMl中嵌入JavaScript脚本，为了减轻这些攻击，需要在HTTP头部设置set-cookie属性

**httponly**-这个属性可以防止XSS，它会**禁止**JavaScript脚本来**访问cookie**

**secure**-这个属性告诉浏览器**仅在**请求为**https**的时候发送cookie

## 一句话概括RESTFUL

用**URI定位资源**，用**HTTP描述操作**

## viewport和移动端布局（响应式布局）

### px和视口

1. #### 像素

   一个像素表示了计算机屏幕所能显示的**最小区域**，像素分为**css像素**和**物理像素**

   **css像素**：为web开发者提供，在**css**中使用的一个**抽象单位**

   **物理像素**：只与设备的**硬件密度**有关，任何设备的物理像素都是**固定**的。

2. #### 视口

   广义的视口指浏览器**显示内容的屏幕区域**，狭义的视口包括了**布局视口**，**视觉视口**和**理想视口**

   1. #### 布局视口：

      布局视口定义了pc网页在移动端的默认布局行为，默认为**980px**。

   2. #### 视觉视口

      表示浏览器内看到的网站的**显示区域**，用户可以通过**缩放**来查看网页的显示内容，从而改变视觉视口

   3. #### 理想视口

      理想视口或者说分辨率就是**给定**设备物理像素的情况下，**最佳**的布局视口

      **设备像素比DPR**：1DPR = 物理像素/分辨率

      在**不缩放**的情况下，一个css像素就对应一个dpr

      在移动端布局中，通过**viewport**元标签控制布局使得在理想视口下布局

      ```javascript
      <meta id="viewport" name="viewport" content="width=device-width;inital-scale=1.0;maximum-scale=1;user-scalable=no;" >
      ```

      | 属性名        | 取值    | 描述                                     |
      | ------------- | ------- | ---------------------------------------- |
      | width         | 正整数  | 定义布局视口的宽度，单位为像素           |
      | height        | 正整数  | 定义布局视口的高度，单位为像素，很少使用 |
      | initial-scale | [0,10]  | 初始缩放比例，1表示不缩放                |
      | minimum-scale | [0,10]  | 最小缩放比例                             |
      | maximum-scale | [0,10]  | 最大缩放比例                             |
      | user-scalable | yes／no | 是否允许手动缩放页面，默认值为yes        |

### 媒体查询

通过使用[@media](https://github.com/media)媒体查询可以针对不同的媒体类型定义不同的样式。

### 百分比

1. 子元素**height**和**width**的百分比相对于**直接**父元素的height和width
2. **top、bottom**相对于**直接非static定位**的父元素的**高度**；**left、right**相对于**直接非static定位**的父元素的**宽度**；
3. **padding**和**margin**:**不论**是垂直方向或者是水平**方向**，都相对于**直接父元素**的**width**
4. **border-radius**：相对于**自身的宽度**

**缺点**

- 计算困难
- 各个属性如果使用百分比，相对父元素的属性并不是唯一的，使用起来复杂

### rem

rem是一个**灵活的**、**可扩展**的单位，由浏览器转化像素并显示。与em单位不同，rem单位**无论嵌套层级**如何，都只相对于浏览器的**根元素（HTML元素）**的**font-size**

通过使用js脚本根据视图容器的大小，动态的改变font-size可以实现响应式布局。

```javascript
function refreshRem() {
    var docEl = doc.documentElement;
    var width = docEl.getBoundingClientRect().width;
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = window.rem = rem;
}
window.addEventListener('resize', refreshRem);
```

通过使用**px2rem**插件可以在**预处理**以px为单位的css文件时自动将所有的px变成rem单位。

**缺点**

必须通过js动态控制根元素font-size的大小，且必须将font-size的代码放在css样式之前

### vw/vh

| 单位 | 含义                              |
| ---- | --------------------------------- |
| vw   | 相对于视窗的宽度，视窗宽度是100vw |
| vh   | 相对于视窗的高度，视窗高度是100vh |
| vmin | vw和vh中的较小值                  |
| vmax | vw和vh中的较大值                  |

## click在IOS上有300ms延迟，原因及如何解决？

1. 禁用缩放

   ```js
   <meta name="viewport" content="width=device-width, user-scalable=no">
   ```

2. 使用FastClick

   原理：检测到touchend事件后，立刻触发模拟click事件，并且把浏览器300毫秒之后真正触发的事件给阻断掉。

## addEventListener参数

addEventListener(event,function,useCapture)

其中，event指定事件名；function指定事件触发时要执行的函数；**useCapture指定事件是否在捕获或冒泡阶段执行**。

## HTTP状态码

**100 Continue**

**继续**，客户端应继续其请求

**101 Switching Protocols**

**切换协议**。服务器根据客户端的请求**切换协议**。只能切换到**更高级**的协议，例如切换到HTTP的新版本协议。

**200 OK**

**请求成功**，一般用于**GET和POST**请求

**201 Created**

**已创建**，成功**请求并创建**了新的资源

**202 Accepted**

**已接受**，已经接受请求，但**未**处理**完成**

**203 Non-Authoritative Information**

**非授权信息**。请求成功，但返回的**meta**信息**不在原始**的服务器，而是一个**副本**

**204 No Content** 

**无内容**，服务器成功**处理**但**未返回**内容,在未更新网页的情况下，可确保浏览器继续显示当前文档。

**205 Reset Content**

**重置内容**，服务器处理成功，用户终端应重置文档视图，可通过此状态码清除浏览器的表单域。

**206 Partial Content**

**部分内容**，服务器成功处理了**部分GET**请求。

**300 Multiple Choices**

**多种选择**。请求的资源科包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端选择。   

**301 Moved Permanently**

> https://www.cnblogs.com/wuguanglin/p/redirect.html

**永久移动**。请求的资源已被永久的移动到新的URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求到应使用新的URI代替。

**302 Found** 

**临时移动**，与301类似，但资源只是临时被移动。客户端应继续使用原有URI

**303 See Other**

> https://www.cnblogs.com/wuguanglin/p/redirect.html

**查看其他地址**，与301类似，使用GET和POST请求查看

**304 No Modified** 

**未修改**，所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个**头信息**指出客户端希望只返回在**指定日期**之后的修改的资源。

**305 Use Proxy**

**使用代理**，所请求的资源**必须**通过**代理**访问。

**307 Temporary Redirect** 

**临时重定向**，只能使用**GET**请求重定向。

**400 Bad Request**

客户端的请求**语法错误**，服务器无法理解，例如参数错误。

**401 Unauthorized**

请求需要用户进行用户的**身份认证**

**403 Forbidden**

服务器理解客户端的请求，但**拒绝执行**此请求。

**404 Not Found**

服务器**无法**根据客户端的请求**找到**资源。

**405 Method Not Allowed**

客户端请求中的方法被禁止。

**406 Not Acceptable**

服务器**无法**根据客户端请求的**内容特性完成**请求。

**407 Proxy Authentication Required**

请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权

**408 Request Time-out**

**服务器等待客户端**发送的请求时间过长，**超时**

**409 Conflict**

服务器**完成**客户端的**PUT**请求可能返回此状态码，服务器处理请求时发生了**冲突**

**410 Gone**

客户端请求的资源已经不存在。410是以前**拥有**但现在被**永久删除**了

**411 Length Required**

服务器**无法处理**客户端发送的**不带Content-Length**的请求信息

**412 Precondition Falied** 

客户端请求信息的**先决条件**错误

**413 Request Entity Too Large**

由于请求的**实体过大**，服务器**无法处理**，因此**拒绝**请求。为**防止**客户端的**连续请求**，服务器可能会**关闭连接**。如果服务器**暂时无法处理**，则会**返回**包含一个**Retry-After的响应**信息

**414 Request-URI Too Large**

请求的**URI过长**，服务器**无法处理**

**415 Unsupported Media Type**

服务器**无法处理**请求附带的**媒体格式**。

**416 Requested range not satisfiable**

客户端请求的**范围无效**

**417 Expectation Failed**

服务器**无法满足Expect**的请求头信息

**500 Internal Sever Error**

服务器**内部错误**，无法完成请求。

**501 Not Implemented**

服务器**不支持**请求的**功能**，无法完成请求

**502 Bad Gateway**

作为**网关**或者**代理**工作的服务器尝试执行请求时，从远程服务器接收到了一个**无效的响应**

**503 Service Unavailable** 

由于**超载或系统维护**，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的**Rety-After头信息**中

**504 Gateway Time-out** 

充当**网关**或**代理**的服务器，**未及时**从远端服务器**获取请求**

**505 HTTP Version not supported**

服务器**不支持**请求的**HTTP协议版本**，无法完成处理

```
- 1xx：接受，继续处理
- 200：**成功，并返回数据**
- 201：已**创建**
- 202：已**接受**
- 203：成功，但**未授权**
- 204：成功，**无内容**
- 205：成功，**重置内容**
- 206：成功，**部分内容**
- 301：**永久**移动，**重定向**
- 302：**临时**移动，**可使用原有URI**
- 304：资源未修改，可使用缓存
- 305：**需代理访问**
- 400：**请求语法错误**
- 401：要求身份认证
- 403：拒绝请求
- 404：资源不存在
- 500：服务器错误


```



## HTTP常用请求头

| 协议头              | 说明                                                         |
| ------------------- | :----------------------------------------------------------- |
| Accept              | 可接受的**响应内容类型**（Content-Types）                    |
| Accept-Charset      | 可接受的**字符集**                                           |
| Accept-Encoding     | 可接受的**响应**内容的**编码方式**                           |
| Accept-Language     | 可接受的响应内容**语言**列表                                 |
| Accept-Datetime     | 可接受的按照**时间**来表示的响应内容**版本**                 |
| Authorization       | 用于表示**HTTP协议**中需要认证资源的**认证信息**             |
| Cache-Control       | 用来指定当前的请求/回复中的，**是否**使用**缓存**机制        |
| Cookie              | 由之前服务器通过**Set-Cookie**设置的一个HTTP协议Cookie       |
| Content-Length      | 以**8进制**表示的请求体的**长度**                            |
| Content-MD5         | **请求体**的内容的**二进制MD5**散列值，以**Base64编码**的结果。 |
| Content-Type        | 请求体的MIME类型（用于**POST**和**PUT**请求）                |
| Date                | 发送该消息的日期和时间                                       |
| Expect              | 表示客户端要求服务器做出**特定的行为**                       |
| From                | 发起此请求的用户的**邮件地址**                               |
| Host                | 表示服务器的**域名**以及服务器所**监听**的**端口号**         |
| If-Match            | **仅当**客户端提供的**实体**与服务器上对应的**实体相匹配**时，才进行对应的操作。主要用于像PUT这样的方法中，仅当用户上次更新某个资源后，该资源未被修改的情况下，才更新资源。 |
| If-Modified-Sice    | 允许在对应的资源**未被修改**的情况下**返回304**未被修改      |
| If-None-Match       | 对于**GET**和**HEAD**请求方法来说，当且仅当服务器上**没有**任何资源的 **ETag** 属性值与这个首部中列出的**相匹配**的时候，服务器端会**才返回**所请求的资源，响应码为**200**。对于其他方法来说，**当且仅当**最终确认**没有已存在**的资源的 **ETag**属性值与这个首部中所列出的**相匹配**的时候，**才**会对请求进行相应的**处理**。 |
| If-Range            | 如果该实体**未被修改**过，则**返回所缺少的**那一个或多个部分。**否则**，**返回整个**新的实体 |
| If-Unmodified-Since | 仅当该实体自某个**特定时间**以来**未被修改**的情况下，才发送**回应** |
| Max-Forwards        | **限制**该消息可被**代理**及**网关转发**的**次数**           |
| Origin              | 发起一个针对**跨域资源共享**的请求（该请求要求**服务器**在**响应**中**加入**一个**Access-Control-Allow-Origin**的消息头，表示访问控制所**允许**的**来源**） |
| Pragma              | 与具体的实现相关，这些字段可能在请求/回应链中的任何时候产生  |
| Proxy-Authorization | 用于**向代理**进行**认证**的认证**信息**                     |
| Range               | 表示请求某个**实体的一部分**，字节以**偏移0开始**            |
| Referer             | 表示浏览器所访问的**前一个页面**，可以认为是之前访问页面的链接将浏览器带到了当前页面。 |
| TE                  | 浏览器预期接受的传输时的编码方式：可使用回应协议头Transfer-Encoding的值用来表示浏览器希望在最后一个大小为0的块之后还接收到一些额外的字段 |
| User-Agent          | 浏览器的**身份标识**字符串                                   |
| Upgrade             | 要求服务器**升级**到一个**高版本协议**                       |
| Via                 | 告诉服务器，这个请求是由哪些代理发出的                       |
| Warning             | 一个一般性的警告，表示在**实体内容**体中可能**存在错误**。   |

## 强缓存、协商缓存

|          | 获取资源形式 | 状态码              | 是否发送请求到服务器                 | 相关字段                                                     |
| -------- | ------------ | ------------------- | ------------------------------------ | ------------------------------------------------------------ |
| 强缓存   | 从缓存取     | 200（from cache）   | **否**，直接从**缓存**取             | **expires**，**cache-control**，cache-control的**优先级高**于expires |
| 协商缓存 | 从缓存取     | 304（not modified） | 是，通过**服务器**来告知缓存是否可用 | **Last-Modified**/**If-Modified-Since**，**Etag**/**If-None-Match** |

### 使用环境

因为服务器上的资源不是一直固定不变的，大多数情况下它会更新，这个时候如果我们还访问本地缓存，那就相当于资源没有更新，用户看到的还是旧资源；所以我们希望服务器上的资源更新了浏览器就请求新的资源，没有更新就使用本地的缓存，以最大程度的减少因网络请求而产生的资源浪费。

![img](https://uploadfiles.nowcoder.com/images/20190312/311436_1552361773903_9DC69E327B4B3691E94CD9D52D10E2C1)

## 前端方向

### 降低请求量

1. 合并资源
2. 减少HTTP请求次数
3. minify/gzip压缩
4. webP
5. 懒加载

### 加快请求速度

1. 预解析DNS
2. 减少域名数
3. 并行加载
4. CDN分发

### 缓存

1. HTTP协议缓存请求
2. 离线缓存manifest
3. 离线数据缓存localStorage

### 渲染

1. JS/CSS优化
2. 加载顺序
3. 服务端渲染
4. pipeline

## GET和POST区别

1. get参数通过url传递，post参数在request body中
2. get请求在url中传递的参数是有**长度限制**，而post没有
3. get请求只能进行url编码，而post支持多种编码方式
4. get请求会被浏览器**主动缓存**，而POST不会，除非手动设置
5. get请求的参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留
6. 对参数的数据类型，GET只接受**ASCII**字符，而POST没有限制
7. get产生**一个**TCP数据包，POST产生**两个**TCP数据包

```
对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；
而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。
```



## HTTP支持的方法

1. GET
2. POST
3. HEAD
4. OPTIONS
5. PUT
6. DELETE
7. TRACE
8. CONNECT

## 如何画一个三角形

三角形原理：边框的均分原理

```css
div {
width:0px;
height:0px;
border-top:10px solid red;
border-right:10px solid transparent;
border-bottom:10px solid transparent;
border-left:10px solid transparent;
}
```

## HTML5新增元素

**HTML5**

**标签增删**

8个语义元素：header、section、footer、aside、nav、main、article、figure

内容元素：mark高亮、progress进度

新表单控件：calander、date、time、emai、url、search

新的input类型：color、date、datetime、datetime-local、email

移除过时标签：big、font、frame、frameset

**canvas绘图**

**多媒体**：audio、video、source、embed、track

**本地离线存储**：把需要离线存储在本地的文件列在一个manifest配置文件

**web存储**:LocalStorage、SessionStorage

**标签**

header，footer，nav，aside，section

**表单**

为input添加了color，emial，data，range等类型

**存储**

提供了sessionStorage，localStorage和离线存储

**多媒体**

音频元素 audio

视频元素 video

**地理定位**

**canvas**

**拖放**

**多线编程的web worker**

**websocket协议**

## 在地址栏里输入一个URL，到这个页面呈现出来，中间会发生什么？

### 简略步骤：

DNS解析

TCP连接

发送HTTP请求

服务器处理请求并返回HTTP报文

浏览器解析渲染页面

连接结束

### **具体步骤**

1. 输入URL，寻找此URL域名的服务器ip

   为了寻找ip，浏览器首先会寻找缓存，查看缓存中是否有记录，缓存的查找记录为：**浏览器缓存**==>**系统缓存**==>**路由器缓存**，缓存中没有则查找系统的**hosts文件**是否有记录，如果没有则查询**DNS服务器**，从而得到服务器的ip地址

2. 浏览器根据ip以及端口号发送http请求

   http请求报文会包括本次请求的信息（**请求方法**，**请求说明**，**请求附带的数据**）并将这个http请求封装在一个tcp包中，这个tcp包会依次经过传输层，网络层，数据链路层，物理层到达服务器。

3. 服务器解析请求返回相应的HTML

4. 浏览器根据HTML文件构建DOM树和CSSOM树，形成渲染树并进行布局

   浏览器根据HTML构建DOM树，在DOM树构建过程中，如果遇到JS脚本和外联JS，则会停止构建DOM树来执行和下载相应代码，这会造成阻塞，这就是为什么推荐JS代码应该放在HTML代码的后面，之后根据外部样式、内部样式、内联样式构建一个CSS对象模型树-CSSOM树，构建完成后和DOM树合并为渲染树，这里主要做的是排除非视觉节点，比如script，meta标签和排除display为none的结点，之后进行布局，布局主要是确定各个元素的位置和尺寸。

5. 渲染页面

   因为HTML文件中会含有图片，视频，音频等资源，在解析DOM的过程中，遇到这些都会进行**并行**下载，浏览器对每个域的并行下载数量有一定的限制，一般是4-6个。

6. 缓存问题

   在这些所有的请求中还需要关注缓存，缓存一般通过Cache-Control、Last-Modify、Expires等首部字段控制。Cache-Control和Expires的区别在于**Cache-Control使用相对时间**，**Expires**使用的是**基于服务器**端的**绝对时间**，因为存在时间差问题，一般采用Cache-Control。在请求这些有设置缓存的数据时，会先查看是否过期，如果没有过期则直接使用本地缓存，过期则请求并在服务器校验文件是否修改。如果上一次响应设置了ETag值会在这次请求的时候作为If-None-Match的值交给服务器校验，如果一致，继续校验Last-Modified，没有设置ETag则直接验证Last-Modified，再决定是否返回304

## CSRF和XSS的网络攻击和防范

### CSRF：跨站请求伪造

可以理解为攻击者**盗用**了用户的身份，以用户的名义发送了恶意请求。

案例：在用户登录了一个网站后，在另一个标签页访问了攻击者用来制造攻击的网站，这个网站要求访问刚刚登录的网站，并发送了一个恶意请求，这就产生了CSRF攻击。

防御方式：使用验证码、检查http头部的refer（检查请求来源）、使用token

### XSS：跨站脚本攻击

攻击者通过注入恶意的脚本，在用户浏览网页的时候进行攻击，比如获取cookie，或者其他用户信息，可以分为存储型和反射型，存储型是攻击者输入一些数据并且存储到了数据库中，其他浏览者看到的时候进行攻击。反射型的话不存储在数据库中，往往表现为将攻击代码放在url地址的请求参数中

防御方式：为cookie设置httponly属性、对用户的输入进行检查、进行特殊字符过滤

## 怎么看网站的性能如何

检测页面加载时间一般有两种方式

一种是被动检测：就是在被检测的页面**植入脚本或探针**，当用户访问网页时，探针自动采集数据并传回数据库进行分析

一种是主动检测：即主动的搭建分布式受控环境，模拟用户发起页面访问请求，**主动采集性能数据并分析**，在检测的精准度上，专业的第三方工具效果更佳，例如性能极客



## cookie有哪些字段

name字段为一个cookie的名称

value字段为一个cookie的值

**domain**字段为可以访问此cookie的**域名**

非顶级域名，如二级域名或者三级域名，设置的cookie的domain只能为顶级域名或者二级域名或者三级域名本身，不能设置其他二级域名的cookie，否则cookie无法生成

顶级域名只能设置domain为顶级域名，不能设置为二级域名或者三级域名，否则cookie无法生成

二级域名能读取设置了domain为顶级域名或者自身的cookie，不能读取其他二级域名domain的cookie。所以要想cookie在多个二级域名中共享，需要设置domain为顶级域名，这样就可以在所有二级域名里面或者到这个cookie的值了。

顶级域名只能获取到domain设置为顶级域名的cookie，其他domain设置为二级域名的无法获取。

path字段为可以访问此cookie的页面路径。 比如domain是abc.com,path是/test，那么只有/test路径下的页面可以读取此cookie。

expires/Max-Age 字段为此cookie超时时间。若设置其值为一个时间，那么当到达此时间后，此cookie失效。不设置的话默认值是Session，意思是cookie会和session一起失效。当浏览器关闭(不是浏览器标签页，而是整个浏览器) 后，此cookie失效。

Size字段 此cookie大小。

http字段  cookie的httponly属性。若此属性为true，则只有在http请求头中会带有此cookie的信息，而不能通过document.cookie来访问此cookie。

secure 字段 设置是否只能通过https来传递此条cookie



## **script标签中的defer和async的区别**

**`defer`和`async`属性都是异步加载外部的js脚本，不会阻塞页面的解析。**

区别：

- 执行顺序：多个带`async`属性的标签，不能保证加载的顺序；多个代`defer`属性的标签，按照加载顺序执行。
- 脚本是否并行执行：`async`属性，加载是异步加载不阻塞页面解析，但加载完成后会立即执行且阻塞页面解析。`defer`属性，加载也是异步加载不阻塞页面解析，但执行会放在页面解析完成后，`DOMContentLoaded`事件触发之前执行。

## **常用的meta标签**

`meta` 标签由 `name` 和 `content` 属性定义，**用来描述网页文档的属性**

```html
<meta charset="UTF-8"> HTML文档的编码类型
<meta name="keywords" content="关键词" /> 页面的关键词
<meta name="description" content="页面描述内容" /> 页面描述
<meta http-equiv="refresh" content="0,url=" /> 页面重定向和刷新
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" > 适配移动端，可以控制视口的大小和比例
其中viewport的content 参数有以下几种：
width viewport ：宽度(数值/device-width)
height viewport ：高度(数值/device-height)
initial-scale ：初始缩放比例
maximum-scale ：最大缩放比例
minimum-scale ：最小缩放比例
user-scalable ：是否允许用户缩放(yes/no）
```

## **src** 和 **href** 的区别

- 相同点：都用于引用外部的资源
- 不同点：
  - src：表示 **对资源的引用，指向内容会嵌入到当前标签所在的位置**。src会将其指向的资源下载并应用到文档内，例如js脚本。当浏览器解析到该元素时，会**暂停**其他资源的下载和处理，直到将资源加载、编译、执行完毕。
  - href：表示**超文本引用，它指向一些网络资源，建立和当前元素或本文档的链接关系。**当浏览器识别到它指向的文件时，就会**并行下载**资源，**不会停止**对当前文档的处理。常用在 a、link标签上。



# 1.OSI七层模型

![](https://pic1.zhimg.com/80/v2-2d62ba265be486cb94ab531912aa3b9c_720w.jpg)

**OSI模型各层的基本作用**

![](https://pic2.zhimg.com/80/v2-436927a69a3574532059a78623d3095d_720w.jpg)

# 2.HTTP

1. **HTTP 0.9/1.0**

   0.9版本只支持GET方法，不支持请求头

   1.0版本扩展了0.9版本：	

   - 在请求中加入了HTTP版本号，如：`GET /coolshell/index.heml HTML/1.0`
   - HTTP开始有header了，
   - 增加了HTTP Status Code 标识相关的状态码
   - 还有 `Content-Type`可以传输其它的文件了

2. **HTTP 1.1**

   解决了HTTP1.0的网络性能问题，以及增加了一些新的东西：

   - 可以设置 `keepalive`来让HTTP重用TCP链接，重用TCP链接可以节省每次请求都要在广域网上进行的TCP的三次握手的巨大开销，即“长连接”
   - 支持pipeline网络传输，只要第一个请求发出去了，不必等其回来，就可以发送第二个请求，可以减少整体的响应时间。（非幂等的POST方法或是有依赖的请求是不能被pipeline化的）
   - 支持 分片响应传输，在response时，不必说明Content-Length。客户端不能断开连接，直到收到客户端的EOF标识。这种技术又叫“服务端Push模型”，或是“服务端Push式的HTTP持久连接”
   - 增加了“cache control”机制
   - 增加了Language，Type，Language等header项
   - 主要增加了HOST头部字段，可以使服务器知道请求的是哪个网站。因为可以由多个域名解析到同一个IP上，要区分用户请求的是哪个域名，就需要在HTTP的协议中加入域名消息。


# 3.HTTPS

1. **数字证书申请**：服务器的运营人员像数字证书认证机构提出证书认证申请，数字证书认证机构在判明申请者的身份之后，会对已申请的公开密钥做数字签名，然后分配这个以签名的公开密钥，并将该公开密钥放入公钥证书绑定在一起。服务器将这份有数字认证机构颁发的公钥证书发送给客户端，以进行公开密钥加密方式通信。

2. **确认数据完整性**：

   1. 发送方从报文文本生成一个128位的散列值，发送方使用自己的私钥对这个摘要值进行加密来形成发送方的数字签名
   2. 发送方将数字签名作为报文的附件一起发送给接收方
   3. 报文的接收方首先从接收的原始报文中计算出128位散列值，再用发送方的公钥来对报文附加的数字签名进行解密。
   4. 如果两次得到的结果是一致的那么接收方可以确认该数字签名是发送方的，同时确认信息是真实的。

3. **中间人攻击**：

   1. 某网站有用于非对称加密的公钥A、私钥A’。
   2. 浏览器向网站服务器请求，服务器把公钥A明文给传输浏览器。
   3. 中间人劫持到公钥A，保存下来，把数据包中的公钥A替换成自己伪造的公钥B。（它当然也拥有对应的撕咬B‘）
   4. 浏览器生成一个用于对称加密的密钥X，用公钥B（浏览器无法得知公钥被替换了）加密后传给服务器
   5. 中间人劫持后用私钥B’解密得到密钥X，再用公钥A加密后传给服务器。
   6. 服务器拿到后用私钥A‘解密得到密钥X

   **根本原因是浏览器无法确认收到的公钥是不是网站自己的**

4. **证明浏览器收到的公钥是网站的公钥---数字证书**

   **数字证书**：包含网站A的信息，包括域名，公钥

   **如何防止数字证书被篡改**：

   

   ![](https://pic2.zhimg.com/80/v2-7c78935389af46e197e96d9cd91c06dd_720w.jpg)

   1. 数字签名制作过程：

      CA机构拥有非对称加密的私钥和公钥

      CA机构对证书明文数据T进行hash

      对hash后的值用私钥加密，得到数字签名S

   2. 浏览器验证过程：

      拿到证书，得到明文T，签名S

      用CA机构的公钥对S解密，得到S’（由于是浏览器信任的机构，所以浏览器保有它的公钥）

      用证书里指定的hash算法对明文T进行hash得到T’。

      若T'等于S'则表明证书可信，否则说明证书被篡改。

5. **能否篡改** 

   假设篡改了证书原文，但由于没有CA机构的私钥，所以无法等到此时加密后的签名，无法相应地篡改签名。浏览器收到该证书后会发现原文和签名解密后的值不一致，则说明证书已被篡改，证书不可信。

6. **能否掉包**：

   因为证书里包含了网站A的信息，包括域名，浏览器把证书里的域名与自己请求的域名比对一下就知道有没有被掉包了

7. **怎么证明CA机构的公钥是可信的**

   同样使用数字证书证明，操作系统、浏览器本身会预装一些它们信任的根证书，如果其中会有CA机构的根证书，这样就可以拿到它对应的可信公钥了

   实际上证书之间的认证也可以不止一层，可以A信任B，B信任C，以此类推，我们把它叫做`信任链`或`数字证书链`。也就是一连串的数字证书，由根证书为起点，透过层层信任，使终端实体证书的持有者可以获得转授的信任，以证明身份。

8. **每次进行HTTPS请求时都必须在SSL/TLS层进行握手传输密钥吗？**

   这也是我当时的困惑之一，显然每次请求都经历一次密钥传输过程非常耗时，那怎么达到只传输一次呢？

   服务器会为每个浏览器（或客户端软件）维护一个session ID，在TLS握手阶段传给浏览器，浏览器生成好密钥传给服务器后，服务器会把该密钥存到相应的session ID下，之后浏览器每次请求都会携带session ID，服务器会根据session ID找到相应的密钥并进行解密加密操作，这样就不必要每次重新制作、传输密钥了！

# 4.HTTP2.0

- **二进制分帧**

  http2.0之所以能够突破http1.x标准的性能限制，改进传输性能，实现低延迟和高吞吐量，就是因为其新增了二进制分帧层

  帧（Frame）包含部分：类型Type，长度length，标记Flags，流标识Stream和frame payload有效载荷

  消息（Message）：一个完整的请求或者响应，比如请求、响应等，由一个或多个Frame组成。

  流：连接中的一个虚拟信道，可以承载双向消息传输。每个流有唯一整数标识符。为了防止两端流ID冲突，客户端发起的流具有奇数ID，服务端发起的流具有偶数ID

  流标识是描述二进制frame的格式，使得每个frame能够基于http2发送，与流标识联系的是一个流，每个流是一个逻辑联系，一个独立的双向的frame存在于客户端和服务器端之间的http2连接中。一个http2连接上可包含多个并发打开的流，这个并发流的数量能够由客户端设置。

  在二进制分帧层上，http2.0会将所有传输信息分割为更小的消息和帧，并对它们采用二进制格式的编码将其封装，新增的二进制分帧层同时也能够保证http的各种动词，方法，首部都不受影响，兼容上一代http标准。首部信息header封装到Headers帧中，而request body将被封装到Data帧中。

  ![](https://user-gold-cdn.xitu.io/2019/10/31/16e208ee1d0caab8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- **多路复用/连接共享**

  在http1.1中，浏览器客户端在同一时间，针对同一域名下的请求有一定数量的限制，超过限制数目的请求会被阻塞。这也是为何一些站点会有多个静态资源CDN域名的原因之一。

  多路复用允许**同时**通过单一的http/2连接发起多重的请求-响应消息。有了新的分帧机制后，http2.0不再依赖多个TCP连接去实现多流并行了。每个数据流都拆分成很多互不依赖的帧，而这些帧可以交错（乱序发送），还可以分优先级，最后再在另一端把它们重新组合起来。

  http2.0的连接都是持久化的，而且客户端与服务器之间也需要一个连接即可。http2连接可以承载数十或数百个流的复用，多路复用意味着来自很多流的数据包能够混合在一起通过同一个连接传输。当到达终点时，再根据不同帧首部的流标识符重新连接将不同的数据流组装。

  ![](https://user-gold-cdn.xitu.io/2019/10/31/16e208ee1cebfa44?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

  上图展示了一个连接上的多个传输数据流：客户端向服务端传输数据帧stream5，同时服务端向客户端乱序发送stream1和stream3。这次连接上有三个响应请求乱序并行交换。、

- **头部压缩**

  http2.0使用encoder来减少需要传输的header大小，通讯双方各自缓存一份头部字段表，既避免了重复header的传输，又减小了需要传输的大小。

  对于相同的数据，不再通过每次请求和响应发送，通信期间几乎不会改变通用键-值对（用户代理、可接受的媒体类型等等）只需发送一次。

  如果请求中不包含首部，此时所有请求的首部都自动使用之前请求发送的首部。

  如果首部发生了变化，则只需要将变化的部分加入到header帧中，改变的部分会加入到头部字段表中，首部表在http2.0的连接存续期内始终存在，由客户端和服务器共同渐进地更新。

  常用的gzip等是报文内容（body）的压缩，http2.0用的是专门为首部压缩而设计的HPACK算法  

  - **压缩原理**：用header字段表里的索引代替实际的header。

    http 2.0的HPACK算法使用一份索引表来定义常用的http Header，把常用的http Header存放在表里，请求的时候便只需要发送在表里的索引位置即可。

    例如 :method=GET 使用索引值 2 表示，:path=/index.html 使用索引值 5 表示，如下图：

    ![](https://user-gold-cdn.xitu.io/2019/10/31/16e208ee3d18e3b3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

    只要给服务端发送一个 Frame，该 Frame 的 Payload 部分存储 0x8285，Frame 的 Type 设置为 Header 类型，便可表示这个 Frame 属于 http Header，请求的内容是：

    ```
    1GET /index.html
    ```

    为什么是 0x8285，而不是 0x0205？这是因为高位设置为 1 表示这个字节是一个完全索引值（key 和 value 都在索引中）。

    类似的，通过高位的标志位可以区分出这个字节是属于一个完全索引值，还是仅索引了 key，还是 key和value 都没有索引。

    因为索引表的大小的是有限的，它仅保存了一些常用的 http Header，同时每次请求还可以在表的末尾动态追加新的 http Header 缓存，动态部分称之为 Dynamic Table。Static Table 和 Dynamic Table 在一起组合成了索引表。

    HPACK 不仅仅通过索引键值对来降低数据量，同时还会将字符串进行霍夫曼编码来压缩字符串大小。

    ```
    以常用的 User-Agent 为例，它在静态表中的索引值是 58，它的值是不存在表中的，因为它的值是多变的。第一次请求的时候它的 key 用 58 表示，表示这是一个 User-Agent ，它的值部分会进行霍夫曼编码（如果编码后的字符串变更长了，则不采用霍夫曼编码）。
    
    服务端收到请求后，会将这个 User-Agent 添加到 Dynamic Table 缓存起来，分配一个新的索引值。客户端下一次请求时，假设上次请求User-Agent的在表中的索引位置是 62， 此时只需要发送 0xBE（同样的，高位置 1），便可以代表：User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.146 Safari/537.36。
    ```

    ![](https://user-gold-cdn.xitu.io/2019/10/31/16e208ee50805e63?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

    最终，相同的 Header 只需要发送索引值，新的 Header 会重新加入 Dynamic Table

- **请求优先级**

  将http消息分为很多独立帧之后，就可以通过优化这些帧的交错和传输顺序进一步优化性能。每个流都可以带有一个31比特的优先值：0 表示最高优先级；2的31次方-1 表示最低优先级。

  服务器可以根据流的优先级，控制资源分配（CPU、内存、带宽），而在响应数据准备好之后，优先将最高优先级的帧发送给客户端。高优先级的流都应该优先发送，但又不会绝对的。绝对地准守，可能又会引入首队阻塞的问题：高优先级的请求慢导致阻塞其他资源交付。

  分配处理资源和客户端与服务器间的带宽，不同优先级的混合也是必须的。客户端会指定哪个流是最重要的，有一些依赖参数，这样一个流可以依赖另外一个流。优先级别可以在运行时动态改变，当用户滚动页面时，可以告诉浏览器哪个图像是最重要的，你也可以在一组流中进行优先筛选，能够突然抓住重点流。

  - 优先级最高：主要的HTML
  - 优先级高：CSS文件
  - 优先级中：JS文件
  - 优先级低：图片

- **服务端推送**

  服务器可以对一个客户端请求发送多个响应，服务器向客户端推送资源无需客户端明确地请求。并且，服务端推送能把客户端所需要的资源随着index.html一起发送到客户端，省去了客户端重复请求的步骤。

  因为没有发起请求，建立连接操作，所以静态资源通过服务端推送的方式可以极大地提升速度。

  如果一个请求是由你的主页发起的，服务器很可能会响应主页内容、logo、以及样式表，因为服务器知道客户端会用到这些东西，这相当于在一个HTML文档内集合了所有的资源。

  服务器推送还有一个很大的优势：可以缓存，也让在遵循同源的情况下，不同页面之间可以共享缓存资源称为可能。

  ![](https://user-gold-cdn.xitu.io/2019/10/31/16e208ee5cbb8b0e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

  注意点：

  - 推送遵循同源策略
  - 这种服务端的推送是基于客户端的请求响应来确定的

  当服务端需要主动推送某个资源时，便会发送一个`Frame Type ：PUSH_PROMISE`的Frame，里面携带了PUSH需要新建的Steam ID。意思是告诉客户端：接下来我要用这个ID向你发送东西，客户端准备好接收。客户端解析Frame时，发现它是一个PUSH_PROMISE类型，便会准备接收服务端要推送的流。

- http2.0性能瓶颈

  因为现在所有的压力集中在底层一个TCP连接之上，TCP很可能就是下一个性能瓶颈，因为TCP分组的队首阻塞问题，单个TCP packet丢失导致整个连接阻塞，无法逃避，此时所有消息都会受到影响。

# 5.HTTP3.0（QUIC）

1. **为什么选择UDP**

   - 基于TCP开发的设备和协议非常多，兼容困难
   - TCP协议栈是Linux内部的重要部分，修改和升级成本大
   - UDP本身是无连接的、没有建链和拆链成本
   - UDP的数据包无队对头阻塞问题
   - UDP改造成本小

   > - QUIC协议最初由Google的Jim Roskind设计，实施并于2012年部署，在2013年随着实验的扩大而公开宣布，并向IETF进行了描述。
   > - QUIC提高了当前正在使用TCP的面向连接的Web应用程序的性能。它在两个端点之间使用用户数据报协议（UDP）建立多个复用连接来实现此目的。
   > - QUIC的次要目标包括减少连接和传输延迟，在每个方向进行带宽估计以避免拥塞。它还将拥塞控制算法移动到用户空间，而不是内核空间，此外使用前向纠错（FEC）进行扩展，以在出现错误时进一步提高性能。

   ![](https://img-blog.csdnimg.cn/20200922124129106.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

## 1.QUIC详解

1. **队头阻塞问题**：

   `队头阻塞是计算机网络中一种性能受限的现象，通俗来说就是：一个数据包影响了一堆数据包，它不来大家都走不了`

   - 队头阻塞问题可能存在于HTTP层和TCP层，在HTTP1.X时两个层次都存在该问题。

   ![](https://img-blog.csdnimg.cn/20200922124452630.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

   HTTP2.0的多路复用机制解决了HTTP层的队头阻塞问题，但是在TCP层仍然存在队头阻塞问题

   TCP协议在收到数据包之后，这部分数据可能是乱序到达的，但是TCP必须将所有数据收集排序整合后给上层使用，如果其中某个包丢失了，就必须等待重传，从而出现某个丢包数据阻塞整个连接的数据使用。

   多路复用是 HTTP2 最强大的特性 ，能够将多条请求在一条 TCP 连接上同时发出去。但也恶化了 TCP 的一个问题，队头阻塞 ，如下图示：![](https://img-blog.csdnimg.cn/20200922135620387.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

   - HTTP2 在一个 TCP 连接上同时发送 4 个 Stream。其中 Stream1 已经正确到达，并被应用层读取。

   - 但是 Stream2 的第三个 tcp segment 丢失了，TCP 为了保证数据的可靠性，需要发送端重传第 3 个 segment 才能通知应用层读取接下去的数据，虽然这个时候 Stream3 和 Stream4 的全部数据已经到达了接收端，但都被阻塞住了。

   - 不仅如此，由于 HTTP2 强制使用 TLS，还存在一个 TLS 协议层面的队头阻塞![](https://img-blog.csdnimg.cn/20200922135807354.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

   - QUIC多路复用和HTTP2类似。`在一条QUIC连接上可以并发发送多个HTTP请求（stream）`但是QUIC的多路复用相比HTTP2有一个很大的优势

     - QUIC 上的一个连接上的多个stream之间没有依赖。这样假如stream2丢了一个udp packet，也只会影响stream2的处理。不会影响stream2之前及之后的stream的处理。

       在很大程度上缓解甚至消除了队头阻塞的影响。

       QUIC协议是基于UDP协议实现的，`在一条链接上可以由多个流，流与流之间是互不影响的，当一个流出现丢包影响范围非常小，从而解决队头阻塞问题。`

2. **0RTT建链**

   RTT是衡量网络建链的常用指标，也就是数据包一来一回的时间消耗。

   ![](https://img-blog.csdnimg.cn/20200922124623833.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

   `RTT包括三部分：往返传播时延、网络设备内排队时延、应用程序数据处理时延`

   ![](https://img-blog.csdnimg.cn/20200922124649743.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

   一般来说HTTPS协议要建立完整链接包括：TCP握手和TLS握手，总计需要至少2-3个RTT，普通的HTTP协议也需要至少1个RTT才可以完成握手。然而QUIC协议可以实现在第一个包就可以包含有效地应用数据，从而实现0RTT，但这也是有条件的。

   什么是0RTT建链？（传输层0RTT就能建立连接，加密层0RTT就能建立加密连接）

   **QUIC的0RTT也是需要条件的额，对于第一次交互的客户端和服务端0RTT也是做不到的，毕竟双方完全的陌生,因此QUIC协议可以分为首次连接和非首次连接**

   1. 首次连接

      使用QUIC协议的客户端和服务端要使用1RTT进行密钥交换，使用的交换算法是DH算法

      首次连接过程：

      > 1. 客户端对于首次连接的服务端发送client hello请求
      > 2. 服务端生成一个素数p和一个整数g，同时生成一个私钥K~s_pri~为私钥，然后计算出公钥K~s_pub~=g^Ks_pri^ mod p，服务端将  K~s_pub~，p，g三个元素打包为config，后续发送给客户端。
      > 3. 客户端随机生成一个自己的私钥K~c_pri~，再从config中读取g和p，计算客户端公钥K~c_pub~=g^Kc_pri^ mod p。
      > 4. 客户端使用自己的私钥K~c_pri~和服务端发来的config中读取的服务端公钥K~s_pub~，生成后续数据加密用的密钥K=K~s_pub~^Kc_pri^ mod p。
      > 5. 客户端使用密钥K加密业务数据，并追加组件的公钥K~c_pub~，都传递给服务端。
      > 6. 服务端根据组件的私钥K~s_pri~和客户端公钥K~c_pub~生成客户端加密用的密钥K=K~c_pub~^Ks_pri^ mod p
      > 7. 为了保证数据安全，上述生成的密钥K只会生成使用一次，后续服务端会按照相同的规则生成一套全新的公钥和私钥，并使用这组公私钥生成新的密钥M。
      > 8. 服务端将新公钥和新密钥M加密的数据发给客户端，客户端根据新的服务端公钥和自己原来的私钥计算出本次的密钥M，进行解密。
      > 9. 之后的客户端和服务端数据交互都使用密钥M来完成，密钥K只使用一次。![](https://img-blog.csdnimg.cn/20200922125320566.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

   2. 非首次连接

      前面提到客户端和服务端首次连接时服务端传递了config包，里面包含了服务端公钥和两个随机数，客户端会将config存储下来，后续再连接时可以直接使用，从而跳过这个1RTT，实现0RTT的业务数据交互。

      客户端保存config是有时间期限的，在config失效之后人仍然需要进行首次连接时的密钥交换。

3.  前向安全问题

    `前向安全指的是密钥泄露也不会让之前加密的数据被泄露，影响的只有当前，对之前的数据无影响。`

    **前面提到QUIC协议首次连接时先后生成了两个加密密钥，由于config被客户端存储了，如果期间服务端私钥K~s_pri~泄露，那么可以根据K=K~c_pub~^Ks_pri^ mod p 计算出密钥K**

    **如果一直使用这个密钥进行加解密，那么就可以用K解密素有历史消息，因此后续又生成了新密钥，使用其进行加密，当时完成交互时则销毁，从而实现了前向安全**

    ![](https://img-blog.csdnimg.cn/20200922125953787.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

4. **前向纠错**

   前向纠错（也叫前向纠错码Forward Error Correction 简称FEC）是增加数据通讯可信度的方法。在单向通讯信道中，一旦错误被发现，其接收器将无权再请求传输。

   FEC是利用数据进行传输冗余消息的方法，当传输中出现错误，将允许接收器再建数据。

   > **QUIC实现**：Quic每发送一组数据就对这组数据进行异或运算，并将结果作为一个FEC包发送出去，接收方收到这一组数据后根据数据包和FEC包即可进行校验和纠错。

5. 连接迁移

   TCP协议使用五元组来表示一条唯一的连接，当我们从4G环境切换到wifi环境时，手机的IP地址就会发生变化，这时必须创建新的TCP连接才能继续传输数据

   **QUIC协议基于UDP实现摒弃了五元组的概念，使用64位的随机数作为连接的ID，并使用该ID表示连接。**

   基于QUIC协议之下，我们在日常wifi和4G切换时，或者不同基站之间切换都不会重连，从而提高业务层的体验

   ![](https://img-blog.csdnimg.cn/20200922130333415.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

6. **改进的拥塞控制**

   QUIC协议当前默认使用了TCP协议的Cubic拥塞控制算法，同时也支持 CubicBytes, Reno, RenoBytes, BBR, PCC 等拥塞控制算法。

   **改进：**

   1. **可插拔：**能够非常灵活的生效，变更和停止

      `应用程序层面就能实现不同的拥塞控制算法，不需要操作系统，不需要内核支持`。因为传统的TCP拥塞控制，必须要端到端的网络协议栈支持，才能实现控制效果，而内核和操作系统的部署成本非常高，升级周期长，不利于产品的快速迭代。

      `应用程序不需要停机和升级就能实现拥塞控制的变更`，只需要服务端修改配置并重启，完全不需要停止服务就能实现拥塞控制的切换。STGW在配置层面进行了优化，我们可以针对不同业务，不同网络制式，甚至不同的RTT，使用不同的拥塞控制算法。

   2. **单调递增的Packet Number**

      - TCP为了保证可靠性，使用了基于字节序号的Sequence Number及ACK来确认消息的有序到达。

      - QUIC同样是一个可靠的协议，它使用Packet  Number代替了TCP的sequence Number，并且每个Packet Number都严格递增，也就是说就算Packet N丢失了，重传的Packet Number也比原来的值N大。![](https://img-blog.csdnimg.cn/20200922133727910.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

      - TCP的重传缺点：如上图所示，无法确定响应是来自于原始请求还是重传请求。

      - ![](https://img-blog.csdnimg.cn/20200922133916874.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

        QUIC应为Packet Number的严格递增可以轻易的分辨原始请求和重传请求的响应。但是单纯的严格递增的Packet Number肯定是无法保证数据的顺序性和可靠性。QUIC又引入了一个 Stream offset的概念。

        ![](https://img-blog.csdnimg.cn/20200922134146426.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

        即一个Stream可以经过多个Packet传输，Packet Number严格递增没有依赖

        > Packet 里的 Payload 如果是 Stream 的话，就需要依靠 Stream 的 Offset
        > 来保证应用数据的顺序。
        > 如图所示，发送端先后发送了 Pakcet N 和 Pakcet N+1，Stream 的Offset 分别是 x 和 x+y。
        > 假设 Packet N 丢失了，发起重传，重传的 Packet Number 是 N+2，但是它的 Stream 的 Offset 依然是 x，这样就算 Packet N + 2 是后到的，依然可以将 Stream x 和 Stream x+y 按照顺序组织起来，交给应用程序处理。

      

   3. **不允许Reneging** ~（中途退出）~

      Reneging即接收方丢弃已经接收并且上报给SACK选项的内容。**`TCP 协议不鼓励这种行为，但是协议层面允许这样的行为。主要是考虑到服务器资源有限，比如 Buffer 溢出，内存不够等情况。`**

      Reneging对数据重传会产生很大的干扰。因为Sack都已经表明收到了，但是接收端事实上丢弃了该数据。

      QUIC 在协议层面禁止 Reneging，一个 Packet 只要被 Ack，就认为它一定被正确接收，减少了这种干扰。

   4. **更多的ACK块**

      TCP的Sack选项能够告诉发送方已经接收到的连续Segment的范围，方便发送方进行选择性重传。

      **由于TCP头部最大只有60个字节，标准头部占用了20字节，所以TCP Option最大长度只有40字节，再加上TCP TimeStamp Option占用了10个字节，所以留给Sack选项的只有30个字节。每一个SackBlock的长度是8字节，加上SackOption头部2个字节，也就意味着TCP Sack Option最大只能提供3个Block。**

      **`但是 QUIC ACK Frame可以同时提供256个 Ack Block，在丢包率比较高的网络下，更更多的Sack Block 可以提升网络的恢复速度，减少重传量。`**

   5. **ACK Delay：**

      TCP的Time Stamp选项没有计算接收端接收到Segment~（段，部分；）~到发送ACK该segment的事件。这个时间可以简称为ACK Delay。![](https://img-blog.csdnimg.cn/20200922134723577.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dvbGZHdWlEYW8=,size_16,color_FFFFFF,t_70#pic_center)

      - TCP的RTT计算方法![](https://img-blog.csdnimg.cn/20200922134807851.png#pic_center)
      - QUIC的RTT计算方法![](https://img-blog.csdnimg.cn/20200922134824234.png#pic_center)

   6. 基于Stream和connection级别的流量控制

      [基于 stream 和 connecton 级别的流量控制](https://blog.csdn.net/wolfGuiDao/article/details/108729560)

   7. 总结

      QUIC协议 存在的意义在于解决 TCP 协议的一些无法解决的痛点

      - 多次握手：TCP 协议需要三次握手建立连接，而如果需要 TLS 证书的交换，那么则需要更多次的握手才能建立可靠连接，这在如今长肥网络的趋势下是一个巨大的痛点
      - 队头阻塞：TCP 协议下，如果出现丢包，则一条连接将一直被阻塞等待该包的重传，即使后来的数据包可以被缓存，但也无法被递交给应用层去处理。
      - 无法判断一个 ACK 是重传包的 ACK 还是原本包的 ACK：比如 一个包 seq=1, 超时重传的包同样是 seq=1，这样在收到一个 ack=1 之后，我们无法判断这个 ack 是对之前的包的 ack 还是对重传包的 ack，这会导致我们对 RTT 的估计出现误差，无法提供更准确的拥塞控制
      - 无法进行连接迁移：一条连接由一个四元组标识，在当今移动互联网的时代，如果一台手机从一个 wifi 环境切换到另一个 wifi 环境，ip 发生变化，那么连接必须重新建立，inflight 的包全部丢失。

   

# 6.Websocket

1. **概述**

   Webscoket是Web浏览器和服务器之间的一种全双工通信协议，其中WebSocket协议由IETF定为标准，WebSocket API由W3C定为标准。一旦Web客户端与服务器建立起连接，之后的全部数据通信都通过这个连接进行。通信过程中，可互相发送JSON、XML、HTML或图片等任意格式的数据。

2. **与HTTP协议相比：**

   - 相同点：
     - 都是基于TCP的应用层协议
     - 都使用Request/Response模型进行连接的建立
     - 在连续的建立过程中对错误的处理方式相同，在这个阶段WS可能返回和HTTP相同的状态码。
     - 都可以在网络中传输数据
   - 不同点：
     - WS使用HTTP来建立连接，但是定义了一系列新的header域，这些域在HTTP中并不会使用
     - WS的连接不能通过中间人来转发，它必须是一个直接连接
     - WS连接建立后，通信双方可以在任何时刻向另一方发送数据
     - WS连接建立之后，数据的传输使用帧来传递，不再需要Request消息
     - WS的数据帧有序

3. **建立WS连接**

   ![](https://img-blog.csdnimg.cn/20200527233246458.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xMODQ1ODc2NDI1,size_16,color_FFFFFF,t_70)

   websocket是基于TCP的一个应用协议，与HTTP协议的关联之处在于websocket的握手数据被HTTP服务器当作HTTP包来处理，主要通过Update request HTTP包建立起连接，之后的通信全部使用websocket自己的协议。

   **请求：**TCP连接建立后，客户端发送Websocket的握手请求，请求报文头部如下：

   ```
   GET /uin=xxxxxxxx&app=xxxxxxxxx&token=XXXXXXXXXXXX HTTP/1.1
   Host: server.example.cn:443
   Connection: Upgrade
   Pragma: no-cache
   Cache-Control: no-cache
   User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36
   Upgrade: websocket
   Sec-WebSocket-Version: 13
   Accept-Encoding: gzip, deflate
   Accept-Language: zh-CN,zh;q=0.9
   Cookie: user_id=XXXXX
   Sec-WebSocket-Key: 1/2hTi/+eNURiekpNI4k5Q==
   Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
   Sec-WebSocket-Protocol: binary, base64
   
   第一行为为请求的方法，类型必须为GET，协议版本号必须大于1.1
   Upgrade字段必须包含，值为websocket
   Connection字段必须包含，值为Upgrade
   Sec-WebSocket-Key字段必须包含 ，记录着握手过程中必不可少的键值。
   Sec-WebSocket-Protocol字段必须包含 ，记录着使用的子协议
   Origin（请求头）：Origin用来指明请求的来源，Origin头部主要用于保护Websocket服务器免受非授权的跨域脚本调用Websocket API的请求。也就是不想没被授权的跨域访问与服务器建立连接，服务器可以通过这个字段来判断来源的域并有选择的拒绝。
   ```

   **响应：**服务器接收到请求后，返回状态码为101 Switching Protocols 的响应。

   ```
   HTTP/1.1 101 Switching Protocols
   Server: WebSockify Python/2.6.6
   Date: Wed, 27 May 2020 03:03:21 GMT
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Accept: hXXXXXXXXXXXXXXxGmM=
   Sec-WebSocket-Protocol: binary
   
   Sec-WebSocket-Accept字段是由握手请求中的Sec-WebSocket-Key字段生层的。
   ```

   ![](https://img-blog.csdnimg.cn/20200527233345809.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0xMODQ1ODc2NDI1,size_16,color_FFFFFF,t_70)

   ```
   FIN，指明Frame是否是一个Message里最后Frame（之前说过一个Message可能又多个Frame组成）；1bit，是否为信息的最后一帧
   RSV1-3，默认是0 (必须是0)，除非有扩展定义了非零值的意义。
   Opcode，这个比较重要，有如下取值是被协议定义的
   				0x00 denotes a continuation frame
   				0x01 表示一个text frame
   				0x02 表示一个binary frame
   				0x03 ~~ 0x07 are reserved for further non-control frames,为将来的非控制消息片段保留测操作码
   				0x08 表示连接关闭
   				0x09 表示 ping (心跳检测相关)
   				0x0a 表示 pong (心跳检测相关)
   				0x0b ~~ 0x0f are reserved for further control frames,为将来的控制消息片段保留的操作码
   Mask，这个是指明“payload data”是否被计算掩码。这个和后面的Masking-key有关，如果设置为1,掩码键必须放在masking-key区域，客户端发送给服务端的所有消息，此位的值都是1；
   Payload len，数据的长度，
   Masking-key，0或者4bit，只有当MASK设置为1时才有效。，给一个Websocket中掩码的意义
   Payload data，帧真正要发送的数据，可以是任意长度，但尽管理论上帧的大小没有限制，但发送的数据不能太大，否则会导致无法高效利用网络带宽，正如上面所说Websocket提供分片。
   Extension data：扩展数据，如果客户端和服务端没有特殊的约定，那么扩展数据长度始终为0
   Application data：应用数据，
   ```

   [阮一峰-Websocket](http://www.ruanyifeng.com/blog/2017/05/websocket.html) [Websocket使用配置](http://www.javashuo.com/article/p-rqpvtobu-ev.html)  [Websocket心跳、重连](http://www.javashuo.com/article/p-zzfkhypo-he.html)   [Websocket离线消息](https://blog.csdn.net/baicaim/article/details/109075038)

​     

​    

   