$(document).ready(onReady);

let solutions;

function onReady() {

    getSolution();

    $('.numBtn').on('click', handleNumber);
    $('.operBtn').on('click', handleOperator);
    $('#submitBtn').on('click', handleSubmit);
    $('#clearBtn').on('click', handleClear);
    $('#allClearBtn').on('click', handleAllClear);
    // $('#solutionList').on('click', '.calcItem', handleRedo);


}

const handleAllClear = () => {
    $('#inputField').children().empty();
// POSTs to delete the calculations stored on the server
    $.ajax({
        method: 'DELETE',
        url: '/deletecalculations',
        data: 'calcHistory'
    }).then((response) => {
        // refresh solution after deletion
        getSolution();
    }).catch(function (response) {
        // notify the user
        alert('request failed');
    });

}

const handleNumber = (event) => {
// create variable with the button clicked
    let newNum = event.target.id;

// place button clicked data in correct span based on whether its being entered before or after an operator
    if ($('#operator').text() == '') {
        $('#num1').text($('#num1').text() + newNum);
    } else {
        $('#num2').text($('#num2').text() + newNum);
    }

}


const handleOperator = (event) => {
// declare a variable using the id of the button clicked
    let newOper = event.target.id;

// add operator to operator span if it is empty
    if ($('#operator').text() == '') {
        $('#operator').text($('#operator').text() + newOper);
    }
}

const handleSubmit = () => {
// create variable of entered calculation
    let operationInputs = {
        number1: $('#num1').text(),
        number2: $('#num2').text(),
        operator: $('#operator').text()
    }

    // check to see if complete operation has been entered
    if (operationInputs.number1 && operationInputs.number2 && operationInputs.operator) {
        
    //   POST the input object to the server
        $.ajax({
            method: 'POST',
            url: '/input',
            data: operationInputs
        }).then((response) => {
            // refresh solution
            getSolution();
        }).catch(function (response) {
            // notify the user
            alert('request failed');
        });
    }
    // clear input field
    $('#inputField').children().empty();
}

const handleClear = () => {
// clear input field when clear is clicked
    $('#inputField').children().empty();
}

const getSolution = () => {
    // GET solution array from the server
    $.ajax({
        method: 'GET',
        url: '/solution'
    }).then((response) => {

        solutions = response;

// render the solution to the DOM
        render()
    })
}

const render = () => {
    // empty the soution list and solution field
    $('#solutionList').empty();
    $('#solution').text('');

    // loop over the solution array, entering the first solution to the solution field and appending the other calculations to the solutions list
    for (let solution of solutions) {
        if (solution == solutions[0]) {
             $('#solution').text(solutions[0].solution);
        }
        // solution.id = solutions.indexOf(solution);
        $('#solutionList').append(`
            <li class="calcItem">${solution.number1} ${solution.operator} ${solution.number2} = ${solution.solution}
            `)
     
    }

}
// beginning attempt to add on click to calculation rows to rerun calculation
// const handleRedo = (event) => {
//     let solutionID = $(this).children().attr('id')
//     console.log('index: ', solutionID);
//     console.log('index of this:', solutions.indexOf($(event.target)));

  
// }