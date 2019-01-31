const express = require('express'); //returns a function
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const partiesRoutes = require('./api/v1/routes/parties');
// const officesRoutes = require('./api/v1/routes/offices');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
	extended: false	
}));

app.use(bodyParser.json());
app.use('/api/v1/parties', partiesRoutes);
// app.use('/offices', officesRoutes);

//handle errors incase any requests makes it to this line
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error); //set the error as the http request
});

app.use((error,req,res,next)=>{
	res.status(error.status || 500);
	res.json(
		{
		error: {
				message: error.message
			}
		}
	);
});

module.exports = app;

