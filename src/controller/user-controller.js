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
                data : response,
                success: true,
                message: "Successfully created a new User",
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

const getById = async (req,res) => {
        try {
                const response = await userService.getById(req.query);
                return res.status(201).json({
                        data : response,
                        success: true,
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
                        data : response,
                        success: true,
                        message: "Successfully Signed in",
                        err : {}
                });
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
        signIn
}

