
let calculatorApp = angular.module('calculatorApp', []);

calculatorApp.controller('calculatorController', function calculatorController($scope) {
    //나중에 버튼을 디렉티브로 만들어보기
    $scope.leftButtons = [
        {label: '7', value: 7, type: 'number'},
        {label: '8', value: 8, type: 'number'},
        {label: '9', value: 9, type: 'number'},
        {label: '4', value: 4, type: 'number'},
        {label: '5', value: 5, type: 'number'},
        {label: '6', value: 6, type: 'number'},
        {label: '1', value: 1, type: 'number'},
        {label: '2', value: 2, type: 'number'},
        {label: '3', value: 3, type: 'number'},
        {label: '0', value: 0, type: 'number'},
        {label: '.', value:'', type: ''},
        {label: '=', value:'=', type: 'equal'}
    ];

    $scope.rightButtons = [
        {label: '+', value:'+', type: 'operator'},
        {label: '-', value:'-', type: 'operator'},
        {label: '*', value:'*', type: 'operator'},
        {label: '/', value:'/', type: 'operator'}
    ];

    $scope.buttomButtons = {
        label: 'reset', 
        value:'', 
        type: 'reset'
    };
    
    //주석을 써라.
    //전역변수는 안좋다. 그럼 어디에 어떻게 쓰지?
    let oprClicked = false;
    let operator = {value: '', used: false};
    let firstNum = {value: 0, hasfirstNum: false};
    let secondNum ={value: undefined};
    let result = 0;
    let insertSpan = document.querySelector('#insert');
    let processSpan = document.querySelector('#process');
    
    $scope.buttonClick = function(buttonItem) {
        let beNum = 0;    
        
        if (buttonItem.type === 'number') {
            if (!oprClicked) {
                //연산자 클릭하지 않았다면 숫자 입력시 insertspan의 숫자에 숫자가 붙는다.
                insertSpan.textContent += buttonItem.label;
            } else {             
                //연산자 클릭한 후라면 입력창에 입력한 값이 새로 셋팅된다. 
                insertSpan.textContent = buttonItem.label;
                oprClicked = false;
                
            }
        } 
        
        if (buttonItem.type === 'operator') {
            oprClicked = true;
            //이전 연산자가 쓰이지 않았다면 
            //6+7-일때 +로 연산하기 위해서
            if (!operator.used) {
                operator.value = buttonItem.value;
            }

            //입력받은 문자열 숫자로 만들기
            beNum = Number(insertSpan.textContent);
        
            if(!firstNum.hasfirstNum) {
                firstNum.value = beNum;
                firstNum.hasfirstNum = true;
                //secondNum.value = undefined;
            } else {
                secondNum.value = beNum;
                firstNum.hasfirstNum = false;
            }
            //첫번째, 연산자, 두번째 입력값을 받았다면 연산 후 새로운 첫번째 입력값이 된다. 
            firstNum.value = equal(operator, firstNum.value, secondNum.value);
            insertSpan.textContent = firstNum.value;
        
            if (buttonItem.value === '+') {
                processSpan.textContent = beNum + '+'; 
        
            } 
        }
        
        if (buttonItem.type === 'equal') {
            
        
        }
        
        if (buttonItem.type === 'reset') {
            insertSpan.textContent = '';
            processSpan.textContent = '';
            beNum = 0;
            firstNum.value = 0;
            firstNum.hasfirstNum = false;
            secondNum.value = 0;
        }
    };
    
    function equal(operator, num1, num2) {        
        firstNum.hasfirstNum = true;
        if (num2 === undefined) {
            //operator.used = false;
            //두번째 값을 입력받지 않았다면 첫번째 입력값은 계속해서 첫번째 입력값이다.
            return num1;
        }
        //operator.used = true;
        switch(operator.value) {
            case '+': 
                return plus(num1, num2);
        }
    }
    
    function plus(num1, num2) {
        //num2가 없어도 연산될 수 있게
        num2 = num2 || 0;
        return num1 + num2;
    }

});

