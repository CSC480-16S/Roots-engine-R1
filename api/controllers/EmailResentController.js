module.exports = {
	resendEmail: function(req, res) {
		var send = {};
		var email = req.param('email');
		send.address = email;
		//resend the email
		var nodemailer = require('nodemailer');
			var transporter = nodemailer.createTransport('smtps://rootsspammer%40gmail.com:roots480@smtp.gmail.com');
				var mailOptions = {
    				from: 'Roots Team <rootsspammer@gmail.com>', // sender address 
    				to: email, // list of receivers 
    				subject: 'Email Verification Link', // Subject line 
    				text: 'Link: ', // plaintext body 
    				html: 'localhost:1337/emailConfirm?email=' + email // html body 
				};

				transporter.sendMail(mailOptions, function(error, info){
    				if(error){
        				console.log(error);
    				} else {
    					console.log('Message sent: ' + info.response);
					}							
				});

		render.page(send, 'emailResent', function(html) {
			res.send(html);
		});		
	}
}
