#!/usr/bin/env node

var nconf = require('nconf');
var toS3 = require('couch-to-s3');

nconf.file('dev', 'config-dev.json').argv().env().file('config.json');
nconf.defaults({
	"dbUrl": "http://localhost:5984",
	"dbName": "database",
	"s3BucketName": "bucket",
	"awsCredentialsPath": ".aws/credentials"
});

var options = {
	dbUrl: nconf.get('dbUrl'),
	dbName: nconf.get('dbName'),
	awsCredentialsPath: nconf.get('awsCredentialsPath'),
	s3BucketName: nconf.get('s3BucketName')
};

toS3(options, function (err, body) {
	if (err) {
		console.log("FAILURE");
		console.log(err.message);
		console.log(err.error);
		return;
	}

	console.log("SUCCESS");
	console.log(body.response.headers);
});
