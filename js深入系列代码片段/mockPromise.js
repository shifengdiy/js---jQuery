/**
 * Promise对象的内部原理和模拟实现
 * 首先分析Promise的执行规则和具体流程：
 * 1、Promise拥有自身状态，由pending向fulfilled或者rejected状态改变
 * 2、Promise接收两个函数作为参数，第一个用于将Promise状态改变为fulfilled，第二个改变为rejected
 * 3、每当Promise状态发生改变，then方法就会执行，then同样接收两个函数作为参数，第一个用于处理fulfilled状态，第二个用于处理rejected状态，同时then方法可以链式调用，then方法必须返回一个Promise对象，如果不是则必须包装为Promise对象
 */

const Pending = 'pending';
const Fulfilled = 'fulfilled';
const Rejected = 'rejected';

 /**
  * 使用传统函数方法，使用异步方法构造一个Promise函数,实现基本的promise功能
  */
 function MyPromise(callbackProcess){ 
   //需要返回的Promise对象，初始状态为pending
   const process = {
     _state: Pending,
     _val: undefined,
     then: _then,
   };

  let fulfilled_cb = function(){},rejected_cb = function(){};
   
   function _resolve(res) {
     //用来将Promise状态改为fulfilled，同时传值给then方法
     process._state = Fulfilled;
     process._val = res;

     //执行fulfilled回调
     fulfilled_cb(res);
   }

   function _reject(err){
    //用来将Promise状态改为rejected，同时传err给then方法
      process._state = Rejected;
      process._val = err;

      //执行rejected回调
      rejected_cb(err);
   }

  function _then(fulfilled_callback, rejected_callback){ 
      if (typeof fulfilled_callback == 'function') {
       fulfilled_cb = fulfilled_callback;
      } 
 
      if (typeof rejected_callback == 'function') {
       rejected_cb = rejected_callback;
      }
 
  }

   if(typeof callbackProcess == 'function'){
     //执行传入的函数，在适当时候改变promise状态
      callbackProcess(_resolve, _reject);
   } else {
     process._state = Fulfilled;
   }

   return process;
 }
//测试
const p1 = MyPromise(function(resolve, reject){
  console.log('状态：开始');
  setTimeout(() => {
    resolve('状态：成功');
  }, 3000);
})
p1.then(function(res){
  console.log(res, '回调结束');
})



/**
 * 使用构造函数实现完全模拟Promise，实现Promise所有功能
 */
function AllPromise(asyncProcess){
  this._val = undefined;
  this._state = Pending;
  this.then = _then;
  this.final = _final;
  this.catch = _catch;

  this._resolve = _resolve;
  this._reject = _reject;

  //添加状态执行队列
  this._fulfilledQueue = [];
  this._rejectedQueue = [];

  try {
    asyncProcess(this._resolve.bind(this), this._reject.bind(this));
  } catch (error) {
    this._reject(error);
  }
 

  const _resolve = function(res){
    this._state = Fulfilled;
    this._val = res;

    //开始执行绑定的fulfilled队列,同时将执行队列改造成异步操作，防止占用主线程
    setTimeout(() => {
      while(cb = this._fulfilledQueue.shift()){
        //回调函数返回一个值，来充当then方法返回值，将此方法包装为Promise对象，同时拥有状态，以此实现链式调用
        cb(res); 
      }
    }, 0);
  }

  const _reject = function(err){
    this._state = Rejected;
    this._val = err;

    //开始执行绑定的rejected队列,同时将执行队列改造成异步操作，防止占用主线程
    setTimeout(() => {
      while(cb = this._rejectedQueue.shift()){
        cb(err);
      }
    }, 0);
  }

  const _then = function(fulfilled_cb, rejected_cb){
    if(typeof fulfilled_cb == 'function'){
      this._fulfilledQueue.push(fulfilled_cb);
    }
    if(typeof rejected_cb == 'function'){
      this._rejectedQueue.push(rejected_cb);
    }

  }

  const _catch = function(err_cb){
    if(typeof err_cb == 'function'){
      this._rejectedQueue.push(err_cb);
    }
  }

  //final回调的含义时，不管Promise的状态时fulfilled还是rejected，都会执行这个回调，由于状态时单一的，所以将这个回调函数同时加入两个队列中
  const _final = function(final_cb){
    if(typeof final_cb == 'function'){
      this._fulfilledQueue.push(final_cb);
      this._rejectedQueue.push(final_cb);
    }
  }

  //构造函数特定方法，接受一个Promise数组，使用其中最快完成回调的那个座位回调函数，抛弃其他Promise
  const race = function(){

  }

  //构造函数特定方法，接受一个Promise数组，等待所有Promise状态改变知后开始调用
  const all = function(){

  }

}
//测试





/**
 * 使用ES6的class方法，构造出一个Promise类
 */
