const express = require('express');
 const app = express();

 require('dotenv').config();
 const PORT = process.env.PORT || 4000;

 app.use(express.json());

 const todoRoutes = require('./routes/todos.js');

 app.use('/api/v1/',todoRoutes);

 app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    }   )
 const connectDB = require('./config/database.js');
    connectDB();

    app.get('/',(req,res)=>{
        res.send('Welcome to the Todo API')
    }
    )