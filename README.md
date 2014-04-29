# CURL -- Simple client url library, with low level request functions

## Install

$ npm install ex-curl

# you must check

$ curl --help

# Setting

$ curl -i --request POST --data test=1 url_wanted

equal

var options = ['-i', '--request', 'POST', '--data', 'test=1', 'url wanted'];

## Example

var curl = require('ex-curl');

# GET

	var param = {};

	param['test1'] = '~!@#$%^&*()-+';

	param['test2'] = 2;

	var str_param = curl.stringify(param);

	var url = 'url wanted'; // put your wanted url

	var options = [url + '?' + str_param];

	curl.open(options, function(){

		if (this['code'] == 0){ // 0 is success

			console.log(this['header']); // object

			console.log(this['body']); // buffer

			console.log(this['body'].toString()); // string

		}else{ 

			console.log(this['error'].toString());

		}

	});

# POST

var param = {};

param['test1'] = '~!@#$%^&*()-+';

param['test2'] = 2;

var str_param = curl.stringify(param);

var url = 'url wanted'; // put your wanted url

var options = ['--data', str_param, url];

curl.open(options, function(){

});

# FILE INCLUDE

var param = {};

param['test1'] = '~!@#$%^&*()-+';

param['test2'] = 2;

param['file1'] = '@localfilename1';

param['file2'] = '@localfilename2';

var str_param = curl.stringify(param);

var url = 'url wanted'; // put your wanted url

var options = ['--form', str_param, url];

curl.open(options, function(){

});

# you must check

$ curl --help