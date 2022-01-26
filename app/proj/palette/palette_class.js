class ClickedDiv {
    
    constructor(args) {
        //팔레트마다 색이 다를 수 있어
        //makeColorArray를 여기서 선언하는 게 맞는지 생각해보자.
        this.MakeColorArray();
    }

    // 변수
    colorArray = [];
    selectedItem = null;

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

    makePalette(palette, option) {
        option = option || {};
        // option의 형식
        // option = {
        //     borderName: 'blueBorder',
        //     clickFunction: function(event, value) {
        //         console.log(event, value);
        //     }
        // }

        // 팔레트의 옵션에 대한 처리!!!!!!!
        // 옵션-1) 클릭시 border의 색상
        //this.borderName = borderName || 'redBorder';
        this.borderName = option.borderName || 'redBorder';

        // 옵션-2) 클릭이벤트 처리?
        //팔레트 별로 클릭 이벤트는 다르지만 
        //아이템마다 클릭이 다르지 않기 때문에 여기서 한다.
        // this.clickFunction = clickFunction || function() {
        //     console.log('here');
        // };
        this.clickFunction = option.clickFunction || function(color, event) {
            console.log(this, arguments)
            if (this.selectedItem) {
                this.selectedItem.classList.remove(this.borderName);
            }
            this.selectedItem = event.target;
            this.selectedItem.classList.add(this.borderName);

            // 디스플레이 영역에 대한 처리
            this.display.style.backgroundColor = color;
            this.colorCode.innerHTML = color;
        };

        // L1. palette가 divId인 경우
        // let paletteContainer = document.getElementById(palette);
        // if (!paletteContainer) {
        //     console.error('no palette container obj');
        //     return;
        // }

        // L2. palette가 obj인 경우?
        // 바로 선언한다!
        //paletteContainer = palette;

        // L3. 둘 다 체크하는 경우
        let paletteContainer = typeof palette === 'string'
                            ? document.getElementById(palette)
                            : palette;

        if (!paletteContainer) {
            console.error('no palette container obj');
            return;
        }
        // palette가 문자열이 아니고 DOM object가 아닌 경우엔
        // 체크가 불가함

        // DOM.append 하는 시점에 try-catch로 걸러내자
        // 예) palette값이 number일 때 에러가 발생하게 됨
        try {
            for (let i = 0; i < this.colorArray.length; ++i) {
                paletteContainer.append(this.makeColorItem(this.colorArray[i]));
            }
        } catch (e) {
            console.error('input palette value is invalid');
        }

        // 팔레트의 가로 세로 구성은
        // 컨테이너의 너비로 조절한다
        paletteContainer.style.width = '150px';
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
    makeColorItem(color) {
        let _this = this;

        const div = document.createElement('div');
        div.className = 'colorBox';        
        div.style.backgroundColor = color;
        
        // clickFunction에 Palette 객체와 color를 bind한다.
        // color를 바인드했을 때 왜 파라미터 순서가 color, event인가?
        // bind한 파라미터가 우선하게 됨 (사용자 편의 목적인듯)
        div.addEventListener('click', this.clickFunction.bind(this, color));
        return div;
    }    
}