/**
 * Vue的MVVM模式实现
 */

function MVVM(options = {}){
  //vm.$options 挂载所有属性
  this.$options = options;
  //简写属性，直接通过实例读取数据
  let data = this.$options.data;
  this._data = data;

  //劫持数据
  Observe(data);

  //完成数据代理，直接通过对象属性获取值
  for(let rootKey in data){
    Object.defineProperty(this, rootKey, {
      configurable: true,
      get() {
        return this._data[rootKey];
      },
      set(newVal) {
        this._data[rootKey] = newVal;
      } 
    });
  }
}

/**
 * 这里使用递归调用，主要是对于data对象的每个属性都要添加get，set方法，从而形成伪属性，利用递归遍历方式对每个属性使用Object.defineproperty方法
 */
function Observe(data){
  //使用js原生方法Object.defineProperty,完成get，set数据劫持
  for(let key in data){
    let val = data[key];
    //继续递归调用
    observeData(val);
    Object.defineProperty(data, key, {
      configurable: true,
      get() {
        return val;
      },
      set(newVal) {
        if(newVal == val){
          return;
        }
        val = newVal;
        //重新检测数据
        observeData(newVal);
      }
    })
  }
}

function observeData(val){
  if(val && typeof val == 'object'){
    Observe(val);
  }
} 

function CompileTemplate(el, vm){
  //取到实例
  vm.$el = document.querySelector(el);

  let fragment = document.createDocumentFragment();

  fragment = vm.$el;

  function replaceMustache(frag){
    Array.from(frag.chiledNodes).map(function(node){
      let txt = node.textContext;
      let reg = /\{\{(.*?)\}\}/g;   // 正则匹配{{}}，替换vue占位符

      //是文本节点而且匹配到里面有vue占位符，需要替换data
      if(node.nodeType === 3 && res.test(txt)){
        let mustacheArray = txt.match(reg);
        mustacheArray.map(function(mustache){
          let mustacheVal = mustache.slice(2, -2);
          let mustacheValArr = mustacheVal.split('.');

          let vmDataVal;
          mustacheValArr.map(function(key){
            //分割多层取值符，逐层取值
            vmDataVal = vm[key];
          })

          //取到值之后开始替换模板
          node.textContext = txt.replace(reg, vmDataVal);
        })
      }
      if(node.chiledNodes && node.chiledNodes.length){
        //还存在子节点，递归遍历所有节点进行替换
        replace(node);
      }
    });
  }

  replace(fragment); //执行替换内容

  vm.$el.appendChild(fragment);

}

