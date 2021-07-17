
module.exports = function Auth(req,res,next)  {
    
        if(req.cookies.session_id){
    }else{
        console.log(req.cookies.session_id)

        }
       next()
    }
