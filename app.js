const express = require('express');
const mainRouter = require('./routes/mainRouter');
const app = express()
 


const session = require('express-session');

var MySQLStore = require('express-mysql-session')(session);

/*---------------------- global middleware ---------------------*/
const authMiddleware = require('./middlewares/authmiddleware');

if(process.env.NODE_ENV ){

    var sessionStore = new MySQLStore(options);

    var options = {
        host: 'us-cdbr-east-03.cleardb.com',
        port: 3306,
        user: 'b13b87e577c859',
        password: 'e9b67217',
        database: 'heroku_c4c796f2d40c24a'
    };

    app.use(session({secret:'TheSecretSession',resave:false,saveUninitialized:true ,store: sessionStore}))
}else{

    app.use(session({secret:'TheSecretSession',resave:false,saveUninitialized:true}))
}



//  defined port
const port = process.env.PORT || 3000


console.log(process.env.NODE_ENV);
app.use(express.static('public'))
app.use(authMiddleware)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(mainRouter)

app.set('view engine','ejs')








app.listen(port,()=>{

    console.log(`server ready on port ${port} `);
})