module.exports = {
  sendReset: function(req, res) {
	var send = {};
	//var email = req.param('email');
	render.page(send, 'sendReset', function(html) {
		res.send(html);
	});
	/*database.getLoginCredentials(email, function(loginResponse, loginResult) {
			if(loginResponse === 'success') {
				send.confirmation = 'A reset email has been sent.';
				database.updateEmailVerified(email, function(insertResponse, insertResult) {

				});
				render.page(send, 'sendReset', function(html) {
					res.send(html);
				});
			} else {
				send.confirmation = 'You have not signed up yet or there was an error.';
				render.page(send, 'sendReset', function(html) {
					res.send(html);
				});
			}
		});  
	}*/
	}
};
      
