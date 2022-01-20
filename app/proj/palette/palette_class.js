
window.addEventListener('DOMContentLoaded', function() {
    
    
    class ClickedDiv {
    
        constructor(palette, borderName, trueOrFalse) {
            this.palette = palette;
            this.borderName = borderName;
            this.trueOrFalse = trueOrFalse;
        }

        //palette = document.getElementById('palette');
        palette = '';
        display = document.getElementById('display');
        colorCode = document.getElementById('colorCode');

        hexademical(number) {
            if (number < 10) return number;
            switch(number) {            
                case 10: return 'A';
                case 11: return 'B';
                case 12: return 'C';
                case 13: return 'D';
                case 14: return 'E';
                case 15: return 'F';
            }
        }

        //rgb 16진수 3자리,6자리
        //3의 배수로
        //함수로 만들어보기!!!    
        getArr() {
            let i,j,k;
            let l,m,n;
            const size = 3;
            let arr = [];
            for (i = 0; i < 16; i += size) {
                l = this.hexademical(i);
                for (j = 0; j < 16; j += size) {
                    m = this.hexademical(j);
                    for (k = 0; k < 16; k += size) {
                        n = this.hexademical(k); 
                        arr.push('#' + l + m + n);
                    }
                }
            }
            return arr;
        }
        //0,3,6,9~ 6개인 배열을 쓰고 나서 걔를 쓴다. 걔를 3번 돌린다. RGB에 대해서.
        //hexademical쓰지 않게

        arr = this.getArr();        


        makePalette(palette) {
            let divClicked;
            const widthCount = 8;
            const heightCount = 27;
            const divWidth = 26;
            let _this = this;

            for (let j = 0; j < heightCount; ++j) {
                const wrapper = document.createElement('div');
                wrapper.className = 'wrapper';
                wrapper.style.width = Math.ceil(divWidth * 8 / 10) * 10 + 'px';        
                for (let i = 0; i < widthCount; ++i) {
                    const div = document.createElement('div');
                    //(1)6줄 클래스이름으로 바꾸기
                    div.style.width = '20px';
                    div.style.height = '20px';
                    div.style.border = '2px solid black';
                    div.style.float = 'left';
                    div.style.marginRight = '1px';
                    div.style.marginBottom = '4px';
                    // div.style.margin = '1px';
                    const divBackColor = this.arr[8 * j + i];
                    div.style.backgroundColor = divBackColor;         
                    div.addEventListener('click', function(event) {
                        divClicked && divClicked.classList.remove(_this.borderName);
                        event.target.classList.add(_this.borderName);
                        display.style.backgroundColor = divBackColor;
                        colorCode.innerHTML = '';
                        if (_this.trueOrFalse) colorCode.innerHTML = divBackColor;
                        divClicked = event.target;
                    });
                    //(2)함수 하나가 넘많은 역할함. makeColorItem이란 애가 있어서 걔를 고치면 되겠지 쪼개자.
                    wrapper.append(div);
                }
                palette.append(wrapper);
            }
        }

    }
    //함수를 파라미터로 넣기
    palette1 = document.getElementById('palette1');
    let pal = new ClickedDiv(palette1, 'redBorder', true);
    pal.makePalette(palette1);
    console.log(pal);

    palette2 = document.getElementById('palette2');
    let pal2 = new ClickedDiv(palette2, 'blueBorder', false);
    pal2.makePalette(palette2);

    //쪼개서 만든다.
    //색 하나의 div도 클래스로 만들 수 있다.

});