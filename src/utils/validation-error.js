const AppError= require('./error-handler');
const { StatusCodes } = require('http-status-codes');
class ValidationError extends AppError{
     constructor( error ){
        let erroName = error.name;
        let explaination = [];
        error.errors.forEach((err)=>{
           explaination.push(err.message);
        });
         super(
                erroName,
                explaination,
                'Not able to validate the data sent in the request',
                StatusCodes.BAD_REQUEST
         )
     }
}

module.exports=ValidationError;