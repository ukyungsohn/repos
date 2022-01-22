window.onload = function() {
    const progressBoxWidth = 200;
    const progressHeight = 20;

    const container = document.getElementById('container');
    const value = container.getAttribute('value');
    const min = container.getAttribute('min');
    const max = container.getAttribute('max');

    const minSpan = document.createElement('span');
    minSpan.innerHTML = min;
    minSpan.style.float = 'left';

    const progressBox = document.createElement('div');
    progressBox.style.width = progressBoxWidth + 'px';
    progressBox.style.border = '1px solid black'
    progressBox.style.float = 'left';

    const progress = document.createElement('div');
    progress.style.width = (value / max) * 100 + '%';
    progress.style.backgroundColor = 'green';
    progress.style.height = progressHeight + 'px';

    const valueSpan = document.createElement('span');
    valueSpan.innerHTML = value;
    valueSpan.style.position = 'absolute';    
    valueSpan.style.top = progressHeight + 5 + 'px';
    valueSpan.style.left = progressBoxWidth * (value / max); 

    progressBox.append(progress);    

    const maxSpan = document.createElement('span');
    maxSpan.innerHTML = max;

    container.append(minSpan);
    container.append(progressBox);
    container.append(valueSpan);
    container.append(maxSpan);
};
