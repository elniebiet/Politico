const express = require('express');

const router = express.Router();

officeslist = []; //for posts
getOfficeslist = [ //for gets

	{"id":"1", "type":"federal", "name":"president"},
	{"id":"2", "type":"legislative", "name":"senator"},
    {"id":"3", "type":"state", "name":"governor"},
	{"id":"4", "type":"local government", "name":"chairman"}

]; 
//create party endpoint
router.post('/', (req,res,next)=>{
	const office = {
        type: req.body.type,
		name: req.body.name
	}
	if((!req.body.name) || (req.body.type != "federal"  && req.body.type != "legislative" && req.body.type != "state" && req.body.type != "local government")){
		return res.status(400).json({
			"status": "400",
			"error":"Bad request, supply all fields, type can be federal, legislative, state or local government"
		});
	}
	let id = officeslist.length + 1;
	officeslist.push([{
		"id": id,
		"type": req.body.type,
		"name": req.body.name
	}]);
	return res.status(200).json({
		status: '200',
		data: [{
			"id": id,
            "type": req.body.type,
            "name": req.body.name
		}]
	});
});

//get all political offices
router.get('/', (req,res,next)=> {
	if(getOfficeslist.length == 0){
		return res.status(204).json({
			status: 204,
			message: 'No offices available'
		});
	} else {
		return res.status(200).json({
			status:200, 
			data: getOfficeslist
		});
	}
});




module.exports = router;