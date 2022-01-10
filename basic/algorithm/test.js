'use strict';

define(['canvasJS'
    //'Rectangle'
//주소쓰면 class, 프로토타잎펑션

// ], function(Rectangle) {
], function(canvasJS) {
//디파인과 이름같을 필요는 없고 순서가 중요. 펑션파라미터에
    // const myRectangle = new Rectangle(3, 6);
    //console.log(myRectangle.getArea());

    // function _controller($scope, $http, $location, Ukservice, provider) {
    function _controller($scope, $http, $location, provider, chartManager) {
        //_cont..함수의 파라미터는: angularjs의 서비스를, 라우츠의 서비스들 넣기
        //스코프도 핸들링하는 서비스
        //console.log(Ukservice);
        //서비스: value 저장소 ->route가 바뀌어도 여러페이지에서 같은 값으로 유지됨.

        let css = [];
		if (window.$scope.theme === 'white') {
			css.push('css/formplate.css');
			css.push('css/ui.css');
			css.push('css/layout.css');
			css.push('css/directive.css');
			css.push('css/header.css');
			css.push('css/home.css');
            css.push('css/uktest.css');

		} else if (window.$scope.theme === 'dark') {
			css.push('css/theme/dark/formplate.css');
			css.push('css/theme/dark/ui.css');
			css.push('css/theme/dark/layout.css');
			css.push('css/theme/dark/directive.css');
			css.push('css/theme/dark/header.css');
			css.push('css/theme/dark/home.css');
            css.push('css/uktest.css');
		}
        $scope.$emit('updateCSS', css);

        //application단위
        provider.sendProtocol({
            category: 'admin',
            opcode: 'application',
            command: 'get',
            option: {
                detail: 2
            }
        }, {    
            ret: {
                success: function(data) {
                    //console.log(data);
                    //data.application[0].aid
                    $scope.dropdownMenu.selected = data.application[0].aid;
                
                    for (let i = 0; i < data.application.length; ++i) {
                        let item = {};
                        item.label = data.application[i].aid;
                        $scope.dropdownMenu.items.push(item);
                    }
                },
                error: function(e) {
                    
                }
            },
        }, 'POST');

        //tier 단위
        provider.sendProtocol({
            category: 'admin',
            opcode: 'tier',
            command: 'get',
            data: {
                aid:'app03'
            },
            option: {

            }
        }, {
            ret: {
                success: function(data) {
                    //console.log(data);
                },
                error: function(e) {

                }
            }
        }, 'POST');
        
        $scope.dropdownMenu = {
            items: [],
            selected: '',
            clicked: false,
            click: function() {
                this.clicked = !this.clicked;
            },
            clickLi: function(item) {
                this.selected = item.label;
            }
        };

        
        // function getSessionCount(rangeObj, callback) {
        function getSessionCount(callback) {
            //rangeObj = rangeObj || {};
            //최근 한시간
            let end = parseInt(new Date().getTime() / 1000);
            let begin = end - 60 * 60;
            
            provider.sendProtocol({
                category: 'statistics',
                opcode: 'application',
                command: 'get_app',
                data: {
                    aid: 'app03'
                },
                option: {
                    details: 'session_count'
                },
                range: {
                    type: 'select',
                    value: {
                        period: 'M',
                        begin: begin,
                        end: end
                    }
                }
            }, {            
                ret: {
                    success: function(data) {
                        // console.log(data);
                        if (callback && typeof callback === 'function') {
                            callback(data);
                        }
                    }, error: function(e) {
                        console.log(e);
                    }
                }            
            }, 'POST');
        }


        // var chart = new CanvasJS.Chart("ccrt-user", {
        //     title:{
        //         text: "My First Chart in CanvasJS"              
        //     },
        //     data: [              
        //     {
        //         // Change type to "doughnut", "line", "splineArea", etc.
        //         type: "column",
        //         dataPoints: [
        //             { label: "apple",  y: 10, x: new Date()},
        //             { label: "orange", y: 15,  x: new Date()},
        //             { label: "banana", y: 25,  x: new Date()},
        //             { label: "mango",  y: 30,  x: new Date()},
        //             {  y: 28, x: new Date() }
        //         ]
        //     }
        //     ]
        // });
        // chart.options.data[0].dataPoints[0].label = 'uks';
        // console.log(chart);
        // chart.render();

        let options = chartManager.settings.systemManagement.todayLoad;
        //createChart : makechart(new Canvas), setid, getid
        chartManager.createChart('ccrt-user', options);
        getSessionCount(function(data) {
            console.log(data);
            let dataSeries = {
                //toolTipContent: 'mytooltip {time} x={x}, y={y}',
                toolTipContent: '{time} - {y}',
                color: 'green',
                type: 'column',
                showInLegend: true,
                legendText: "Concurrent User",
                dataPoints: []
            };
            for (let i = 0; i < data[0].value.length; ++i) {
                let dateObj = new Date(data[0].value[i].time * 1000);
                let hour = dateObj.getHours();
                let minute = dateObj.getMinutes();
                dataSeries.dataPoints.push({
                    //x: new Date(data[0].value[i].time * 1000),
                    x: dateObj,
                    time: '' + hour + ':' + minute,
                    //y: data[0].value[i].total[0]
                    y: Math.floor(Math.random() * 60) + 1,
                    //indexLabel: 'a'
                    //color
                });
                if (i === data[0].value.length - 1) {
                    dataSeries.dataPoints[i].color = 'red';
                    // dataSeries.dataPoints[i].indexLabel = '{y}';
                    // dataSeries.dataPoints[i].indexLabelFontColor = '#FF0000';
                    // dataSeries.dataPoints[i].indexLabelFontWeight = 'bold';
                }
            }
            console.log(dataSeries.dataPoints);

            let chart = chartManager.getChart('ccrt-user');
            console.log(chart);
            chart._axisX.interval = 10;
            chart._axisX.intervalType = 'minute';
            chart._axisX.valueFormatString = 'HH:mm:ss';
            chartManager.setDataUks('ccrt-user', [dataSeries]);            
            
        });
        
        // var chart = chartManager.getChart('ccrt-user');
        // chartManager.setData(LINE_CHART_IDS[1], $scope.apmTodayLoadData, true, 'hour', undefined, true, true, undefined, 'normal');
        // chartManager.render(LINE_CHART_IDS[3]);


    
    
    
    
    }
    return _controller;
});

//main.js 디펜던시
//a.js, b.js
//서비스만들어서 컨트롤러파라밑터로 쓰기 물론 라우트에넣고나서