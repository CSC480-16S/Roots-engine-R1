  module.exports = {
    confirmEmail: function(req, res) {
	  var send = {};
	  var email = req.param('email');
	  send.confirmation = 'need to check database';
      render.page(send, 'emailConfirm', function(html) {
        console.log(email);
        res.send(html);
      });
    }
  };
      
