const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/errorHandler');

app.use(cors());
app.options('*', cors());

// MiddleWare APIs
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

// Routes
const patientsRouter = require('./routers/patients');
const hospitalsRouter = require('./routers/hospitals');
const requestsRouter = require('./routers/requests');

const api = process.env.API_URL;

// Routers
app.use(`${api}/patients`, patientsRouter);
app.use(`${api}/hospitals`, hospitalsRouter);
app.use(`${api}/requests`, requestsRouter);

// Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'nearer_db'
})
.then(()=>{
    console.log('Database Connection established.')
})
.catch(()=>{
    console.log(err)
})

// Development
// app.listen(3000, ()=>{
//     console.log(api);
//     console.log("Server is ready... http://localhost:3000");
// });

// Production
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("Express is working on port " + port);
})