
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
    let oldOperator = undefined;
    let newOperator = undefined;
    //operator.procedure의 1,2는 클릭하기 전 이전의 연산자를 기억하기 위함이다.
    let operator = {value: '', procedure: 1};
    let firstNum = {value: 0, hasfirstNum: false};
    let secondNum ={value: undefined};
    let insertSpan = document.querySelector('#insert');
    let processSpan = document.querySelector('#process');
    let equalUsed = false;


    //!!!나중에 연산자에 따른 case문으로 바꾸자. 공통부분은 함수로 쓰고.
    $scope.buttonClick = function(buttonItem) {
        let beNum = 0;    

        if (buttonItem.type === 'number') {
            if (!oprClicked && beNum !== 0) {
                //연산자 클릭하지 않았다면 숫자 입력시 insertspan의 숫자에 숫자가 붙는다.
                insertSpan.textContent += buttonItem.label;
            } else {             
                //연산자 클릭한 후라면 입력창에 입력한 값이 새로 셋팅된다. 
                insertSpan.textContent = buttonItem.label;
                oprClicked = false;                
            }
        }
        
        if (buttonItem.type === 'operator' || buttonItem.type === 'equal') {
            oprClicked = true;
            //이전 연산자가 쓰이지 않았다면 
            //6+7-일때 +로 연산하기 위해서
            if (buttonItem.type === 'operator') {
                if (!oldOperator) {
                    oldOperator = buttonItem.value;
                } else {
                    newOperator = buttonItem.value;
                }
                
                //클릭했을 때의 연산자기호와 이전 연산자기호가 다르면 이전 연산자기호로 연산한다. 
                if (oldOperator !== newOperator) {
                    operator.value = oldOperator;
                } else {
                    operator.value = newOperator;
                }
            }

            if (buttonItem.type === 'equal') {
                if (newOperator) {
                    operator.value = newOperator;
                } else {
                    operator.value = oldOperator;
                }
            }

            //입력받은 문자열 숫자로 만들기
            beNum = Number(insertSpan.textContent);
        
            //첫번째 숫자가 입력된 적이 없다면 첫번째 숫자에 입력값을 저장한다.
            if(!firstNum.hasfirstNum) {
                firstNum.value = beNum;
                firstNum.hasfirstNum = true;
                //secondNum.value = undefined;
            } else {
                //equal버튼을 클릭했는데 다음 클릭이 또 equal이라면 secondNum은 바뀌지 않는다.
                if (!(equalUsed && (buttonItem.type === 'equal'))) {
                    secondNum.value = beNum;
                    firstNum.hasfirstNum = false;
                } 
            }

            let oldFirstNum = firstNum.value;
            //첫번째, 연산자, 두번째 입력값을 받았다면 연산 후의 결과값은 새로운 첫번째 입력값이 된다. 
            firstNum.value = equal(operator, firstNum.value, secondNum.value);

            insertSpan.textContent = firstNum.value;   

            //equal클릭 시, 연산자 기호와 등호를 모두 보여줘야 한다.
            processSpan.textContent = buttonItem.type !== 'equal' 
                                        ? displayProcess(buttonItem.value, firstNum.value)
                                        : displayEqualProcess(operator, oldFirstNum, secondNum.value);
                                        
            if (newOperator) {
                oldOperator = newOperator;
            }
        }
        
        if (buttonItem.type === 'equal') {
            equalUsed = true;
        } else {
            equalUsed = false;
        }

        if (buttonItem.type === 'reset') {
            insertSpan.textContent = '';
            processSpan.textContent = '';
            beNum = 0;
            firstNum.value = 0;            
            firstNum.hasfirstNum = false;
            insertSpan.textContent = firstNum.value;
            secondNum.value = 0;

            oprClicked = false;
            oldOperator = '';
            newOperator = '';
            operator.value = '';
            operator.procedure = 1;
            equalUsed = false;
        }
    };
    function displayEqualProcess(operator, num1, num2) {
        console.log('opr',operator);
        switch(operator.value) {
            case '+':
                return num1 + '+' + num2 + '='; 
            case '-':
                return num1 + '-' + num2 + '='; 
            case '*':
                return num1 + '*' + num2 + '='; 
            case '/':
                return num1 + '/' + num2 + '=';
            default:         
                processSpan.textContent = '';
        }
    }

    function displayProcess(operator, number) {
        switch(operator) {
            case '+':
                return number + '+'; 
            case '-':
                return number + '-';
            case '*':
                return number + '*';
            case '/':
                return number + '/';            
            default:         
                processSpan.textContent = '';
        }
    }
    function equal(operator, num1, num2) {        
        firstNum.hasfirstNum = true;
        if (num2 === undefined) {
            //operator.used = false;
            //두번째 값을 입력받지 않았다면 equal의 결과값은 첫번째 입력값이다.
            return num1;
        }
        //operator.used = true;
        switch(operator.value) {
        case '+':  
            return plus(num1, num2);
        case '-':
            return minus(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return division(num1, num2);
        }
    }
    
    function plus(num1, num2) {
        //num2가 없어도 연산될 수 있게
        num2 = num2 || 0;
        return num1 + num2;
    }

    function minus(num1, num2) {
        num2 = num2 || 0;
        return num1 - num2;
    }

    function multiply(num1, num2) {
        num2 = num2 || 1;
        return num1 * num2;        
    }

    function division(num1, num2) {
        num2 = num2 || 1;
        return num1 / num2;      
    }

});

