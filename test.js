var curl = require('./index.js');

var options = ['url wanted'];

curl.open(options, function(code){

	if (code == 0){ // 0 is success
		
		// what you want
		console.log(this);

	}else{
		console.log(this['error'].toString());
	}

});