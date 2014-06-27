var curl = require('./index.js');

var options = ['http://localhost'];

curl.open(options, function(code){

	if (code == 0){ // 0 is success
		
		// what you want
		console.log(this['header']);
		console.log(this['body'].toString());

	}else{
		console.log(this['error'].toString());
	}

});