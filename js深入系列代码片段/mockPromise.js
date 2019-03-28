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
  * 使用传统函数方法，使用异步方法构造一个Promise函数
  */
 function MyPromise(callbackProcess){ 
   //需要返回的Promise对象，初始状态为pending
   const process = {
     _state: Pending,
     _val: undefined,
   };
   
   function _resolve(res) {
     //用来将Promise状态改为fulfilled，同时传值给then方法
     process._state = Fulfilled;
     process._val = res;
   }

   function _reject(err){
    //用来将Promise状态改为rejected，同时传err给then方法
      process._state = Rejected;
      process._val = err;
   }

   if(typeof callbackProcess == 'function'){
     //执行传入的函数，在适当时候改变promise状态
      callbackProcess(_resolve, _reject);
   }

   return process;
 }

/**
 * 使用ES6的class方法，构造出一个Promise类
 */
