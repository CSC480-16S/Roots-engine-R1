module.exports = {
    page: function(send, view, next) {
        require('consolidate').mustache('views/' + view + '.html', send, function(err, html){
            if (err) {
              throw err;
            }
            next(html);
        });
    }
};