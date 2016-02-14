  module.exports = {
    errorPage: function(req, res) {
        var send = {},
            data = req.query;
        send.location = data.location;
        send.response = data.response;
        send.result = data.result;
        render.page(send, 'error', function(html) {
            res.send(html);
        });
    }
  };

