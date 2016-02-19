module.exports = {
  sendReset: function(req, res) {
	var send = {};
	//var email = req.param('email');
	render.page(send, 'sendReset', function(html) {
		res.send(html);
		});
	}
};
      
