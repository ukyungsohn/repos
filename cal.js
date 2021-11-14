
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
    let firstNumber = {value: 0, hasFirstNumber: false};
    let secondNumber ={value: undefined};
    let result = 0;
    
    $scope.buttonClick = function(buttonItem) {
        let insertSpan = document.querySelector('#insert');
        let processSpan = document.querySelector('#process');
        let beNum = 0;        
        
        
        if (buttonItem.type === 'number') {
            if (!oprClicked) {
                insertSpan.textContent += buttonItem.label;
            } else {              
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
        
            beNum = Number(insertSpan.textContent);
        
            if(!firstNumber.hasFirstNumber) {
                firstNumber.value = beNum;
                firstNumber.hasFirstNumber = true;
                //secondNumber.value = undefined;
            } else {
                secondNumber.value = beNum;
                firstNumber.hasFirstNumber = false;
            }
        
            firstNumber.value = equal(operator, firstNumber.value, secondNumber.value);
            insertSpan.textContent = firstNumber.value;
        
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
        }
    };
    
    function equal(operator, num1, num2) {        
        if (num2 === undefined) {
            //operator.used = false;
            return num1;
        }
        //operator.used = true;
        switch(operator.value) {
            case '+': 
                return plus(num1, num2);
        }
    }
    
    function plus(num1, num2) {
        num2 = num2 || 0;
        return num1 + num2;
    }

});

