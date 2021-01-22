const authMiddleware = (req,res,next)=>{

    if(req.session.user){


       
        res.locals.userLoged = req.session.user 
         
    }


    next()
}


module.exports= authMiddleware