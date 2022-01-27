function clickCheckbox(e) {
    e.target.checked = !e.target.checked;
    if (e.target.checked) {
        e.target.classList.add('checked');
        e.target.childNodes[0].classList.add('checkedBox');
        console.log(e.target.getAttribute('val'));
    } else {
        e.target.classList.remove('checked');
        e.target.childNodes[0].classList.remove('checkedBox');
    }
}

function clickButton() {

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