//bubble sort

/*
<정렬 과정>
버블정렬은 인접한 두 요소를 마지막 요소까지 모두 비교하며 교환하거나 유지하면서 정렬합니다.
1회전을 수행한 후 정렬 조건에 따라 가장 크거나 작은 요소가 맨 뒤로 이동하기 때문에 
2회전부터는 가장 끝에 있는 요소는 정렬에서 제외됩니다. 
쉽게 말해 정렬 1회전을 수행할 때마다 정렬에서 제외되는 요소가 1개씩 늘어나게 됩니다.

<장점>
단순하게 인접한 두 요소를 비교하기 때문에 구현이 굉장히 단순하다.

<단점>
수행 시간이 굉장히 오래 걸린다.
불필요한 교환이 이뤄질 가능성이 크다. 
(최종 단계에서는 현재 위치가 맞음에도 불구하고, 인접한 두 요소 간의 비교에 의해 위치가 변경된다.)
*/

let arr = [5,3,8,1,2,7];
const bubbleAscending = function(arr) {
    for (let i = 0 ; i < arr.length; ++i) {
        for (let j = 0; j < arr.length - (i + 1); ++j) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }    
    }
    return arr;
}
const bubbleDescending = (arr) => {
    for (let i = 0 ; i < arr.length; ++i) {
        for (let j = 0; j < arr.length - (i + 1); ++j) {
            if (arr[j] < arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }    
    }
    return arr;
};
console.log(bubbleDescending(arr));