const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger') ;
const morgan = require('morgan') ; 
dbConnect = require('./config/db')
//Route files
const bootcamps = require('./routes/bootcamps') ;
dotenv.config({ path : './config/config.env' });
dbConnect();
const app = express();
app.use(express.json());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.get('/' , (req,res) => {
    res.send('Hello from express');
});

//app.use(logger) ; 
app.use('/api/v1/bootcamp' , bootcamps)

const { middleware, visualizer } = require('express-routes-visualizer')
 
app.use(
  '/routes',
  middleware({ httpMethods: true }),
  visualizer({ theme: 'dark-blue' })
)
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT,console.log(`Server running on ${process.env.NODE_ENV} on port ${PORT}`));

//handle rejections
process.on('unhandledRejection' , (err,promise) => {
    console.log(`Err: ${err.message}`) ;
    server.close(() => process.exit(1));
});

