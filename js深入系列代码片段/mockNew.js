/**
 * 模拟new关键字，包括一些边缘情况
 */

function Foo(v1, v2) {
  this.val = v1;
  return v2;
}

Foo.prototype = {p: 'proto'};

/**
 * 这里先详细了解一下new构造函数的工作流程，
 * 首先需要创建一个新的空对象，并且将原型指向构造函数的prototype属性，
 * 然后执行构造函数，同时使用call指代this；
 * 有一个边缘情况，当构造函数返回一个对象是，抛弃以上流程，直接返回这个对象；
 */
function mockNew(constructor, ...args){
  var initObj = Object.create(constructor.prototype);
  //判断构造函数返回值是否是对象，是对象使用返回值而不是构造函数
  var resCons = constructor(...args);
  if(typeof resCons === 'object'){
    return resCons;
  } else {
    constructor.call(initObj, ...args);
    return initObj;
  }
 
}

//测试代码，正确的话会返回一个对象，如果第二个参数是对象则返回第二个对象，不然返回一个构造对象且有指定原型
let o1 = mockNew(Foo, 'conval', 'v2');
let o2 = mockNew(Foo, 'val1', {newVal: 'newobj'});
console.log(o1, o2);