/**
 * 函数节流的实现，和常见的实现写法
 * 函数节流的基本原理是，面对大量事件洪流，只需要按照时间片取出几个，时间段不到就不取
 * 
 * 所以函数节流就是每隔一段时间执行一次事件，利用时间段取出特定的来执行
 * 节流对于mousemove，scroll更加常用，节省事件触发次数
 */
window.addEventListener('load', function(){
  let app = document.querySelectorAll('.throttle');
  let count = 0;
  app[0].addEventListener('mousemove', throttle_1(function(){
    count++;
    this.innerHTML = count;
  }, 1650))
})
  3
//使用时间戳的节流方式，最常见方法，首个动作会被立刻执行，但是最后一个动作可能不执行
const throttle_1 = function(action, wait = 100){
  var previous = 0;
  
  return function(){
    var now = new Date;
    var self = this;
    //判断两次触发间隔是否达到节流时间
    if(now - previous > wait){
      //超过节流时间，可以执行动作
      action.call(self);
      previous = now;
    }
  }
}

//使用定时器方式，第一个动作会在wait时间结束后执行，但是停止触发后，最后一个动作必被执行
//利用间隔设置timeoutID为null，导致会在一连串的时间间隔内执行函数，其他时间不执行
const throttle_2 = function(action, wait){
  var timeOutId;
  var previous = 0;
  return function() {
    var self = this;
    if(!timeOutId){
      timeOutId = setTimeout(function(){
        timeOutId = null;
        action.call(self);
      }, wait)
    }
  }
}

/**
 * 
 * 两种方式合并，这部分的逻辑非常复杂，加入了两个边缘情况，首先第一次动作会立刻执行，然后事件停止后，会在wait时间之后，再执行一次
 * 然后具有可选项，leading：false 表示禁用第一次执行，trailing: false 表示禁用停止触发的回调
 * 一般情况下，首个动作立刻执行，然后后续满足条件执行就可以了，如果由特殊需要，可使用这个版本
 */
const throttle_3 = function(action, wait){
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
  };

  var throttled = function() {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
          if (timeout) {
              clearTimeout(timeout);
              timeout = null;
          }
          previous = now;
          func.apply(context, args);
          if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
      }
  };
  return throttled;
}