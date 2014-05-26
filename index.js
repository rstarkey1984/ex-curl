/*
 * Copyright 2014, Starkey Richard
 *
 * Date: 2014-04-28

 # you must check

 $ curl --help

 */ 

var spawn = require('child_process').spawn;
var VERSION = '1.0.0';

String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};

CURL = {};

CURL.VERSION = VERSION;

CURL.stringify = function(obj_param){
	var str_param = '';
	if (typeof(obj_param) == 'object'){
		for (var index in obj_param) str_param += '&'+encodeURIComponent(index)+'='+encodeURIComponent(obj_param[index]);
		str_param = str_param.substr(1, str_param.length);
	}
	return str_param;
}

CURL.open = function(/* callback, options */){

	var args = [].slice.call(arguments);

	if (typeof(args[0]) == 'function'){
		callback = args[0];
		options = args[1];
	}else{
		options = args[0];
		callback = args[1];
	}

	var has_header = false;
	if (options.indexOf('-i') < 0 && options.indexOf('-I') < 0) options.splice(0, 0, '-i');

	if (options.indexOf('-A') < 0){ // no user-agent
		options.push('-A');
		options.push('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0 string('+new Date().getTime()+')');
	}

	var formIndex = options.indexOf('--form') >= 0 ? options.indexOf('--form') : options.indexOf('--form-string') >= 0 ? options.indexOf('--form-string') : options.indexOf('-F');

	if (formIndex >= 0){
		var str_param = options[formIndex+1];
		options.splice(formIndex, 2);
		
		var param = str_param.split('&');
		for (var index in param){
			options.splice(formIndex, 0, '--form', decodeURIComponent(param[index]));
		}
	}
	
	// execute curl using child_process' spawn function
	var curl = spawn('curl', options);
	
	this.options = options;
	
	var chunks = [];
	curl.stdout.on('data', function(chunk){
		// add a 'data' event listener for the spawn instance
		chunks.push(chunk);
	});
	
	var errors = [];
	curl.stderr.on('data', function(err){
		errors.push(err);
	});

	curl.stdout.on('end', function() {
		// add an 'end' event listener to close the writeable stream
	});
	
	curl.on('exit', function(code) {

		var data = {};
		data['code'] = code;
		data['error'] = new Buffer(0);
		data['header'] = {};
		data['body'] = new Buffer(0);

		// when the spawn child process exits, check if there were any errors and close the writeable stream
		if (code == 0){

			var buffer = Buffer.concat(chunks);

			var json = JSON.stringify(buffer);

			var pattern = /^\[(.+?),13,10,13,10(?:,)?([^\]]+)?\]/gmi;
			var match = pattern.exec(json);

			if (match !== null){
				
				var json_header = '';
				var json_body = '';
				if (match[1] != undefined) json_header = '[' + match[1] + ']';
				if (match[2] != undefined) json_body = '[' + match[2] + ']';


				if (json_header != ''){
					var header_arr = new Buffer(JSON.parse(json_header)).toString().split('\r\n');
					var headers = new Array();
					var pattern = /(.+?):(.+)/;
					for (var index in header_arr){
						if (index == 0){
							headers['status'] = header_arr[index];
						}else{
							var match = pattern.exec(header_arr[index]);
						
							if (match !== null && match[1] != undefined && match[2] != undefined){
								var key = match[1].toLowerCase().trim();
								var val = match[2].trim();

								if (headers[key] == undefined){
									headers[key] = val;
								}else{
									if (typeof(headers[key]) == 'string'){
										var str = headers[key];
										headers[key] = new Array();
										headers[key].push(str);
									}

									headers[key].push(val);
								}
								
							}
						}
					}

					data['header'] = headers;
				}

				if (json_body != '') data['body'] = new Buffer(JSON.parse(json_body));
				
			}

		}else{
			var buf_error = Buffer.concat(errors);
			data['error'] = buf_error;
		}

		if (callback != undefined){
			callback.apply(data, [code]);
		}

	});

	curl.on('close', function(code){ });
}



module.exports = CURL;