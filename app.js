const express = require('express');
const mainRouter = require('./routes/mainRouter');
const app = express()
// const MemoryStore =require('memorystore')


const session = require('express-session');

var MySQLStore = require('express-mysql-session')(session);

/*---------------------- global middleware ---------------------*/
const authMiddleware = require('./middlewares/authmiddleware');


var options = {
	host: 'localhost',
	port: 3306,
	user: 'b13b87e577c859',
	password: 'pase9b67217sword',
	database: 'heroku_c4c796f2d40c24a'
};

var sessionStore = new MySQLStore(options);


//  defined port
const port = process.env.PORT || 3000


app.use(express.static('public'))
// app.use(session({secret:'TheSecretSession',resave:false,saveUninitialized:true}))
app.use(session({secret:'TheSecretSession',resave:false,saveUninitialized:true ,store: sessionStore}))
app.use(authMiddleware)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(mainRouter)

app.set('view engine','ejs')








app.listen(3000,()=>{

    console.log(`server ready on port ${port} `);
})