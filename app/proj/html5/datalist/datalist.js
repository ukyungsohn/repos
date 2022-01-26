// 유저 input 입력값을 가져오고
//옵션을 필터하고
//결과값을 보여주고
//클릭 리스닝하고

window.onload = function() {

    let arr = ['Dune', 'Dark', 'Iron Man II', 'Matrix II'];
    let newArr = [];

    const input = document.getElementById('search');
    const clickButton = document.getElementById('clickButton');
    const savingText = document.getElementById('savingText');

    input.addEventListener('keydown', function(e) {
        // console.log(e);        
        newArr = [];
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i].includes(e.key)) {
                newArr.push(arr[i]);
            }
        }
        console.log(newArr);
    });
    
    clickButton.onclick = function() {
        if (arr.indexOf(input.value) < 0) {
            arr.push(input.value);
        }
        console.log(arr);
        // const span = document.createElement('span');
        // span.innerText = input.value;
        // savingText.append(span);

    };
    


};


