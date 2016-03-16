  module.exports = {
      /*currently not used but may come in use in future*/
      aboutpage: function(req, res) {
          var send = {};
          send.error = '';
          send.action = '/login';
          res.view('about', send);
      }
  };


