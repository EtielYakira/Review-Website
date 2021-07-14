
module.exports = function Auth(req,res,next)  {
    
        if(req.cookies.session_id){
        console.log('Auth SUCSUSS')
    }else{
        console.log(req.cookies.session_id)
        console.log('Auth FAILDDDD')

        }
       next()
    }
