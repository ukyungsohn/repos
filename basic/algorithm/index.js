let arr = [3, 2, 1, 8, 5, 9, 6, 10, 7, 4];
let end = arr.length;
let pivotIdx = 0;

quickSort(arr, end, pivotIdx);
function quickSort(arr, end, pivotIdx) {
    let big;
    let bigIdx;
    let small;
    let smallIdx;
    let pivot = arr[pivotIdx];
    for (let i = pivotIdx; i < end; ++i) {
        if (pivot < arr[i]) {
            big = arr[i];
            bigIdx = i;
            break;
        }
    }
    for (let i = end; i > pivotIdx; --i) {
        if (pivot > arr[i]) {
            small = arr[i];
            smallIdx = i;
            break;
        }
    }
    //smallIdx, bigIdx가 있느냐 없느냐 -> 그럼 자기 자신
    //smallIdx나 bigIdx가 pivotIdx와 같은가?

    //엇갈리느냔 안 엇갈리느냐
    if (smallIdx < bigIdx) {
    //엇갈릴 때: 작은 값 인덱스가 큰 값 인덱스보다 작을 때
        let temp = small;
        arr[smallIdx] = pivot;
        arr[pivotIdx] = temp;
        //피봇값은 정렬이 된다. 피봇값의 좌우를 분할시켜 또 퀵정렬을 실행한다.
        pivotIdx = smallIdx;
        pivot = arr[pivotIdx];
        if (arr[pivotIdx - 1]) {
            quickSort(arr, pivotIdx - 1, 0);           
        } else if (arr[pivotIdx + 1]) {
            quickSort(arr, arr.length, pivotIdx + 1); 
        }
    } else {
    //안 엇갈릴 때
        let temp = small;
        arr[smallIdx] = big;
        arr[bigIdx] = temp;    
        smallIdx = null;
        bigIdx = null;
    }
}
console.log(arr);