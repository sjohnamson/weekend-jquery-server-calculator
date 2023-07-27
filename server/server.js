const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// declare variable that will hold the array of solutions
let calcHistory = [];

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('server/public'));

app.post('/input', (req, res) => {

    // assign body to a variable and call calculate() with it
    let operInput = req.body;
    calculate(operInput);

    res.sendStatus(201);
})

// receive the delete POST and empty calcHistory
app.delete('/deletecalculations', (req, res) => {

    calcHistory = [];

    res.send("DELETE Request Called")
})

// calculate the operation depending on what operator was entered
const calculate = (inputs) => {
    switch (inputs.operator) {
        case '+':
            inputs.solution = Number(inputs.number1) + Number(inputs.number2);
            break;
        case '-':
            inputs.solution = inputs.number1 - inputs.number2;
            break;
        case '*':
            inputs.solution = inputs.number1 * inputs.number2;
            break;
        case '/':
            inputs.solution = inputs.number1 / inputs.number2;
            break;
    }
    // add the new calculation to the calculation array
    calcHistory.unshift(inputs);
}

// prepare the calculation array for GET
app.get('/solution', (req, res) => {

    res.send(calcHistory);
})

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})

