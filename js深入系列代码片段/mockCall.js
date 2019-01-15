/**
 * js函数call方法的模拟实现
 * 包括简单模拟和全部特性模拟
 */

 //简单函数
 function foo(v1, v2, v3){
   console.log(v1, v2, v3);
   console.log(this.val);
   return this.val;
 }

 //模拟call方法，同时绑定在function原型上
 Function.prototype.selfCall = function(selfThis, ...val){
    var callFUn = this;
    selfThis.callFun = callFUn;
    const res = selfThis.callFun(...val);
    delete selfThis.callFUn;
    return res;
 }

 //高级解决方案，将函数绑定为方法对象时，可能和原来属性重复，使用ES6的symbol代替
 Function.prototype.selfProCall = function(selfThis, ...val){
   var symbolAttr = Symbol('callFunction');
   selfThis[symbolAttr] = this; //this指代当前要执行的方法
   let selfRes = selfThis[symbolAttr](...val);
   return selfRes;
 }

 /**
  * 使用经典函数师方法解决，并且不使用ES6扩展运算符
  */
 function mockCall(originFunc, selfThis){
   let args = [];
   let selfThis_beta = arguments[1]
   for(let i = 2;i < arguments.length;i++){
     args.push('arguments['+ i +']');
   }

   selfThis['_fn__'] = originFunc;
   const argsListString = args.toString(); //变长参数散列表达式的字符串形式，可以方传入函数
   const selfRes = eval('selfThis._fn__('+ argsListString +')')
   return selfRes; //返回结果
 }

 /** 
  * 方法测试
 */
foo.selfCall({val: 'test'}, 1,2,3,4);

foo.selfProCall({val: 'procall'}, 1, 2, 3, 4);

 mockCall(foo, {val: 'origin mock call'}, 1, 2, 3, 4);