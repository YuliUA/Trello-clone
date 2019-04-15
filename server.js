const express =require('express');
const bodyParser =require('body-parser');
const cors =require('cors');//create talking client-server
const passport = require('passport');
const compression =require('compression');// limiting project size

const usersRoute = require('./router/users')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

const port = 5000;

app.use ('/api/users', usersRoute)

app.listen(port,()=>{
    console.log('Hello from port ' + port + ' !')
})