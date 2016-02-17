module.exports = {
  confirmEmail: function(req, res) {
	var send = {};
	var email = req.param('email');
	database.getLoginCredentials(email, function(loginResponse, loginResult) {
			if(loginResponse === 'success') {
				send.confirmation = 'Email confirmed, please log in.';
				database.updateEmailVerified(email, function(insertResponse, insertResult) {

				});
				render.page(send, 'emailConfirm', function(html) {
					res.send(html);
				});
			} else {
				send.confirmation = 'You have not signed up yet or there was an error.';
				render.page(send, 'emailConfirm', function(html) {
					res.send(html);
				});
			}
		});  
	}
};
      
