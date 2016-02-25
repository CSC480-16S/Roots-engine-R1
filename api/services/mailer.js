
module.exports = {
    send: function(address, sub, txt, htm, errorfunction) {
	var transporter = nodemailer.createTransport('smtps://rootsspammer%40gmail.com:roots480@smtp.gmail.com');
	var mailOptions = {
	    from: 'Roots Team <rootsspammer@gmail.com',
	    to: address,
	    subject: sub,
	    text: txt,
	    html: htm
	};
	transporter.sendMail(mailOptions, errorfunction);

    }
}
