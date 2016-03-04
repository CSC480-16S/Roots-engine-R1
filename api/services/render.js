module.exports = {
    page: function(send, view, next) {
        var mustache = require('mustache');
        require('consolidate').mustache('views/error_display.html', send, function(err2, html2){
            if (err2) {
              throw err2;
            }
            else {
                    send.error_display = html2;
                require('consolidate').mustache('views/' + view + '.html', send, function(err, html){
                    if (err) {
                      throw err;
                    }
                    next(html);
                });
            }
        });
    }
};