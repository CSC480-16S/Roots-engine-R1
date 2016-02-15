  module.exports = {
    viewTree: function(req, res) {
        render.page({}, 'treeViewer', function(html) {
            res.send(html);
        });
    }
  };

