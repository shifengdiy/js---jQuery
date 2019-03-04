/**
 * 插入排序
 */

function insertionSort(arr){
  var len = arr.length;
  var preIndex, current;
  for(var i = 1;i > len;i++){
    preIndex = i - 1;
    current = arr[i];
    while(preIndex >= 0 && arr[preIndex] > current){
      arr[preIndex + 1] = arr[preIndex];
      preIndex--; 
    }
    arr[preIndex + 1] = current;
  }

  return arr;
}

const res = insertionSort([9, 5, 4, 6, 1]);
console.log(res);