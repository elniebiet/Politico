const express = require('express');

const router = express.Router();

officeslist = []; //for posts
getOfficeslist = [ //for gets

	{"id":"1", "type":"federal", "name":"president"},
	{"id":"2", "type":"legislative", "name":"senator"},
    {"id":"3", "type":"state", "name":"governor"},
	{"id":"4", "type":"local government", "name":"chairman"}

]; 
//create office endpoint
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

//get an office
router.get('/:officeId', (req,res,next)=> {
	let officeName = ""; 
	let offId = 0;
	let officeType = "";
	const id = req.params.officeId;
	if(isNaN(id) == true){
		return res.status(406).json({
			status: 406,
			error: "Not Acceptable, Input a number as id"
		});
	} else {
		getOfficeslist.forEach(function(val,index){
			if(val['id'] == id){
				offId = val['id'];
				officeName = val['name'];
				officeType = val['type'];
				
				 return res.status(200).json({
					'status': '200',
					'data': [{
						"id": offId,
                        "type": officeType,
                        "name": officeName 
					}]
				});
			} 
		});
	
		console.log(id);
		return res.status(406).json({
			status: 404,
			error: "Not Found"
		});
	}
});



module.exports = router;