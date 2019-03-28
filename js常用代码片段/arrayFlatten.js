let testArr = [5, 2, 2, 5, [3, 2, 8, [12, 6]], 45];

//数组扁平化和数据排序方法

/**
 * 使用es6的方法，Array.flat，Set
 */
function es6Arr(arr){
  var flatArr = arr.flat(Infinity);
  var singleFlatArr = Array.from(new Set(flatArr));
  var sortSingleFlatArr = singleFlatArr.sort(function(a, b){
    return a - b;
  })

  return sortSingleFlatArr;
}

/**
 * 使用toString()扁平，先排序然后去重
 */
function stringArr(arr){
  var strintgList = arr.toString();
  var flatList = strintgList.split(',').map(el => Number(el));
  var sortFlatList = flatList.sort((a, b) => a - b);
  var sortSingleFlatList = []; 
  sortFlatList.map((el, index, arr) => {
    if(index == 0){
      sortSingleFlatList.push(el);
    } else {
      if(el != arr[index - 1]){
        sortSingleFlatList.push(el);
      }
    }
  })

  return sortSingleFlatList;
}

/**
 * 使用传统递归遍历方法先扁平化数组，然后遍历数据去重，然后使用sort方法排序
 */
function normalArr(arr){
  var flatArr = [];
  function falttenArr(arrItem){
    arrItem.map(function(el){
      //递归判断是否是数据，如果是数组继续执行扁平化
      if(typeof el == 'object'){
        falttenArr(el);
      } else {
        //在放入数组的时候去重,每一个放入数组的元素都判断是否重复，重复的元素直接舍弃
        if(flatArr.indexOf(el) == -1){
          flatArr.push(el);
        }
      }
    })
  }

  falttenArr(arr);

  //对数组进行排序
  flatArr.sort((a, b) => a - b);

  return flatArr;
}


//console.log(es6Arr(testArr));

console.log(stringArr(testArr));

//console.log(normalArr(testArr));