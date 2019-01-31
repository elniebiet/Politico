const express = require('express');

const router = express.Router();

// const Product = require('../models/party');
partieslist = [];

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
	res.status(200).json({
		status: '200',
		data: [{
			"id": id,
			"name": req.body.name
		}]
	});
});



module.exports = router;