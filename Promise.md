promise是一个对象,

主要用于异步计算，

将异步操作队列化，按照期望的顺序执行，返回符合预期的结果

可以在对象间传递和操作promise，帮助我们处理队列

有三个状态

1. pending [待定]初始状态
2. fulfilled  [实现]操作成功
3. rejected [被否决]操作失败

当promise状态发生改变，就会触发then()里的响应函数处理后续步骤，状态一经改变后不会再变

```
function Promise(fn){
	//状态    
    let state = 'pending'
    // 结果
    let value = null
    const callbacks = []
    
    this.then = function(onFulfilled,onRejected){
        return new Promise((resolve,reject)=>{
			handle({
                onFulfilled,
                onRejected,
                resolve,
                reject,
            })
        })
    }
    this.catch = function(onError){
        return this.then(null,onError)
    }
    
    function handle(callback){
        if(state === 'pending'){
            callbacks.push(callback)
            return
        }
        
        const cb = state === 'fulfilled'?callback.onFulfilled:callback.onRejected;
        const next = state === 'fulfilled'? callback.resolve : callback.reject
        if(!cb){
            next(value)
            return
        }
        let ret;
        try{
            ret = cb(value)
        }catch(e){
            callback.reject(e)
        }
        callback.resolve(ret)
    }
    
    function resolve(newValue){
        const fn=()=>{
			if(state !== 'pending')return
            if(newValue && (typeof newValue === 'object' || typeof newValue === 'function')){
                const {then} = newValue
                if(typeof then === 'function'){
                    then.call(newValue,resolve,reject)
                    return
                }
            }
        	state = 'fulfilled'
        	value = newValue
        	handelCb()
        }
   		setTimeout(fn,0)
    }
    function reject(error){
        const fn=()=>{
			if(state !== 'pending')return
            if(error && (typeof error === 'object'||typeof error ==='function')){
                const {then} = error
                if(typeof then === 'function'){
                    then.call(error,resolve,reject)
                    return
                }
            }
            state = 'rejected'
            value = error
            handleCb()
        }
        setTimeout(fn,0)
    }
    function handelCb(){
		while(callbacks.length){
            const fn = callbacks.shift()
            handle(fn)
        }
    }
    try{
        fn(resolve,reject)
    }catch(ex){
        reject(ex)
    }
}
```



```javascript
红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：
var light = function(timer,cb){
    return new Pomise(function(resolve,reject){
        setTimeout(function(){
            cb()
            resolve()
        },timer)
    });
}

var step = function(){
    Promise.resolve().then(function(){
		return light(3000,red)
    }).then(()=>{
        return light(2000,green)
    }).then(()=>{
        return light(1000,yellow)
    }).then(()=>{
        step()
    })
}
```

```javascript
实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。
const timeout = ms => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, ms);
});
 
const ajax1 = () => timeout(2000).then(() => {
    console.log('1');
    return 1;
});
 
const ajax2 = () => timeout(1000).then(() => {
    console.log('2');
    return 2;
});
 
const ajax3 = () => timeout(2000).then(() => {
    console.log('3');
    return 3;
});
 
const mergePromise = ajaxArray => {
    // 在这里实现你的代码
 	var data = []
    var sequence=Promise.resolve()
    ajaxArray.forEach(item=>{
        sequence = sequence.then(item).then(res=>{
            data.push(res)
            return data
        })
    })
};
 
mergePromise([ajax1, ajax2, ajax3]).then(data => {
    console.log('done');
    console.log(data); // data 为 [1, 2, 3]
});
 
// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

```

```javascript
//异步加载
function loadImageAsync(url){
    return new Promise(function(resolve,reject){
        var image = new Image()
        image.onLoad=function(){
            resolve(image)
        }
        image.onerror=function(){
			reject(new Error('Could not load image at'+url))
        }
        image.src = url
    })
}
```

错误处理

第一种：

```javascript
reject().then(res=>{},err=>{})
```

第二种:

```
reject().then().catch(err=>{})
```

catch也会返回一个Promise实例，并且是resolved状态

若在catch中抛出错误，则是rejected状态

### Promise.all()

用于将多个实例包装成一个新的Promise实例，返回的实例是普通的Promise，接收一个数组作为参数，当所有的子Promise完成，该Promise完成，返回值是全部子Promise的值的数组，

任何一个失败，该Promise失败，返回第一个失败的子Promise值

### Promise.race()

有任意一个完成就算完成



promise封装

```javascript
function myPromise(callback){
    this.promiseStatus = 'pending'
    this.msg='pending';
    this.callbacks=[]
    let that = this;
    callback(
    	resolve,
        reject
    );
    function resolve(){
            that.promiseStatus = 'resolved';
            that.msg = arguments[0]
        }
    function reject(){
            that.promiseStatus = 'rejected';
            that.msg = arguments[0]
        }
    this.catch=function(onError){
        return this.then(null,onError)
    }
}
myPromise.prototype.then = function(){
	if(this.promiseStatus = 'resolved'){
        arguments[0](this.msg)
    }else if(this.promiseStatus = 'rejected'){
        arguments[1](this.msg)
    }
}
```

```js
function Promise(fn){
	let state = 'pending'
	let value = null
    const callbacks = []
    
    this.then=function(onFullfilled,onRejected){
        return new Promise((resolve,reject)=>{
			handle({
                onFilfillefd,
                onRejected,
                resolve,
                reject
            })
        })
    }
    
    this.catch=function(onError){
        return this.then(null,onError)
    }
    
    function handle(callback){
        if(state === 'pending'){
            callbacks.push(callback)
            return
        }
        
        const cb = state==='fulfilled'?callback.onFullfilled:callback.onRejected;
        const next = state === 'fulfilled'?callback.resolve:callback.reject;
        
        if(!cb){
            next(value)
            return
        }
        let ret
        try{
            ret=cb(value)
        }catch(e){
            callback.reject(e)
        }
        callback.resolve(ret)
    }
    
    function resolve(newValue){
        const fn=()=>{
            if(state !== 'pending')return
            if(newValue && (typeof newValue ==='object'||typeof newValue === 'function')){
				const {then} = newValue
                if(typeof then === 'function'){
                    // newValue 为新产生的 Promise,此时resolve为上个 promise 的resolve
                        //相当于调用了新产生 Promise 的then方法，注入了上个 promise 的resolve 为其回调
                    then.call(newValue,resolve,reject)
                    return
                }
            }
            state='fulfilled'
            value = newValue
            handelCb()
        }
        setTimeout(fn,0)
    }
    function reject(error){
        const fn=()=>{
			if(state!=='pending')return
        	if(error && (typeof error==='object'||typeof error ==='function')){
            	const {then}=error
            	if(typeof then==='function'){
                	then.call(error,resolve,reject)
                	return
            	}
        	}
            state='rejected';
            value=error
            handelCb()
        }
        setTimeout(fn,0)
    }
    function handelCb(){
        while(callbacks.length){
            const fn=callbacks.shift();
            handle(fn)
        }
    }
    try{
    	fn(resolve,reject)
    }catch(ex){
        reject(ex)
    }
}
```

