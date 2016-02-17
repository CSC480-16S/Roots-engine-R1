  module.exports = {
    openProfile: function(req, res) {
      var send = {};
        send.notes = req.session.email;
        render.page(send, 'profile', function(html) {
          res.send(html);
        });
    },

    updateProfile: function(req, res) {
        var params = req.params.all(),
            userData = {
                firstName: (params.firstName) ? params.firstName : null,
                middleName: (params.middleName) ? params.middleName : null,
                lastName: (params.lastName) ? params.lastName : null,
                dateOfBirth: (params.dateOfBirth) ? params.dateOfBirth : null,
                placeOfBirth: (params.birthCountry) ? params.birthCountry : null,
                dateOfDeath: (params.dateOfDeath) ? params.dateOfDeath : null,
                placeOfDeath: (params.placeOfDeath) ? params.placeOfDeath : null,
                gender: (params.gender) ? params.gender : null,
                bio: (params.personalBio) ? params.personalBio : null,
                notes: (params.notes) ? params.notes : null
            },
            send = {};
          // perform checks for email/username in notes field
          user.updateProfile(userData, function (response, result) {
                switch(response) {
                    case 'update failed':
                        send.error = 'Update failed';
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
                        send = userData;
                        render.page(send, 'treeViewer', function(html) {
                            res.send(html);
                        });
                        break;
                    default:
                        res.redirect('/error?location=PROFILE_CONTROLLER/UPDATE_PROFILE&response=' + response + '&result=' + result);
                        break;
                }
          });
    }
  };

