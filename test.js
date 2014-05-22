var curl = require('./index.js');

var url = '';

var options = [url];

curl.open(options, function(){

	if (this['code'] == 0){
		console.log(this['header']);
		console.log(this['body'].toString());
	}else{
		console.log(this['error']);
	}

});