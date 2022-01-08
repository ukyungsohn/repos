'use strict';

define([
    'NSDateFormat'
], function(NSDateFormat) {
    console.log(NSDateFormat);
    console.log(NSDateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'));
    // let testDateFormat = new NSDateFormat2();

    function _controller($scope) {

        // testDateFormat(new Date(), '');
        // console.log(NSDateFormat2);
        // console.log(testDateFormat);
        // console.log(getPreferenceApplicationData);

        let testString = 'A123B45C6';
        // A = Apple
        // B = Banana
        // C = Cream

        function replaceString(string, rule) {
            
            for (const prop in rule) {
                string = string.replace(prop, rule[prop]);
            }
            // string = string.replace('A', 'Apple');
            // string = string.replace('B', 'Banana');
            // string = string.replace('C', 'Cream');
                        
            return string;
        }

        //console.log(replaceString(testString, {A: 'Apple', B: 'Banana', C: 'Cream'}));
        
        function replaceStringWithRegexp(string, rule) {
            //ABC에만 반응하게 하라는 건가? 정규표현식으로 필터링
            //숫자를 영어이름으로도 바꾸기
            let regexp = /[A-C0-9]/g;
            string = string.replace(regexp, function(char) {
                console.log(char);
                return char in rule ? rule[char] : '';
            });
            //console.log(string);
            return string;
        }
        let myRule = {
            A: 'Apple', B: 'Banana', C: 'Cream',
            1: 'one',
            2: 'two',
            3: 'three',
            4: 'four',
            5: 'five',
            6: 'six',
            7: 'seven',
            8: 'eight',
            9: 'nine'
        }
        let result = replaceStringWithRegexp(testString, myRule);
        reverseRSWR(result, myRule);
        //result를 다시 원래대로 돌리기
        //AppleonetwothreeBananafourfiveCreamsix => A123B45C6
        function reverseRSWR(string, rule) {
            for (const prop in rule) {
                string = string.replace(rule[prop], prop);
            }
            
            console.log(string)
            return string;
        }

    }
    return _controller;
});