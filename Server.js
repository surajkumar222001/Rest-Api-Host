const express = require('express');
const  app = express();
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');


//config cors

app.use(cors());

//configure express to receive the form data
app.use(express.json());

// configure dotEnv
dotEnv.config({path :'./.env'});

const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 5000;


// connect to mongoDb
mongoose.connect(process.env.MONGO_DB_URL,{
    useNewUrlParser : true ,
    useUnifiedTopology : true ,

} ).then((response) => {
    console.log("Connect to MongoDb..............")
}).catch((error) => {
    console.error(error);
    process.exit(0)
})

// basic configure
app.get('/' , (request,response) => {
   response.send(`welcome to live server host`)
});

app.use('/api/users' , require('./routers/userRouter'));



app.listen(port,hostname,() => {
    console.log(`Express Server is started`)
})