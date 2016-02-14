  module.exports = {
    errorPage: function(req, res) {
        render.page({}, 'error', function(html) {
            res.send(html);
        });
    }
  };

