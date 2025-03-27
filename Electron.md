# 1.Electron

一个使用JavaScript、HTML和CSS构建桌面应用程序的框架，通过将Chromium和Node.js嵌入到二进制文件中，Electron允许维护一个JavaScript代码库，并创建跨域平台的应用程序。

# 2.进程模型

继承了来自Chromium的多进程架构，使得此框架在架构上非常相似于一个现代的网页浏览器

- 为什么不是一个单一的进程

  ```
  除了显示网页内容的主要能力之外，还有管理众多窗口和加载第三方扩展等职责。
  单一进程的模式意味着打开每个标签页的开销较少，当也意味着一个网站的崩溃或无响应会影响到整个浏览器
  多进程模式让每一个标签页在自己的进程中渲染，从而限制了一个网页上的有误或恶意代码可能导致的对整个引用程序造成的伤害
  ```

- 主进程

  每个Electron应用都有一个单一的主进程，作为应用程序的入口点。主进程在Node.js环境中运行，这以为着它具有require模块和使用所有Node.js API的能力。

- 窗口管理

  ```
  主进程使用BrowserWindow模块创建和管理应用程序窗口。
  BrowserWindow类的每个实例创建一个应用程序窗口，且在单独的渲染器进程中加载一个网页。
  当实例被销毁时，相应的渲染器进程也会被终止
  ```

- 渲染器进程

  ```
  负责渲染网页内容。
  渲染器无权直接访问require或其他Node.js API。为了在渲染器中直接包含NPM模块，必须使用与在web开发时相同的打包工具。
  ```

- 预加载脚本

  ```markdown
  该脚本包含了那些执行于渲染器进程中，且先于网页内容开始加载的代码。
  虽运行与渲染器的环境中，却能访问Node.js API而拥有了更多的权限。
  
  预加载脚本与渲染器共享同一个全局Window接口，并且可以访问Node.js API。
  
  预加载不能直接附加任何变量到window之中。
  因为预加载脚本与渲染器的主要运行环境是隔离开来的，以避免任何具特权的API到网页内容代码中。
  取而代之的是可以使用contextBridge模块来进行安全地实现交互。
  const { contextBridge} =require('electron')
  contextBridge.exposeInMainWorld('myAPI',{
  	desktop:true;
  })
  作用：
  	1. 通过暴露 ipcRenderer 帮手模块于渲染器中，可以使用进程间通讯来从渲染器触发主进程任务。（反之亦然？）
  	2. 在为远程URL上托管的现有web应用开发Electron封装，则可在window全局变量上添加自定义属性，可以在web客户端用上仅适用于桌面应用的逻辑
  ```

# 3.通知

允许开发者使用HTML5 通知API发送通知，然后使用当前运行中的系统的原生通知API来进行显示

```
/** 通知模块 */
const NOTIFICATION_TITLE = 'Title' //标题
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console' //通知内容
const CLICK_MESSAGE = 'Notification clicked' //按钮内容

new Notification(NOTIFICATION_TITLE, {
  body: NOTIFICATION_BODY
}).onclick = () => document.getElementById("output").innerText = CLICK_MESSAGE
```

# 4.最近文档

app.addRencentDocument(path)添加最近文档

app.clearRencentDocument(path)删除最近文档

# 5.应用程序进度条

win.setProgressBar(number)设置进度条

# 6.windows任务栏

- 弹窗列表

  ```javascript
  app.setUserTasks([
  	{
  		program:process.execPath,
      arguments:'--new-window',
      iconPath:process.execPath,
      iconIndex:0,
      title:'New Window',
      description:'Create a new Window'
  	}
  ])
  
  清除
  app.setUserTasks([])
  ```

- 缩略图工具栏

  ```javascript
  const { BrowserWindow } = require('electron')
  const path = require('path')
  
  const win = new BrowserWindow()
  
  win.setThumbarButtons([
    {
      tooltip: 'button1',
      icon: path.join(__dirname, 'button1.png'),
      click () { console.log('button1 clicked') }
    }, {
      tooltip: 'button2',
      icon: path.join(__dirname, 'button2.png'),
      flags: ['enabled', 'dismissonclick'],
      click () { console.log('button2 clicked.') }
    }
  ])
  
  清除
  win.setThumbarButtons([])
  ```

- 图标叠加

  ```
  win.setOverlayIcon('./overlay.png', 'Description for overlay')
  ```

- 闪烁框

  ```
  win.once('focus', () => win.flashFrame(false))//获取焦点取消闪烁
    setTimeout(() => {
      win.flashFrame(true)
    }, 1000)
  ```

# 7.键盘快捷键

- 本地快捷键（仅在应用程序被聚焦时触发）

  ```
  const { Menu, MenuItem } = require('electron')
  
  const menu = new Menu()
  menu.append(new MenuItem({
    label: 'Electron',
    submenu: [{
      role: 'help',
      accelerator: process.platform === 'darwin' ? "Alt+Cmd+I"："Alt+Shift+I"，
      单击：（）=> {控制台.log（"电子岩石！"） }
    }]
  }))
  
  Menu.setApplicationMenu(menu)
  ```

- 全局快捷键（即使应用程序没有获得键盘焦点）

  ```
  const { app, globalShortcut } = require('electron')
  
  app.whenReady().then(() => {
    globalShortcut.register('Alt+CommandOrControl+I', () => {
      console.log('Electron loves global shortcuts!')
    })
  }).then(createWindow)
  
  ```

- 浏览器窗口内快捷键

  - 使用web API方式

    应在渲染进程中使用addEventListener() API来监听 keyup 和 keydown DOM事件

    ```js
    function handleKeyPress(event){
      document.getElementById("last-keypress").innerText=event.key
      console.log(`你按下了${event.key}`)
    }
    window.addEventListener('keyup',handleKeyPress,true)
    ```

  - 拦截主进程中的事件

    在调度页面中的==keydown==和==keyup==事件之前，会发出==before-input-event==事件，可用于捕获和处理在菜单中不可见的自定义快捷方式
    
    ```
    const { app, BrowserWindow } = require('electron')
    
    app.whenReady().then(() => {
      const win = new BrowserWindow({ width: 800, height: 600 })
    
      win.loadFile('index.html')
      win.webContents.on('before-input-event', (event, input) => {
        if (input.control && input.key.toLowerCase() === 'i') {
          console.log('Pressed Control+I')
          event.preventDefault()
        }
      })
    })
    
    ```
    
  - 使用第三方库--mousetrap

    ```js
    Mousetrap.bind('4', () => { console.log('4') })
    Mousetrap.bind('?', () => { console.log('show shortcuts!') })
    Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')
    
    // combinations
    Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })
    
    // map multiple combinations to the same callback
    Mousetrap.bind(['command+k', 'ctrl+k'], () => {
      console.log('command k or control k')
    
      // return false to prevent default behavior and stop event from bubbling
      return false
    })
    
    // gmail style sequences
    Mousetrap.bind('g i', () => { console.log('go to inbox') })
    Mousetrap.bind('* a', () => { console.log('select all') })
    
    // konami code!
    Mousetrap.bind('up up down down left right left right b a enter', () => {
      console.log('konami code')
    })
    ```




# 8.在线/离线事件探测

==navigator.onLine==属性返回值：

- ==false==：如果所有网络请求都失败
- ==true==：在其他情况下都返回true

```
function updateOnlineStatus () {
  document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'
}

window.addEventListener('online', updateOnlineStatus)
window.addEventListener('offline', updateOnlineStatus)

updateOnlineStatus()

```

# 9.原生文件拖放

- 在preload.js中使用contextBridge方法注入window.electron.startDrag将向主线程发送IPC消息

  ```js
  const { contextBridge, ipcRenderer } = require('electron')
  const path = require('path')
  
  contextBridge.exposeInMainWorld('electron', {
    startDrag: (fileName) => {
      ipcRenderer.send('ondragstart', path.join(process.cwd(), fileName))
    }
  })
  
  ```

- 在index.html中添加拖动元素，并引用渲染脚本

- 渲染脚本

  调用通过上述contextBridge添加的方法来设置渲染器进程处理拖动事件

  ```js
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    window.electron.startDrag('drag-and-drop.md')
  }
  ```

- 在主进程中将收到的事件带上文件路径和图标扩展到正在拖动的文件

  ```js
  const { ipcMain } = require('electron')
  
  ipcMain.on('ondragstart', (event, filePath) => {
    event.sender.startDrag({
      file: filePath,
      icon: '/path/to/icon.png'
    })
  })
  
  ```

# 10.离屏渲染

[什么是离屏渲染](https://www.jianshu.com/p/24dac847cfc4)

**注意：**

- 有两种渲染模式可以使用（见下），只有未渲染区域传递到 `绘图` 事件才能提高效率。
- 您可以停止/继续渲染并设置帧速率。
- 最高帧速率为 240，因为更高的值只会带来性能上的损失而没有任何收益。
- 当网页上没有发生任何情况时，不会生成帧。
- 屏幕窗口始终创建为 [无边框窗口](https://www.electronjs.org/docs/api/frameless-window).

**渲染模式**

- GPU加速

  GPU加速渲染意味着使用GPU用于合成。则意味着帧必须从GPU拷贝过来，从而需求更多的资源，因此这会比软件输出设备更慢。这种模式的优点时支持WebGL，3D CSS动画

- 软件输出设备

  此模式使用软件输出设备在CPU中渲染，因此帧生成的速度要快的多。此模式优先于GPU加速模式

  要启用此模式，需通过调用==app.disableHardwareAccleration== API 来禁用GPU加速

**案例**

```js
const { app, BrowserWindow } = require('electron')
const fs = require('fs')

app.disableHardwareAcceleration()

let win

app.whenReady().then(() => {
  win = new BrowserWindow({ webPreferences: { offscreen: true } })

  win.loadURL('https://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    fs.writeFileSync('ex.png', image.toPNG())
  })
  win.webContents.setFrameRate(60)
})

```



# 11.主题模式

https://www.electronjs.org/docs/tutorial/dark-mode



# *行内样式不生效

<meta htto-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'"> 
