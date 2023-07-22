$(document).ready(onReady);

let solutions;
let operator;

function onReady() {
    $('#submitBtn').on('click', handleSubmit);
    $('.operBtn').on('click', handleOperator);

    $('#clearBtn').on('click', handleClear)


}

const handleOperator = (event) => {
    event.preventDefault();

    console.log(event.target.id)

    switch (event.target.id) {
        case 'addBtn': 
            operator = '+';
            break;
        case 'subBtn': 
            operator = '-';
            break;
        case 'multBtn': 
            operator = '*';
            break;
        case 'divBtn': 
            operator = '/';
            break;
    }
        // console.log('operator: ', operator)
}

const handleSubmit = (event) => {
    event.preventDefault();
    console.log('in submit');

    let operationInputs = {
        number1: $('#num1').val(),
        number2: $('#num2').val(),
        operator: operator
    }
    console.log(operationInputs)
    $.ajax({
        method: 'POST',
        url: '/input',
        data: operationInputs
    }).then((response) => {
        console.log("SUCCESS!!!");
        // refresh solution
        getSolution();
        // render();
    }).catch(function(response) {
        // notify the user
        alert('request failed');
    });
}

const handleClear = (event) => {
    event.preventDefault();
    $('input').val('');
}

const getSolution = () => {
    $.ajax({
        method: 'GET',
        url: '/solution'
    }).then((response) => {
        console.log('in get solution: ', response)
        solutions = response;
        console.log('solutions: ', solutions)

        render()
    })
}

const render = () => {
    console.log('in render');
    $('#solutionList').empty();
    console.log(solutions[0])
    $('#solution').text(solutions[0].solution);
    console.log('this problem solution: ', solutions[0].solution)

    for (let solution of solutions) {
        $('#solutionList').append(`
        <li>${solution.number1} ${solution.operator} ${solution.number2} = ${solution.solution}
        `)
    }
}