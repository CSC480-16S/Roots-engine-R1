  module.exports = {
    openProfile: function(req, res) {
      render.page({}, 'profile', function(html) {
        res.send(html);
      });
    }
  };

