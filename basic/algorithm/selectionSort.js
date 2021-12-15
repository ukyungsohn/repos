//selection sort
let arr = [9,2,5,1,3];
let small = 0;
let idxOfSmaller = undefined;


for (let i = 0; i < arr.length; ++i) {
    let oldVal;
    for (let j = i + 1; j < arr.length; ++j) {
        if (oldVal === undefined) {
            oldVal = arr[j];
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
    console.log(arr); 
}
