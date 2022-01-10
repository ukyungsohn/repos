//selection sort
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

let arr = [9,2,5,1,3];
// let arr = [3,1,2,4];
let arr2 = [
    {idx: 3, value: 120, name: "A"},
    {idx: 1, value: 130, name: "B"},
    {idx: 2, value: 90, name: "C"},
    {idx: 4, value: 110, name: "D"}
    ];

// selectionSort(arr2, 'value', 'desc');
// sortAscending(arr);
// sortDescending(arr);