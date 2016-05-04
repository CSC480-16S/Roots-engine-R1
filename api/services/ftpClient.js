module.exports = {

    upload: function(filename) {
	var ftp = require('ftp-client'),
	    pw = require("../../config/passwords.json"),
	    u = pw.ftpUser,
	    p = pw.ftpPass
	var config = {
	    host: 'pi.cs.oswego.edu',
	    port: '22121',
	    user: u,
	    password: p
	},
	    options = {}
	client = new ftpClient(config, options);
	client.connect(function() {
	    console.log('Uploading file:');
	    client.upload([filename], '', {
		baseDir: '',
		overwrite: 'older'
	    }, function(result) {
		console.log(result);
	    });
	});
    }
}
