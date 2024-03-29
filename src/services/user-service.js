const jwt = require('jsonwebtoken');
const  UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const { use } = require('../routes/v1');

class UserService{
        constructor(){
          this.userRepository = new UserRepository();
        }

        async create(data){
         try {
                const user = await this.userRepository.create(data);
                return user;
         } 
         catch (error) {
              if(error.name =='SequelizeValidationError'){
                     throw error;
              }
            console.log("Something went wrong in the Service layer");
            throw {error};       
         }
        }

        async destroy(userId){
         try {
              const user =await this.userRepository.destroy(userId);
              return user;    
         } 
         catch (error) {
                console.log("Something went wrong in the Service layer");
                throw {error};   
         }
        }

        async getById( userId ){
              try {
                     const userid = userId.id;
                     const user = await this.userRepository.getById( userid );
                     return user;
              } 
              catch (error) {
                     console.log("Something went wrong in the Service layer");
                     throw {error}; 
              }
        }

        async signIn(email, PlainPassword){
              try {
                     //step 1 -> fetch the user using the email
                     const user = await this.userRepository.getByEmail(email);
                     //step 2 -> compare incoming plain password with stores encrypted password
                     const passwordsMatch = this.checkPassword(PlainPassword, user.password);
                     if(!passwordsMatch){
                            console.log("Password does not match");
                            throw {error : 'Incorrect password'};
                     }
                     //step 3 -> if password match then create a tokenand send it to the user
                     const newJWT = this.createToken({email: user.email,id: user.id});
                     return newJWT;

              } 
              catch (error) {
                     if(error.name=='AttributeNotFound'){
                            throw error;
                     }
                     console.log("Something went wrong in the Sign in process");
                     throw {error};
              }
        }

        async isAuthenticated( token ){
              try {
                     const response = this.verifyToken(token);
                     if(!response){
                            throw {error: 'Invalid Token '}
                     }
                     const user = this.userRepository.getById(response.id);
                     if(!user){
                            throw {error: 'No user with the corresponding token exists'}
                     }
                     return user.id;
              } 
              catch (error) {
                     console.log("Something went wrong in the Sign in process");
                     throw {error};
              }
        }

         createToken( user ){
              try {
                     const result = jwt.sign(user, JWT_KEY, { expiresIn : '1d' });
                     return result;
              } 
              catch (error) {
                     console.log("Something went wrong in the Token creation");
                     throw {error}; 
              }
        }

        verifyToken( token ){
              try {
                     const response = jwt.verify(token, JWT_KEY);
                     return response;
              } 
              catch (error) {
                     console.log("Something went wrong in the Token validation",error);
                     throw {error}; 
              }
        }

        checkPassword(userInputPlainPassword, encryptedPassword){
              try {
                     return bcrypt.compareSync(userInputPlainPassword, encryptedPassword)
              } 
              catch (error) {
                     console.log("Something went wrong in the Password comparison",error);
                     throw {error};
              }
        }

        isAdmin( userId ){
              try {
                     return this.userRepository.isAdmin(userId);
              } 
              catch (error) {
                     console.log("Something went wrong in the service layer");
                     throw {error};
              }
        }
}

module.exports=UserService;