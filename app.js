const express = require('express');
const mainRouter = require('./routes/mainRouter');
const app = express()

const session = require('express-session');

/*---------------------- global middleware ---------------------*/
const authMiddleware = require('./middlewares/authmiddleware');

//  defined port
const port = process.env.PORT || 3000



app.use(session({secret:'TheSecretSession',resave:false,saveUninitialized:true}))
app.use(authMiddleware)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(mainRouter)

app.set('view engine','ejs')








app.listen(3000,()=>{

    console.log(`server ready on port ${port} `);
})