1. **src** 和 **href** 的区别

   - 相同点：都用于引用外部的资源
   - 不同点：
     - src：表示 **对资源的引用，指向内容会嵌入到当前标签所在的位置**。src会将其指向的资源下载并应用到文档内，例如js脚本。当浏览器解析到该元素时，会**暂停**其他资源的下载和处理，直到将资源加载、编译、执行完毕。
     - href：表示**超文本引用，它指向一些网络资源，建立和当前元素或本文档的链接关系。**当浏览器识别到它指向的文件时，就会**并行下载**资源，**不会停止**对当前文档的处理。常用在 a、link标签上。

2. **对HTML语义化的理解**

   **语义化**是指 **根据内容的结构化（内容语义化），选择合适的标签（代码语义化）**

   优点：

   - 对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，有利于SEO。语义类HIA支持读屏软件，根据文章可以自动生成目录。

   - 对开发者友好，使用语义类标签增强了可读性，结构更加清晰，开发者能清晰的看出网页的结构，便于团队的开发和维护

     ```
     <header></header>  头部
     <nav></nav>  导航栏
     <section></section>  区块（有语义化的div）
     <main></main>  主要区域
     <article></article>  主要内容
     <aside></aside>  侧边栏
     <footer></footer>  底部
     ```

3. **DOCTYPE的作用**

   DOCTYPE是HTML5中一种标准通用标记语言的文档类型声明，它的目的是**告诉浏览器（解析器）应该以什么样（html或xhtml）的文档类型定义来解析文档**，不同的渲染模式会影响浏览器对CSS代码甚至JavaScript脚本的解析。必须声明在HTML文档的第一行。

   浏览器渲染页面的两种模式（可通过document.compatMode获取，比如，语雀官网的文档类型是**CSS1Compat**）：

   - **CSS1Compat：标准模式（Strick mode）**，默认模式，浏览器使用W3C的标准解析渲染页面。在标准模式中，浏览器以其支持的最高标准呈现页面。
   - **BackCompat：怪异模式(混杂模式)(Quick mode)**，浏览器使用自己的怪异模式解析渲染页面。在怪异模式中，页面以一种比较宽松的向后兼容的方式显示。

4. **script标签中的defer和async的区别**

   **`defer`和`async`属性都是异步加载外部的js脚本，不会阻塞页面的解析。**

   区别：

   - 执行顺序：多个带`async`属性的标签，不能保证加载的顺序；多个代`defer`属性的标签，按照加载顺序执行。
   - 脚本是否并行执行：`async`属性，加载是异步加载不阻塞页面解析，但加载完成后会立即执行且阻塞页面解析。`defer`属性，加载也是异步加载不阻塞页面解析，但执行会放在页面解析完成后，`DOMContentLoaded`事件触发之前执行。

5. **常用的meta标签**

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

6. **HTML5更新内容**

   1. 语义化标签

      ```
      header：定义文档的页眉（头部）；
      nav：定义导航链接的部分；
      footer：定义文档或节的页脚（底部）；
      article：定义文章内容；
      section：定义文档中的节（section、区段）；
      aside：定义其所处内容之外的内容（侧边）；
      ```

   2. 媒体标签

      ```html
      1. audio：音频标签
      <audio src='' controls autoplay loop='true'></audio>
      属性：
      	controls 控制面板
      	autoplay 自动播放
      	loop=‘true’ 循环播放
      
      2. video:视频标签
      <video src='' poster='imgs/aa.jpg' controls></video>
      属性：
      	poster：指定视频还没有完全下载完毕，或者用户还没有点击播放前显示的封面。默认显示当前视频文件的第一针画面，当然通过poster也可以自己指定。
      	controls 控制面板
      	width
      	height
      	
      3. source:资源标签(因为浏览器对视频格式支持程度不一样，为了能够兼容不同的浏览器，可以通过source来指定视频源)
      <video>
       	<source src='aa.flv' type='video/flv'></source>
       	<source src='aa.mp4' type='video/mp4'></source>
      </video>
      
      ```

   3. DOM查询方法

      ```javascript
      document.querySelector()
      document.querySelectorAll()
      它们选择的对象可以是标签，可以是类(需要加点)，可以是ID(需要加#)
      ```

   4. WEB存储

      ```html
      HTML5 提供了两种在客户端存储数据的新方法：
      localStorage - 没有时间限制的数据存储
      sessionStorage - 针对一个 session 的数据存储
      ```

   5. **`drag` API**

      ```
      dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发。
      darg：事件主体是被拖放元素，在正在拖放被拖放元素时触发。
      dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。
      dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。
      dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。
      drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。
      dragend：事件主体是被拖放元素，在整个拖放操作结束时触发。
      ```

7. **img的srcset属性的作用**

   ```html
   <img src="image-128.png"
        srcset="image-128.png 128w, image-256.png 256w, image-512.png 512w"
        sizes="(max-width: 360px) 340px, 128px" />
   其中srcset指定图片的地址和对应的图片质量。sizes用来设置图片的尺寸零界点。对于 srcset 中的 w 单位，可以理解成图片质量。如果可视区域小于这个质量的值，就可以使用。浏览器会自动选择一个最小的可用图片。
   sizes="[media query] [length], [media query] [length] ... "
   sizes就是指默认显示128px, 如果视区宽度大于360px, 则显示340px。
   ```

8. ### **行内元素和块级元素**

   行内元素有：`a b span img input select strong`；

   块级元素有：`div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p`；

9. **Web Worker**

   ```
   在HTML页面中，在执行脚本时，页面的状态是不可相应的，直到脚本执行完成后，页面才变成可相应。Web Worker是运行在后台的js，独立于其他脚本，不会影响页面的性能。并且通过postMessage将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程了。
   
   如何创建 web worker：
   	1. 检测浏览器对于 web worker 的支持性
   	2. 创建 web worker 文件（js，回传函数等）
   	3. 创建 web worker 对象
   ```

10. **HTML5的离线存储和工作原理**

    ```
    离线存储指的是：在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。
    
    原理：HTML5的离线存储是基于一个新建的 .appcache 文件的缓存机制,通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示
    ```

11. **`Iframe`的优点和缺点**

    iframe元素会创建包含另外一个文档的内联框架

    优点：

    - 用于加载速度较慢的内容
    - 可以使脚本并行下载
    - 可以实现跨子域通信

    缺点：

    - iframe会阻塞页面的`onload`事件
    - 无法被一些搜索引擎索引识别
    - 会导致页面过多，不易管理

12. **`Canvas`和`SVG`的区别**

    **（1）SVG：** SVG可缩放矢量图形（Scalable Vector Graphics）是基于可扩展标记语言XML描述的2D图形的语言，SVG基于XML就意味着SVG DOM中的每个元素都是可用的，可以为某个元素附加Javascript事件处理器。在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

    其特点如下：

    - 不依赖分辨率
    - 支持事件处理器
    - 最适合带有大型渲染区域的应用程序（比如谷歌地图）
    - 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
    - 不适合游戏应用

    **（2）Canvas：** Canvas是画布，通过Javascript来绘制2D图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制。

    其特点如下：

    - 依赖分辨率
    - 不支持事件处理器
    - 弱的文本渲染能力
    - 能够以 .png 或 .jpg 格式保存结果图像
    - 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

    注：矢量图，也称为面向对象的图像或绘图图像，在数学上定义为一系列由线连接的点。矢量文件中的图形元素称为对象。每个对象都是一个自成一体的实体，它具有颜色、形状、轮廓、大小和屏幕位置等属性。
    
13. **浏览器产生乱码的原因**

    ```makefile
    原因：
    	1. 网页源代码是gbk的编码，而内容中的中文字是utf-8编码的，这样浏览器打开会出现html乱码
    	2. 从数据库获得的数据编码和网页编码不同也会乱码
    	
    解决：
    	1. 保持编码一致，不一致应转码
    ```

14. **渐进增强和优雅降级**

    **`渐进增强`**：主要是针对低版本的浏览器进行页面重构，保证基本的功能情况下， 再针对高级浏览器进行效果、交互等方面的改进和追加功能，以达到更好的用户体验。

    **`优雅降级`**：一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容。

    ```
    两者区别：
    1. 优雅降级是从复杂的现状开始的，并试图减少用户体验的供给；而渐进增强是从一个非常基础的，能够起作用的版本开始的，并在此基础上不断扩充，以适应未来环境的需要
    2. 降级意味着功能衰竭，而渐进增强则意味着往前看，同时保证其根基处于安全地带
    
    “优雅降级”观点认为应该针对那些最高级、最完善的浏览器来设计网站。而将那些被认为“过时”或有功能缺失的浏览器下的测试工作安排在开发周期的最后阶段，并把测试对象限定为主流浏览器（如 IE、Mozilla 等）的前一个版本。 在这种设计范例下，旧版的浏览器被认为仅能提供“简陋却无妨 (poor, but passable)” 的浏览体验。可以做一些小的调整来适应某个特定的浏览器。但由于它们并非我们所关注的焦点，因此除了修复较大的错误之外，其它的差异将被直接忽略。
    “渐进增强”观点则认为应关注于内容本身。内容是建立网站的诱因，有的网站展示它，有的则收集它，有的寻求，有的操作，还有的网站甚至会包含以上的种种，但相同点是它们全都涉及到内容。这使得“渐进增强”成为一种更为合理的设计范例。这也是它立即被 Yahoo 所采纳并用以构建其“分级式浏览器支持 (Graded Browser Support)”策略的原因所在。
    ```

    

​    