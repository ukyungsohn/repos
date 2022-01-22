
window.addEventListener('DOMContentLoaded', function() {
    
    
    class ClickedDiv {
    
        constructor() {
            this.MakeColorArray();
        }

        // 변수
        colorArray = [];

        // DOM객체
        palette = null;
        display = document.getElementById('display');
        colorCode = document.getElementById('colorCode');

        ConvertDectoHex(number) {
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
        MakeColorArray(size) {
            size = size || 3;
            let _this = this;
            let num = []; //[0, 3, 6, 9, 'C', 'F]
            for (let a = 0; a < 16; a += size) {
                num.push(this.ConvertDectoHex(a));
            }

            num.forEach(function(r) {
                num.forEach(function(g) {
                    num.forEach(function(b) {
                        _this.colorArray.push('#' + r + g + b);
                    });
                });
            });
        }
        //0,3,6,9~ 6개인 배열을 쓰고 나서 걔를 쓴다. 걔를 3번 돌린다. RGB에 대해서.
        //ConvertDectoHex쓰지 않게

        makePalette(palette) {
            const widthCount = 8;
            const heightCount = 27;
            const divWidth = 26;

            //#함수 하나가 넘많은 역할함. makeColorItem이란 애가 있어서 걔를 고치면 되겠지 쪼개자.
            for (let j = 0; j < heightCount; ++j) {
                const wrapper = document.createElement('div');
                wrapper.className = 'wrapper';
                wrapper.style.width = Math.ceil(divWidth * 8 / 10) * 10 + 'px';        
                for (let i = 0; i < widthCount; ++i) {
                    wrapper.append(this.makeColorItem(this.colorArray[8 * j + i]));
                }
                palette.append(wrapper);
            }
        }
    
        /*
        makeColorItem이 할 일
        : 칸 하나를 리턴하는 함수 (색깔, 클릭이벤트)
        1) createElement를 한다.
        2) className을 넣는다.
        3) (색깔) 적용
        4) onclick 이벤트 적용
        5) 1)의 div를 리턴
        */
        makeColorItem(divBackColor) {
            let _this = this;
            const div = document.createElement('div');
            div.className = 'colorBox';
            
            div.style.backgroundColor = divBackColor;

            const clickFunction = this.clickFunction || function(event) {
                if (_this.divClicked) {
                    _this.divClicked.classList.remove(_this.borderName);
                }
                event.target.classList.add(_this.borderName);
                display.style.backgroundColor = divBackColor;
                colorCode.innerHTML = divBackColor;
                _this.divClicked = event.target;
                console.log(_this);
            };
            
            div.addEventListener('click', clickFunction);
            return div;
        }
    
    }

    


    //함수를 파라미터로 넣기
    palette1 = document.getElementById('palette1');
    let pal = new ClickedDiv(palette1, 'redBorder', function(){
        console.log('hi');
    });
    pal.makePalette(palette1);
    console.log(pal);

    palette2 = document.getElementById('palette2');
    let pal2 = new ClickedDiv(palette2, 'blueBorder');
    pal2.makePalette(palette2);

    //쪼개서 만든다.
    //색 하나의 div도 클래스로 만들 수 있다.

});