//selection sort

/*
<정렬과정>
배열 중에 최솟값이 위치한 index를 찾습니다. 
최솟값이 위치한 index의 값과 맨 처음의 index 값을 swap합니다. 
맨 처음의 index를 제외한 나머지 배열에 대해서 1,2 단계를 진행합니다.
하나의 요소가 남을 때까지 위 1~3 과정을 반복합니다.

<장점>
실제 사람들이 직접 정렬한다고 할 때 진행하는 방식과 가장 유사하다.
알고리즘 구현 난이도가 굉장히 낮고, 단순한 정렬 알고리즘이다.
제자리 정렬(In-place sort)의 특징을 가지고 있기 때문에, 주어진 공간 외에 추가적인 메모리를 필요로 하지 않는다. 메모리가 제한적인 상황에서 메모리를 추가적으로 할당해서 사용하는 상황에 한해서는 추가적인 메모리를 요하는 정렬 알고리즘에 비해 성능상의 이점이 있을 가능성이 있다.

<단점>
현재 값이 최솟값임에도 불구하고 최솟값을 찾기 위한 순회 과정을 진행한다. (불필요한 순회과정이 포함되어 있다.)
최솟값을 찾는 횟수가 정해져있다. (n - 1, n - 2, ..., 1)
O(n2)의 시간복잡도를 가진 만큼 퍼포먼스 측면에서 좋지 않다.
불안정 정렬(unstable sort)로써 동일한 값에 대해 기존의 순서가 뒤바뀔 수 있는 정렬 방식이다.
*/

const sortAscending = (arr) => {
    let idxOfSmaller;
    let small = 0;
    for (let i = 0; i < arr.length; ++i) {
        let oldVal;
        for (let j = i + 1; j < arr.length; ++j) {
            if (oldVal === undefined) {
                oldVal = arr[j];
                idxOfSmaller = j;
            } else {
                if (oldVal > arr[j]) {
                    oldVal = arr[j];
                    idxOfSmaller = j;
                }            
            }    
            small = oldVal;      
        }
        if (arr[i] > small) {
            let switchValue = arr[i];
            arr[i] = small;
            arr[idxOfSmaller] = switchValue;
        }
        // console.log('asc',arr);        
    }
    // console.log('asc',arr); 
};

const sortDescending = (arr) => {
    for (let i = 0; i < arr.length; ++i) {
        let maxIndex = i;
        for (let j = i + 1; j < arr.length; ++j) {
            if (arr[maxIndex] < arr[j]) {
                maxIndex = j;
            }
        }
        if (maxIndex !== i) {
            [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
        }
    }    
    // console.log('desc',arr);
    return arr;
};

const selectionSort = (arr, key, order) => {
    let array = [];
    let newArr = [];
    for (let i = 0; i < arr.length; ++i) {
        array.push(arr[i][key]);
    }
    if (order === 'asc') {
        sortAscending(array);
    } else if (order === 'desc') {
        sortDescending(array);
    }
    for (let j = 0; j < array.length; ++j) {
        for (let k = 0; k < arr.length; ++k) {
            if (array[j] === arr[k][key]) {
                newArr.push(arr[k]);
            }
        }
    }
    // console.log(newArr);
    return newArr;
};

let arr = [3,1,1,2,4,5,3];
// let arr = [3,1,2,4];
let arr2 = [
    {idx: 3, value: 120, name: "A"},
    {idx: 1, value: 130, name: "B"},
    {idx: 2, value: 90, name: "C"},
    {idx: 4, value: 110, name: "D"}
    ];

// selectionSort(arr2, 'value', 'desc');
sortAscending(arr);
// sortDescending(arr);