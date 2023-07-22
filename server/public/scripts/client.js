$(document).ready(onReady);

let solutions;
let operator;

function onReady() {
    $('#submitBtn').on('click', handleSubmit);
    // $('.operBtn').on('click', handleOperator);

    $('#clearBtn').on('click', handleClear)


}

// const handleOperator = (event) => {
//     event.preventDefault();
//     console.log('in operator')

//     if($(this).hasClass('addBtn')) {
//         operator = 
//     }

// }

const handleSubmit = (event) => {
    event.preventDefault();
    console.log('in submit');

    let operationInputs = {
        num1: $('#num1').val(),
        num2: $('#num2').val()

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

const handleClear = () => {
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
    $('#solution').val(solutions[0].solution);

    for (let solution of solutions) {
        $('#solutionList').append(`
        <li>${solution.num1} operator ${solution.num2} = ${solution.solution}
        `)
    }
}