const express = require('express');

const UserController = require('../../controller/user-controller');
const  { AuthRequestValidators }  = require('../../middlewares/index');

const router = express.Router();

router.post(
        '/signup', 
        AuthRequestValidators.validateUserAuth,
        UserController.create
);
//router.get('/get', UserController.getById);
router.post(
        '/signin', 
        AuthRequestValidators.validateUserAuth,
        UserController.signIn
        );

module.exports = router;