#!/usr/bin/env node

var nconf = require('nconf');
var toS3  = require('couchdb-to-s3');
var cred  = require('./lib/cred.js');

nconf.file('dev', 'config-dev.json').argv().env().file('config.json');
nconf.defaults({
	"dbUrl": "http://localhost:5984",
	"dbName": "database",
	"s3BucketName": "bucket",
	"awsCredentialsPath": ".aws/credentials"
});

var awsCred = cred(nconf.get('awsCredentialsPath'));

var db = {
	url: nconf.get('dbUrl'), 
	name: nconf.get('dbName')
};

var aws = {
	accessKeyId: awsCred.aws_access_key_id,
	secretAccessKey: awsCred.aws_secret_access_key,
	bucket: nconf.get('s3BucketName')
};

toS3(db, aws, function (err, body) {
	if (err) {
		console.log("FAILURE");
		console.log(err.message);
		console.log(err.error);
		return;
	}

	console.log("SUCCESS");
	console.log(body.response.headers);
});
