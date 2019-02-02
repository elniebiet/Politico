const express = require('express');

const router = express.Router();

// const Product = require('../models/party');
partieslist = []; //for posts
getPartieslist = [ //for gets
		
	{"id":"1", "name":"PDP", "hqAddress":"Abj", "logoUrl": "google.com/photo"},
	{"id":"2", "name":"APC", "hqAddress":"Lag", "logoUrl": "google.com/photo"},
	{"id":"3", "name":"APGA", "hqAddress":"Lag", "logoUrl": "google.com/photo"}

]; 
//create party endpoint
router.post('/', (req,res,next)=>{
	const party = {
		name: req.body.name,
		hqAddress: req.body.hqAddress,
		logoUrl: req.body.logoUrl
	}
	if(!req.body.name || !req.body.hqAddress || !req.body.logoUrl){
		return res.status(400).json({
			"status": "400",
			"error":"Bad request, supply all fields"
		});
	}
	if(req.body.name.replace(/ /gi, "") === "" || req.body.hqAddress.replace(/ /gi, "") === "" || req.body.logoUrl.replace(/ /gi, "") === ""){
		return res.status(400).json({
			"status": "400",
			"error":"Bad request, supply all fields"
		});
	}

	//check that it doesnt exist already
	getPartieslist.forEach(function(val,index){
		if(val['name'] == req.body.name){
			return res.status(406).json({
				status: 406,
				error: "Not Acceptable, Name already exists"
			});
		}
	});

	let id = partieslist.length + 1;
	partieslist.push([{
		"id": id,
		"name": req.body.name,
		"logoUrl": req.body.logoUrl
	}]);
	return res.status(200).json({
		status: '201',
		data: [{
			"id": id,
			"name": req.body.name
		}]
	});
});

//get all parties
router.get('/', (req,res,next)=> {
	if(getPartieslist.length == 0){
		return res.status(204).json({
			status: 204,
			message: 'No parties available'
		});
	} else {
		return res.status(200).json({
			status:200, 
			data: getPartieslist
		});
	}
});

//get a party
router.get('/:partyId', (req,res,next)=> {
	let PartyName = ""; 
	let PartyId = 0;
	let partyLogo = "";
	const id = req.params.partyId;
	if(isNaN(id) == true){
		return res.status(406).json({
			status: 406,
			error: "Not Acceptable, Input a number as id"
		});
	} else {
		getPartieslist.forEach(function(val,index){
			if(val['id'] == id){
				partyId = val['id'];
				partyName = val['name'];
				partyLogo = val['logoUrl'];
				
				console.log(PartyId, PartyName, partyLogo);
				 return res.status(200).json({
					'status': '200',
					'data': [{
						"id": partyId,
						"name": partyName,
						"logoUrl": partyLogo 
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

//edit a specific political party details
router.patch('/:partyId', (req,res,next)=> {
	
	const id = req.params.partyId;
	if(isNaN(id) == true){
		return res.status(406).json({
			status: 406,
			error: "Not Acceptable, Input a number as id"
		});
	} 
	console.log(req.body.name);
	if(req.body.name && req.body.hqAddress && req.body.logoUrl){
		//if name is empty
			if(req.body.name.replace(/ /gi, "") === "" || req.body.hqAddress.replace(/ /gi, "") === "" || req.body.logoUrl.replace(/ /gi, "") === ""){
				return res.status(400).json({
					"status": "400",
					"error":"Bad request, supply all fields"
				});
			}
			getPartieslist.forEach(function(val,index){
				console.log(id);
				if(val['id'] == id){
					val['name'] = req.body.name;
					val['hqAddress'] = req.body.hqAddress;
					val['logoUrl'] = req.body.logoUrl;
										
					console.log(val['name'], val['hqAddress'], val['logoUrl']);
					 return res.status(200).json({
						'status': '200',
						'data': [{
							"id": val['id'],
							"name": val['name'],
							"logoUrl": val['logoUrl'] 
						}]
					});
				} 
			});
			return res.status(406).json({
				status: 404,
				error: "Not Found"
			});
	
		}
	return res.status(406).json({
		status: 400,
		error: "Bad Request, supply all fields"
	});
});


//edit a specific political party name
router.patch('/:partyId/:name', (req,res,next)=> {
	if(req.params.name.length <= 2 ){
		return res.status(406).json({
			status: 406,
			error: "Input less than 2 characters is not acceptable"
		});
	}
	if(isNaN(req.params.name) == false){
		return res.status(406).json({
			status: 406,
			error: "Input a valid name"
		});
	}
	const id = req.params.partyId;
	if(isNaN(id) == true){
		return res.status(406).json({
			status: 406,
			error: "Not Acceptable, Input a number as id"
		});
	} 
	getPartieslist.forEach(function(val,index){
		console.log(id);
		if(val['id'] == id){
			val['name'] = req.params.name;
			
				return res.status(200).json({
				'status': '200',
				'data': [{
					"id": val['id'],
					"name": val['name'],
					"logoUrl": val['logoUrl'] 
				}]
			});
		} else {
			return res.status(406).json({
				status: 404,
				error: "Not Found"
			});
		}
	});
			
	return res.status(406).json({
		status: 400,
		error: "Bad Request, supply all fields"
	});
});

//delete a political party
router.delete('/:partyId', (req,res,next)=> {
	
	const id = req.params.partyId;
	if(isNaN(id) == true){
		return res.status(406).json({
			status: 406,
			error: "Not Acceptable, Input a number as id"
		});
	} 
	console.log(req.body.name);
	getPartieslist.forEach(function(val,index){
		console.log(id);
		if(val['id'] == id){
			getPartieslist.splice(id-1,1);
				return res.status(200).json({
				'status': '200',
				'data': [{
					"message": "Deleted Successfully"
				}]
			});
		} 
	});
	return res.status(406).json({
		status: 404,
		error: "Not Found"
	});
});





module.exports = router;