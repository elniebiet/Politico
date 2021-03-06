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
	let id = partieslist.length + 1;
	partieslist.push([{
		"id": id,
		"name": req.body.name,
		"logoUrl": req.body.logoUrl
	}]);
	return res.status(200).json({
		status: '200',
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

//edit a specific political party
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