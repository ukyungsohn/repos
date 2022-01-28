function clickCheckbox(e) {
    console.log(e);
    e.stopPropagation();
    e.target.checked = !e.target.checked;
    if (e.target.checked) {
        e.target.classList.add('checked');//toggle
        e.target.childNodes[0].classList.add('checkedBox');
    } else {
        e.target.classList.remove('checked');//toggle
        e.target.childNodes[0].classList.remove('checkedBox');
    }
}

function clickButton() {
    //div를 검색한다.
    const divs = document.getElementsByClassName('checked');
    //name속성이 있는 것들에서 name값을 뽑아 새 배열에 넣는다.
    let names = [];
    for (let i = 0; i < divs.length; ++i) {
        console.log(divs[i].getAttribute('name'));
        if (names.indexOf(divs[i].getAttribute('name')) < 0) {
            names.push(divs[i].getAttribute('name'));
        }
    }   
    //div chekced된 것 중에 name이 같은 것 끼리 val을 뽑는다.
    /*
    { 
        fruit: [orange, apple],
        color: [green]
    }
    */
    console.log(names);
    let obj = {};
    for (let i = 0; i < names.length; ++i) {
        obj[names[i]] = [];
        for (let j = 0; j < divs.length; ++j) {
            if (divs[j].getAttribute('name') === names[i]) {
                obj[names[i]].push(divs[j].getAttribute('val'));
            } 
        }
    }
    console.log(obj);
    
}
/*
let obj = {
    title: '',
    selected: {}
    items: [
        {},
        {}
    ],
    clickFunc: function() {

    }
}

let obj2 = {
    title: '',
    items: [
        {checked: true},
        {checked: false}
    ],
    clickFunc: function() {

    }
}

*/