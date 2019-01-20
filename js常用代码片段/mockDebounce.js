/**
 * 函数防抖的实现，和常见场景的代码片段
 * 函数防抖的基本原理是延迟启动执行，当动作触发之后，动作执行需要一个准备时间，在准备时间内重新触发事件，会重新刷新启动时间
 * 只有在启动时间结束后，才能执行动作
 * 
 * 也可以认为防抖就是需要一段时间准备的执行动作，被打断的执行动作需要重新准备
 */

 window.addEventListener('load', function(){
   //debounce_1();
   //debounce_2();
   debounce_3();
 })

 //防抖示例第一版本代码，基本功能都实现
const debounce_1 = function(){
  var app = document.querySelectorAll('.debounce');
  var moveCount = 0;
 
  app[0].addEventListener('mousemove', debounce(function(){
    moveCount++;
    app[0].innerHTML = moveCount;
    console.log(this); //this指向了绑定元素
  }, 350));

  function debounce(action, wait){
    //基本原理，创建一个setimeoutId，
    var timeOut = '';
    return function() {
      let self = this; //这个this指代被绑定的元素

      clearTimeout(timeOut);
      timeOut = setTimeout(function(){
        action.call(self);
      }, wait);
    }
  }

} 

//第二版本代码，不使用闭包，同时将绑定元素传递进执行函数
const debounce_2 = function(){
  let timeoutId;
  var app = document.querySelectorAll('.debounce');
  var moveCount = 0;

  function debounce(action, wait){
    clearTimeout(timeoutId);
    timeoutId = setTimeout(action, wait);
  }

  app[0].addEventListener('mousemove', function(){
    let self = this; // 指代被绑定的元素
    debounce(function(){
      //具体描述动作
      moveCount++;
      self.innerHTML = moveCount;
    }, 150);
  })
}

//第三版本，完善代码，加入立即触发功能，传递self作为绑定元素使用，使用闭包，
/**
 * 这个版本是underscore的执行方式，已经和原始的防抖逻辑不一样了，第一个动作会立即执行，剩余的动作才会执行延迟准备执行
 * 
 * 整体的逻辑已经发生了变化，这段代码中，动作会立即被触发，然后动作进入冷却期，冷却时间内重新触发会刷新冷却期
 * 冷却结束后才能重新触发动作
 * 相当于第一个动作已经做好执行准备，然后动作冷却，准备执行下一个动作，这段时间里触发动作会刷新冷却时间，但不执行都工作，只有准备完成后才能执行动作
 * 
 * 这个版本比较复杂抽象，但也比较实用，直接copy使用就行，包含了防抖的常见需求
 */
const debounce_3 = function(){
  var app = document.querySelectorAll('.debounce');
  var moveCount = 0;

  app[0].addEventListener('mousemove', debounceAction(function(){
    moveCount++;
    this.innerHTML = moveCount;
  }, 150, true));

  function debounceAction(action, wait, isImediate){
    var timeoutId;

    return function(e){
      let self = this;

      if(timeoutId){
        clearTimeout(timeoutId);
      }
      if(isImediate){
        var callNow = !timeoutId;
        timeoutId = setTimeout(function(){
          timeoutId = null;
        }, wait);

        if(callNow){
          action.call(self);
        }
      } else {
        //不使用立即触发模式
        timeoutId = setTimeout(function(){
          action.call(self);
        }, wait)
      }
    }
  }
}
