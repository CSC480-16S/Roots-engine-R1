
      module.exports = {
        viewTree: function(req, res) {
            var cons = require('consolidate');
                  var send = {};


                      cons.mustache('views/treeViewer.html', send, function(err, html){
                        if (err) throw err;
                          res.send(html);
                  });
                  }
      };

