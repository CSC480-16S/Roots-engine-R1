/**
* I'm going to put a function here that returns a length l string of chars
* A-Z or a-z. Then I will use them in the password reset and email confirm
* functions for identification.
**/
var random = require("node-random");
module.exports = {
    
    
    getRString: function(l) {
	var str = '';
	console.log(typeof l);
	if(l > 0 && l < 30) {
	    console.log(l);
	    random.strings({
		"length": 1,
		"number": l,
		"upper": true,
		"lower": true,
		"digits": false
	    }, function(error, data) {
		if(error) {
		    throw error;
		    str = 'error';
		    return str;
		} else {
		    data.forEach(function(d) {
			console.log(d);
			str += d;
		    });
		    return str;
		}
	    });
	}
    }
    
}

