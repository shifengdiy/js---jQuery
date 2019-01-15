/**
 * 模拟函数方法bind的实现
 * 使用ES6高级语法和原生经典函数
 */

 //需要模拟执行的函数
 function foo(v1, v2){
   console.log(v1, v2);
   console.log(this.val);
   return this.val;
 }

 /**
  * 使用ES6的symbol和扩展运算符来模拟,同时绑定在构造函数原型上
  */
 Function.prototype.seflBindPro = function(selfThis, ...args){
   const orginFunc = this;
   const f = function(...extraArgs){
    let allArgs = [...args, ...extraArgs];
    let fRes = orginFunc.call(selfThis, ...allArgs);
    return fRes;
   }
   return f; //这个过程其实使用了闭包，返回一个函数，并且使用外部变量
 }

 //测试bind模拟效果
 foo.seflBindPro({val: 'selfBindPro mock'}, 1)(2 , 3);
 