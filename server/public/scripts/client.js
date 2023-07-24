$(document).ready(onReady);

let solutions;
let displayedNum;

function onReady() {

    $('.numBtn').on('click', handleNumber);
    $('.operBtn').on('click', handleOperator);
    $('#submitBtn').on('click', handleSubmit);
    $('#clearBtn').on('click', handleClear);
    $('#allClearBtn').on('click', handleAllClear);
    $('#solutionList').on('click', 'li', handleRedo);


}

const handleRedo = (event) => {
    console.log('index: ', solutions[$('event.target').data('index')]);
    console.log('index of this:', solutions.indexOf($(event.target)));

    // $.ajax({
    //     method: 'POST',
    //     url: '/redo',
    //     data: {
    //         redoCalc: 
    //     }
    // }).then((response) => {
    //     console.log("SUCCESS!!!");
    //     // refresh solution
    //     getSolution();
    //     // render();
    // }).catch(function (response) {
    //     // notify the user
    //     alert('request failed');
    // });

    // ${solution.number1} ${solution.operator} ${solution.number2}
}

// $.ajax({
//     method: 'GET',
//     url: '/redo'
// }).then((response) => {
//     console.log('in redo solution: ', response)
//     // solutions = response;
//     // console.log('solutions: ', solutions)
// })

const handleAllClear = () => {
    $('#inputField').children().empty();

    $.ajax({
        method: 'DELETE',
        url: '/deletecalculations',
        data: 'calcHistory'
    }).then((response) => {
        console.log("SUCCESS!!!");
        // refresh solution
        getSolution();
        // render();
    }).catch(function (response) {
        // notify the user
        alert('request failed');
    });


}

const handleNumber = (event) => {

    console.log(event.target.id)

    let newNum = event.target.id;
    console.log('newNum is:', newNum)

    if ($('#operator').text() == '') {
        $('#num1').text($('#num1').text() + newNum);
    } else {
        $('#num2').text($('#num2').text() + newNum);
    }

}


const handleOperator = (event) => {
    event.preventDefault();

    console.log(event.target.id)

    let newOper = event.target.id;
    console.log('newOper is:', newOper)

    if ($('#operator').text() == '') {
        $('#operator').text($('#operator').text() + newOper);
        // switch (event.target.id) {
        //     case 'addBtn': 
        //         operator = '+';
        //         break;
        //     case 'subBtn': 
        //         operator = '-';
        //         break;
        //     case 'multBtn': 
        //         operator = '*';
        //         break;
        //     case 'divBtn': 
        //         operator = '/';
        //         break;
        // }
        //     // console.log('operator: ', operator)
    }
}

const handleSubmit = (event) => {
    event.preventDefault();
    console.log('in submit');

    let operationInputs = {
        number1: $('#num1').text(),
        number2: $('#num2').text(),
        operator: $('#operator').text()
    }
    console.log(operationInputs.number1)

    if (operationInputs.number1 && operationInputs.number2 && operationInputs.operator) {
        console.log('in client post')
        $.ajax({
            method: 'POST',
            url: '/input',
            data: operationInputs
        }).then((response) => {
            console.log("SUCCESS!!!");
            // refresh solution
            getSolution();
            // render();
        }).catch(function (response) {
            // notify the user
            alert('request failed');
        });
    }
    $('#inputField').children().empty();
}

const handleClear = (event) => {
    event.preventDefault();
    $('#inputField').children().empty();
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
    $('#solution').text('');

    for (let solution of solutions) {
        if (solution == solutions[0]) {
             $('#solution').text(solutions[0].solution);
            console.log('this problem solution: ', solutions[0].solution)
        }
        $('#solutionList').append(`
            <li class="calcItem">${solution.number1} ${solution.operator} ${solution.number2} = ${solution.solution}
            `)
        solution.index = solutions.indexOf(solution);
        console.log('solution with index: ', solution)
    }

}