  module.exports = {
    /*input:null
    outputs:page- renders the tree viewer page
     */
    viewTree: function(req, res) {
        render.page({}, 'treeViewer', function(html) {
            res.send(html);
        });
    }
  };

