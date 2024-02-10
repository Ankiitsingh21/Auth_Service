const { response } = require('express');
const  UserService  = require('../services/user-service');

const userService = new UserService();

const create = async (req,res) => {
  try {
        const response = await userService.create({
                email: req.body.email,
                password: req.body.password
        })
        return res.status(201).json({
                success: true,
                data : response,
                message: "Successfully created a new User",
                err : {}
        })
  } 
  catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
           message: error.message,
           data : {},
           success : false,
           err : error.explaination
        });
  }
}

const getById = async (req,res) => {
        try {
                const response = await userService.getById(req.query);
                return res.status(201).json({
                        success: true,
                        data : response,
                        message: "Successfully get all new User",
                        err : {}
                })
        } 
        catch (error) {
                console.log(error);
                return res.status(500).json({
                   message: "Something went wrong",
                   data : {},
                   success : false,
                   err : error
                }); 
        }

}

const signIn= async ( req,res)=>{
        try {
                const response = await userService.signIn(req.body.email, req.body.password);
                return res.status(201).json({
                        success: true,
                        data : response,
                        message: "Successfully Signed in",
                        err : {}
                });
        } 
        catch (error) {
                console.log(error);
                return res.status(error.statusCode).json({
                   message: error.message,
                   data : {},
                   success : false,
                   err : error.explanation
                }); 
        }
}

const isAuthenticated= async (req,res)=>{
        try {
                const token = req.headers['x-access-token'];
                const response = await userService.isAuthenticated(token);
                return res.status(201).json({
                        data : response,
                        success: true,
                        err : {},
                        message : 'user is authenticated and token is valid'
                })
        } 
        catch (error) {
                console.log(error);
                return res.status(500).json({
                   message: "Something went wrong",
                   data : {},
                   success : false,
                   err : error
                }); 
        }
}

const isAdmin = async(req,res)=>{
        try {
               const response = await userService.isAdmin(req.body.userId);
               return res.status(201).json({
                data : response,
                        success: true,
                        err : {},
                        message : 'Successfully fetched user is admin or not'
               }) 
        } 
        catch (error) {
                console.log(error);
                return res.status(500).json({
                   message: "Something went wrong",
                   data : {},
                   success : false,
                   err : error
                }); 
        }
}

module.exports={
        create,
        getById,
        signIn,
        isAuthenticated,
        isAdmin
}

