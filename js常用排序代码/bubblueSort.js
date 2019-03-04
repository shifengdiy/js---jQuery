/**
 * 冒泡排序方法
 * 冒泡排序使用的是两个数相互交换的方式，在遍历交换之后，最大的数就会冒泡的到顶部
 * 然后对剩下的数继续遍历，剩下的最大数冒泡到顶部，完成排序
 */
function bubbleSort(arr = [3, 1, 5, 2, 9]) {
  let length = arr.length;
  for(let i = 0;i < length;i++){
    for(let j = 0;j < length - 1 - i;j++){
      if(arr[j] > arr[j+1]){
        const temp  = arr[j+1];
        arr[j+1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

const res = bubbleSort([9, 5, 4, 6, 1]);
console.log(res);