  module.exports = {
    /*input:null
    outputs:page- renders the tree viewer page
     */
    viewTree: function(req, res) {
        var send = {};
        send.treeSearch = 'Search...';
        res.view('treeViewer', send);
    }
  };

