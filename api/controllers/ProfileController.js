  module.exports = {
    /*input:null
    output:notes-contains the email of the user for the current session, page-renders the profile page
     */
    openProfile: function(req, res) {
      var send = {};
        send.notes = req.session.email;
        render.page(send, 'profile', function(html) {
          res.send(html);
        });
    },

    /*input:firstName-string to enter into the user's first name field,
    middleName-string to enter into the user's middle name field,
    lastName-string to enter into the user's last name field,
    dateOfBirth-date to enter into the  user's date of birth field,
    placeOfBirth-string to enter into the user's place of birth field,
    dateOfDeath-date to enter into the user's data of death field,
    placeOfDeath-string to enter into the user's place of death field,
    gender-string to enter into the user's gender field,
    bio-string to enter into the user's bio field,
    notes-string to enter into the user's notes field
    output: error-message explaining any issue in fields entered, username-username of user caning their profile,
    page-renders the tree viewer page
     */
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
                notes: (params.notes) ? params.notes : null,
                id: req.session.individualId
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

