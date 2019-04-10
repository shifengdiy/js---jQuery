/**
 * js之柯里化
 * 柯里化的作用就是三个1、参数复用 2、延迟执行 3、扁平化
 * 就是通过返回一个新的函数返回扁平化和延迟执行,一般的操作方式就是提前传入一部分参数，返回一个新函数，然后新函数接收其余的参数完成执行
 * 所以fn的最终接收参数分为两部分，然后完成执行
 */

//使用传统函数方式实现柯里化
function curry(fn, ...args){
  return function(){
    var newArgs = [...args, ...arguments];
    return fn.apply(null, newArgs);
  }
}

//使用bind实现柯里化
function bindCurry(fn, ...args){
  return fn(...args);
}

function test(v1, v2, v3){
  //这个测试函数接收三个参数求和，使用柯里化之后，可以先接收一部分参数，等待接收剩余参数之后然后再求和
  return v1+v2+v3;
}

//测试
const curryTest = curry(test, 1, 2);
console.log(curryTest(3));

const curryBIndTest = bindCurry.bind(null, test, 1, 2);
console.log(curryBIndTest(3));