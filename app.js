
const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose');

// load routes

const loginRoute = require('./routes/auth');
const employeeRoute = require('./routes/employee');

mongoose.connect("mongodb+srv://rev-db:tigerLion1234@cluster0-k37b9.mongodb.net/test?retryWrites=true&w=majority",{ useUnifiedTopology: true,useNewUrlParser: true });

mongoose.Promise = global.Promise;


//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', () => {
console.log('mongoDB connection error')
});

//body-parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: false
}));


// load routes
app.use('/auth',loginRoute);
app.use('/employee',employeeRoute)


app.set('port', 3000);

app.listen(app.get('port'), () => {
    console.log('app listening on port 3000');
});