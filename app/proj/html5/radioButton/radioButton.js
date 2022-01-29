window.onload = function() {
    let data = {
        title: 'Fruit',
        selected: null,
        items: [
            {label: 'Banana', name: 'fruit', value: 'banana', checked: true},
            {label: 'Apple', name: 'fruit', value: 'apple'}
        ],
        click : function(item, ev) {
            if (item.parent.selected.domObj) {
                item.parent.selected.domObj.classList.remove('checked');
            }
            this.classList.add('checked');
            item.parent.selected = item;            
            item.parent.selected.domObj = this;
            //checked 처리: 
            //버튼에 클래스 넣어주고
            //selected에 넣어주고 
        }
    };

    makeRadioButton('radioContainer', data);

    function makeRadioButton(id, data) {
        //id는 받아서 append할거고
        let container = document.getElementById(id);        

        let initSelectedDiv = null;
        let initSelectedData = null;

        //data로 dom만들고 클릭 이벤트 넣어야겠지.
        for (let i = 0; i < data.items.length; ++i) {
            let div = document.createElement('div');
            div.setAttribute('name', data.items[i].name);
            div.setAttribute('value', data.items[i].value);        
            div.classList.add('radioButton');
            if (data.items[i].checked) {
                // div.classList.add('checked');
                initSelectedDiv = div;
                initSelectedData = data.items[i];
            }

            let btnDiv = document.createElement('div');
            btnDiv.classList.add('button');
            div.append(btnDiv);

            let circleDiv = document.createElement('div');
            //circleDiv.classList.add('circle');
            btnDiv.append(circleDiv);            

            let span = document.createElement('span');
            span.innerText = data.items[i].label;            
            div.append(span);
      
            data.items[i].parent = data;
            div.addEventListener('click', data.click.bind(div, data.items[i]));
            
            container.append(div);
        }

        //dom객체를 참조하고 있기 때문에 for문 밖에서 가능.
        initSelectedDiv.classList.add('checked');
        data.selected = initSelectedData;
        data.selected.domObj = initSelectedDiv;
    }
};