# CURL -- Simple client url library, with low level request functions

# Install

	$ npm install ex-curl

# you must check

	$ curl --help

# Setting

	$ curl --request POST --data test=1 url_wanted

	equal

	var options = ['--request', 'POST', '--data', 'test=1', 'url wanted'];

# Simple Example

	var curl = require('ex-curl');

	var options = ['url wanted'];

	curl.open(options, function(code){

		if (code == 0){ // 0 is success
			
			// what you want
			console.log(this);

		}else{
			console.log(this['error'].toString());
		}
	
	});

# GET 

	var curl = require('ex-curl');

	var param = {};

	param['test1'] = '~!@#$%^&*()-+';

	param['test2'] = 2;

	var str_param = curl.stringify(param);

	var url = 'url wanted'; // put your wanted url

	var options = [url + '?' + str_param];

	curl.open(options, function(code){
		
		if (code == 0){ // 0 is success
			
			// what you want
			console.log(this);

		}else{
			console.log(this['error'].toString());
		}
		
	});

# POST

	var curl = require('ex-curl');

	var param = {};

	param['test1'] = '~!@#$%^&*()-+';

	param['test2'] = 2;

	var str_param = curl.stringify(param);

	var url = 'url wanted'; // put your wanted url

	var options = ['--data', str_param, url];

	curl.open(options, function(code){
		
		if (code == 0){ // 0 is success
			
			// what you want
			console.log(this);

		}else{
			console.log(this['error'].toString());
		}
		
	});

# FILE INCLUDE

	var curl = require('ex-curl');

	var param = {};

	param['test1'] = '~!@#$%^&*()-+';

	param['test2'] = 2;

	param['file1'] = '@localfilename1';

	param['file2'] = '@localfilename2';

	var str_param = curl.stringify(param);

	var url = 'url wanted'; // put your wanted url

	var options = ['--form', str_param, url];

	curl.open(options, function(code){
		
		if (code == 0){ // 0 is success
			
			// what you want
			console.log(this);

		}else{
			console.log(this['error'].toString());
		}
		
	});

# Callback Function Property

	this // object

	this['code'] // number

	this['header'] // object

	this['body'] // buffer

	this['error'] // buffer