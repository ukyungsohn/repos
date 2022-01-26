// 유저 input 입력값을 가져오고
//옵션을 필터하고
//결과값을 보여주고
//클릭 리스닝하고

window.onload = function() {

    let arr = ['Dune', 'Dark', 'Iron Man II', 'Matrix II'];
    let newArr = [];

    const input = document.getElementById('search');
    const clickButton = document.getElementById('clickButton');
    const textList = document.getElementById('textList');

    input.addEventListener('keyup', function(e) {
        //console.log(e.target.value);        
        newArr = [];
        textList.innerHTML = '';
        textList.className = 'listBorder';
        for (let i = 0; i < arr.length; ++i) {
            //if (arr[i].includes(e.key)) {
            if (arr[i].includes(e.target.value)) {
                newArr.push(arr[i]);
                const div = document.createElement('div');
                const span = document.createElement('span');
                span.innerText = arr[i];
                div.addEventListener('click', function(e) {
                    input.value = e.target.textContent;
                    textList.style.display = 'none';
                });
                div.append(span);
                textList.append(div);                
            }
        }        
        console.log(newArr);
    });
    
    input.addEventListener('focus', function(e) {
        newArr = [];
        textList.innerHTML = '';
        textList.className = 'listBorder';
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i].includes(e.target.value)) {
                newArr.push(arr[i]);
                const div = document.createElement('div');
                const span = document.createElement('span');
                span.innerText = arr[i];
                div.addEventListener('click', function(e) {
                    input.value = e.target.textContent;
                    textList.style.display = 'none';
                });
                div.append(span);
                textList.append(div);
            }
        }
        

    });

    clickButton.onclick = function() {
        if (arr.indexOf(input.value) < 0) {
            arr.push(input.value);
        }
        console.log(arr);
        // const span = document.createElement('span');
        // span.innerText = input.value;
        // textList.append(span);

    };
    


};


