const express = require('express');
const bodyparser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models/index'); 
//const {User,Role} = require('./models/index');


const app = express();

const prepareAndStartServer = ()=>{


        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({extended:true}));

        app.use('/api',apiRoutes)

        app.listen(PORT, async ()=>{
         console.log(`Server started at PORT : ${PORT}`);
          if(process.env.DB_SYNC){
             db.sequelize.sync({alter : true});
          }

          //const u1 = await User.findByPk(6);
          //const r1 = await Role.findByPk(2);
          //u1.addRole(r1);

        });
}

prepareAndStartServer();