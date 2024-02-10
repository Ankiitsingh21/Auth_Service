const { StatusCodes } = require('http-status-codes');
class AppError extends Error{
        constructor(
          name = 'AppError',
          explaination = 'Something went wrong',
          message = 'Something went wrong',
          statusCode = StatusCodes.INTERNAL_SERVER_ERROR
        ){
                super();
                this.name=name,
                this.explaination=explaination,
                this.message=message,
                this.statusCode=statusCode
        }
}
module.exports = AppError;