/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  homePage: function(req, res) {
      var cons = require('consolidate'),
          send = {};
      cons.mustache('views/user/login.html', send, function(err, html){
          if (err) {
            throw err;
          }
          res.send(html);
      });
  },

  userLogin: function(req, res) {
       res.redirect('/treeViewer');
  },

  createUser: function(req, res) {
        var params = req.params.all(),
            username = params.email,
            send = {},
            cons = require('consolidate');
    User.find({user_name: username }).exec(function (err, result) {
        if (err) {
            console.log(err);
            console.log(result);
            }
            else if (!result) {
            User.create({user_name: params.email, password: params.password}).exec(function createCB(err, created) {
                      cons.mustache('views/user/login.html', send, function(err, html){
                        if (err) throw err;
                          res.send(html);
                      });
                  });
        }
        else {


                  cons.mustache('views/user/login.html', send, function(err, html){
                    if (err) throw err;
                      res.send(html);
              });

        }

    });
    }
};

