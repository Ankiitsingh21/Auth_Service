const { StatusCodes } = require('http-status-codes');
const AppError= require('./error-handler');
class ClientError extends AppError{
     constructor( name, explaination, message, statusCode ){
         super(
                name,
                explaination,
                message,
                statusCode
         )
     }
}

module.exports=ClientError;