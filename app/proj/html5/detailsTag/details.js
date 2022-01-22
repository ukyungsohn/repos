window.onload = function() {
    const container = document.getElementById('container');
    const button = document.getElementById('button');
    const summary = document.getElementById('summary');
    const context = document.getElementById('context');
    context.style.display = 'none';
    container.addEventListener('click', function() {
        if (context.style.display === 'none') {
            context.style.display = 'block';
            button.innerHTML = '▼';
        } else {
            context.style.display = 'none';
            button.innerHTML = '▶';
        }
    });
};