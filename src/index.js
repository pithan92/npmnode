const bodyParser = require("body-parser");

const express = require('express');
const bodyparse = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

require('./app/controllers/index.js')(app);
app.listen(3000);

//teste@vps.com 123456 mailtrap  
//vps.teste.vps@gmail.com 123456Aa-