const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let calcHistory = [];

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('server/public'));

app.post('/input', (req, res) => {
    console.log('in server post input', req.body);

    // assign body to a variable and call calculate() with it
    let operInput = req.body;
    calculate(operInput);

    res.sendStatus(201);
})

app.delete('/deletecalculations', (req, res) => {
    console.log('in delete request', req.body);
    calcHistory = [];

    res.send("DELETE Request Called")
})

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
    console.log(inputs.solution);
    calcHistory.unshift(inputs);
}

app.get('/solution', (req, res) => {
    console.log('in solution get');

    res.send(calcHistory);
})






app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})