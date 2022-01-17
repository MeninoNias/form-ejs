// Imports
const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator')

const app = express();
const port = 3000;

//set views
app.set('view engine', 'ejs');

const urlencodedParser = bodyParser.urlencoded({extended:false});

app.get('', (req, res) => {
    res.render('index')
})

app.get('/register', (req, res) =>{
    res.render('register')
})

app.post('/register', urlencodedParser, [
    check('username', 'Este nome de usuário precisa ter mais que 3 caracteres')
    .exists()
    .isLength({min:3}),
    check('email', 'Email não é um email valido')
    .isEmail()
    .normalizeEmail(),
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('register', {
            alert
        })
    }
})

app.listen(port, () => console.info(`App Start on port ${port}`));