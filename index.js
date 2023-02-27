var expression = document.getElementsByTagName("input")[0].value;
var global = '';

function inputChangeHandler (event) {
    if(event.target.innerHTML === '.') {
        if(expression === '') {
            expression = '0.';
        }
        else {
            expression += '.0'
        }
        document.getElementsByTagName('input')[0].value = expression;
    }
    else {
        expression = document.getElementsByTagName("input")[0].value;
        expression += String(event.target.innerHTML);
        document.getElementsByTagName('input')[0].value = expression;
    }
}

function submitHandler() {
    console.log(expression);
    expression = eval(expression);
    document.getElementsByTagName('input')[0].value = expression;
}

function actionHandler(event) {
    if(event.target.innerHTML === 'C') {
        expression = '';
        document.getElementsByTagName('input')[0].value = expression;
    }
    else if(event.target.innerHTML === '1/x') {
        expression = eval(1/eval(expression));
        document.getElementsByTagName('input')[0].value = expression;
    }
    else if(event.target.innerHTML === 'x2') {
        expression *= eval(expression);
        document.getElementsByTagName('input')[0].value = expression;
    }
    else if(event.target.innerHTML === '√') {
        expression = Math.sqrt(eval(expression));
        document.getElementsByTagName('input')[0].value = expression;
    }
    else if(event.target.innerHTML === '±') {
        expression = eval(expression) * -1;
        document.getElementsByTagName('input')[0].value = expression;
    }
}

function storageHandler(event) {
    if(event.target.innerHTML === 'MS') {
        if(isNaN(expression) || expression === '') {
            console.log('Cannot store equation!');
        }
        else {
            global = expression;
        }
    }
    else if(event.target.innerHTML === 'MC') {
        global = '';
    }
    else if(event.target.innerHTML === 'MR') {
        expression = global;
        document.getElementsByName('input')[0].value = expression;
    }
    else if(event.target.innerHTML === 'M+') {
        expression += global;
        global = expression;
        document.getElementsByName('input')[0].value = expression;
    }
}