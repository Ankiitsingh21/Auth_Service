const express = require('express');
const bodyparser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
//const { User } = require('./models/index');
//const bcrypt = require('bcrypt');



const app = express();

const prepareAndStartServer = ()=>{


        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({extended:true}));

        app.use('/api',apiRoutes)

        app.listen(PORT, async ()=>{
         console.log(`Server started at PORT : ${PORT}`);
         //const incomingpassword = "Ankit@12";
         //const user = await User.findByPk(2);
         //const response = bcrypt.compareSync(incomingpassword,user.password);
         //console.log(response);
        });
}

prepareAndStartServer();