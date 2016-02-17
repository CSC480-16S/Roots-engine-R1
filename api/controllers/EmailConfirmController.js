module.exports = {
  confirmEmail: function(req, res) {
	var send = {};
	var email = req.param('email');
	database.getLoginCredentials(email, function(loginResponse, loginResult) {
			if(loginResponse === 'success') {
			    send.login = true;
				send.error = 'Email confirmed, please log in.';
				database.updateEmailVerified(email, function(insertResponse, insertResult) {
                    render.page(send, 'login', function(html) {
                        res.send(html);
                    });
				});
			}
			else {
				send.confirmation = 'You have not signed up yet or there was an error.';
				render.page(send, '/', function(html) {
					res.send(html);
				});
			}
		});  
	}
};
      
