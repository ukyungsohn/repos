//quickSort
let arr = [3, 7, 8, 1, 5, 9, 6, 10, 2, 4];
let idxOfPivot = 0;
let pivot = arr[idxOfPivot];
let small;
let big;
let idxOfSmall;
let idxOfBig;
for (let i = idxOfPivot + 1; i < arr.length; ++i) {
    if (arr[i] > pivot) {
        big = arr[i];
        idxOfBig = i;
        break;
    }
}

for (let j = arr.length; j > idxOfPivot + 1; --j) {
    if (arr[j] < pivot) {
        small = arr[j];
        idxOfSmall = j;
        break;
    }
}

