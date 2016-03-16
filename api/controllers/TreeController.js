  module.exports = {
    /*input:null
    outputs:page- renders the tree viewer page
     */
    viewTree: function(req, res) {
        var send = {};
        send.treeSearch = 'Search...';
        send.error = '';
        res.view('treeViewer', send);
    },
    populateTree: function(req, res) {
      var send = {};
      send.error = ''
      database.getUserInfo(req.session.individualId, function(getInfoResponse, getInfoResult) {
        return res.json({ user: getInfoResult})
      })

    }
  };

