
window.addEventListener('DOMContentLoaded', function() {
    const palette = document.getElementById('palette');
    const display = document.getElementById('display');
    const colorCode = document.getElementById('colorCode');

    let hexadecimal = function(number) {
        if (number < 10) return number;
        switch(number) {            
            case 10: return 'A';
            case 11: return 'B';
            case 12: return 'C';
            case 13: return 'D';
            case 14: return 'E';
            case 15: return 'F';
        }
    };

    //rgb 16진수 3자리,6자리
    //3의 배수로
    //함수로 만들어보기!!!    
    function getArr() {
        let i,j,k;
        let l,m,n;
        const size = 3;
        let arr = [];
        for (i = 0; i < 16; i += size) {
            l = hexadecimal(i);
            for (j = 0; j < 16; j += size) {
                m = hexadecimal(j);
                for (k = 0; k < 16; k += size) {
                    n = hexadecimal(k); 
                    arr.push('#' + l + m + n);
                }
            }
        }
        return arr;
    }

    let arr = getArr();
    let divClicked;
    const widthCount = 8;
    const heightCount = 27;
    const divWidth = 26;

    for (let j = 0; j < heightCount; ++j) {
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        wrapper.style.width = Math.ceil(divWidth * 8 / 10) * 10 + 'px';        
        for (let i = 0; i < widthCount; ++i) {
            const div = document.createElement('div');
            div.style.width = '20px';
            div.style.height = '20px';
            div.style.border = '2px solid black';
            div.style.float = 'left';
            div.style.marginRight = '1px';
            div.style.marginBottom = '4px';
            // div.style.margin = '1px';
            const divBackColor = arr[8 * j + i];
            div.style.backgroundColor = divBackColor;         
            div.addEventListener('click', function(event) {
                divClicked && divClicked.classList.remove('redBorder');
                event.target.classList.add('redBorder');
                display.style.backgroundColor = divBackColor;
                colorCode.innerHTML = divBackColor;
                divClicked = event.target;
            });
            wrapper.append(div);
        }
        palette.append(wrapper);
    }








});
