const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let calcHistory = [{num1: 8, num2: 4}];

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('server/public'));

app.post('/input', (req, res) => {
    console.log('in server post input', req.body);

    // assign body to a variable and call calculate() with it
    // operInput = req.body;
    // calculate(operInput);

    res.sendStatus(201);
})

// const calculate = (calculation) => {
//     // calculation.solution = calculation.num1 calculation.operator calculation.num2;
//     // calcHistory.unshift(calculation);
// }

app.get('/solution', (req, res) => {
    console.log('in solution get');

    res.send(calcHistory);
})






app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})