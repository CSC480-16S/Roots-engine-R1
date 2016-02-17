  module.exports = {
    checkYourInboxPage: function(req, res) {
        var send = {};
        render.page(send, 'checkYourInbox', function(html) {
            res.send(html);
        });
    }
  };

