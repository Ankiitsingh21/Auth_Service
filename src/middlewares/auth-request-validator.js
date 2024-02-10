const validateUserAuth = (req,res,next)=>{
        if(!req.body.email || !req.body.password){
                return res.status(400).json({
                        success: false,
                        data : {},
                        message: 'Something went wrong',
                        err: 'Email or password is missing in the signup request'
                })
        }
        next();
}

const validateIsAdminRequest = (req,res,next)=>{
        if(!req.body.id){
                return res.status(400).json({
                        succes: false,
                        data: {},
                        err:'UserId not given',
                        message:'something went wrong'
                })
        }
        next();
}

module.exports={
        validateUserAuth,
        validateIsAdminRequest
}