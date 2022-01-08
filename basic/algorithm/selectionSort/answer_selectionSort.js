//selection sort
let arr = [9,2,5,1,3];



const selectionSort = (arr) => {
    for (let i = 0; i < arr.length; ++i) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; ++j) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            /*
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp; 
            */
        }
    }
    return arr;
}

console.log(selectionSort(arr));