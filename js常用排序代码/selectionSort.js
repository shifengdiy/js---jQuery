/**
 * 选择排序
 * 选排是非常稳定的排序，每次遍历通过常规方式找到最小数，然后交换到前部
 * 持续这个过程，直到选择出所有最小数到前部完成排序
 */

function selectionSort(arr = [3, 1, 5, 2, 9]) {
  let len = arr.length;
  let minIndex;
  for(let i = 0;i < len - 1;i++){
    minIndex = i;
    for(let j = i + 1;j < len;j++){
      if(arr[minIndex] > arr[j]){
        minIndex = j;
      }
    }
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}

const res = selectionSort([9, 5, 4, 6, 1]);
console.log(res);