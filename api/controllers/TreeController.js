  module.exports = {
    /*input:null
    outputs:page- renders the tree viewer page
     */
    viewTree: function(req, res) {
        var send = {};
        send.treeSearch = 'Search...';
        res.view('treeViewer', send);
    },
    populateTree: function(req, res) {
      database.getUserInfo(req.session.individualId, function(getInfoResponse, getInfoResult) {
        return res.json({ user: getInfoResult})
      })

    }
  };

