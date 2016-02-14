/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    homepage: function(req, res) {
        render.page({}, 'login', function(html) {
            res.send(html);
        });
    },

    userLogin: function(req, res) {
        var params = req.params.all(),
            username = params.email,
            password = params.password,
            send = {};

          user.login(username, password, function (response, result) {
                switch(response) {
                    case 'incorrect username':
                        send.error = 'This username does not exist';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'incorrect password':
                        send.error = 'Wrong password';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'fields too long?':
                        send.error = 'Your username and password must be less than 32 characters?';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'success':
                        res.redirect('/treeViewer');
                        break;
                    default:
                        console.log('LOGIN CONTROLLER/USER LOGIN/USER LOGIN\n\nresponse: ' + response + '\n\nresult: ' + result);
                        res.redirect('/error');
                        break;
                }
          });
    },

    createUser: function(req, res) {
          var params = req.params.all(),
              username = params.email,
              password = params.password,
              send = {};

          user.signup(username, password, function (response, result) {
                switch(response) {
                    case 'user exists':
                        send.error = 'This username is already in use.';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'fields too long?':
                        send.error = 'Your username and password must be less than 32 characters?';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'insert failed':
                        send.error = 'Unable to create this user.';
                        send.username = username;
                        render.page(send, 'login', function(html) {
                            res.send(html);
                        });
                        break;
                    case 'success':
                        res.redirect('/treeViewer');
                        break;
                    default:
                        console.log('LOGIN CONTROLLER/CREATE USER/USER SIGNUP\n\nresponse: ' + response + '\n\nresult: ' + result);
                        res.redirect('/error');
                        break;
                }
          });
      }
  };

