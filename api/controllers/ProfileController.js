  module.exports = {
    /*input:null
    output:send.action-contains the action for the page-renders the profile page
     */
    openProfile: function(req, res) {
      var send = {};
        send.action = '/updateProfile';
        send.error = '';
        res.view('personal_profile', send);
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
                //firstName: (params.firstName) ? params.firstName : null,
                //middleName: (params.middleName) ? params.middleName : null,
                //lastName: (params.lastName) ? params.lastName : null,
                dateOfBirth: (params.dateOfBirth) ? params.dateOfBirth : null,
                birthCity: (params.birthCity) ? params.birthCity : null,
                birthState: (params.birthState) ? params.birthState : null,
                birthCountry: (params.birthCountry) ? params.birthCountry : null,
                //dateOfDeath: (params.dateOfDeath) ? params.dateOfDeath : null,
                //placeOfDeath: (params.placeOfDeath) ? params.placeOfDeath : null,
                gender: (params.gender) ? params.gender : null,
                bio: (params.personalbio) ? params.personalbio : null,
                //notes: (params.notes) ? params.notes : null,
                id: req.session.individualId
            },
            send = {};
          send.error = '';
          // perform checks for email/username in notes field
          user.updateProfile(userData, function (response, result) {
                switch(response) {
                    case 'update failed':
                        send.error = 'Update failed';
                        send.username = username;
                        res.view('login', send);
                        break;
                    case 'fields too long?':
                        send.error = 'Your username and password must be less than 32 characters?';
                        send.username = username;
                        res.view('login', send);
                        break;
                    case 'success':
                        send = userData;
                        res.view('treeViewer', send);
                        break;
                    default:
                        res.redirect('/error?location=PROFILE_CONTROLLER/UPDATE_PROFILE&response=' + response + '&result=' + result);
                        break;
                }
          });
    },
    /*input:null
     output:page-renders the profile page
     */
    renderAccountInfo: function(req, res) {
      var send = {};
      send.error = '';
      res.view('acountinfo', send);
    },
    getUserProfile: function(req, res) {
      database.getUserInfo(req.session.individualId, function(getInfoResponse, getInfoResult) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        getInfoResult[0].image = text + ".jpg";
        res.json({user: getInfoResult});
      });
    },
    createNewIndividual: function(req,res){
      var params = req.params.all(),
          send = {
              "id":params.addPerson

          };

      res.view("addPerson", send);


      //  userData = {
      //    //firstName: (params.firstName) ? params.firstName : null,
      //    //middleName: (params.middleName) ? params.middleName : null,
      //    //lastName: (params.lastName) ? params.lastName : null,
      //    dateOfBirth: (params.dateOfBirth) ? params.dateOfBirth : null,
      //    birthCity: (params.birthCity) ? params.birthCity : null,
      //    birthState: (params.birthState) ? params.birthState : null,
      //    birthCountry: (params.birthCountry) ? params.birthCountry : null,
      //    //dateOfDeath: (params.dateOfDeath) ? params.dateOfDeath : null,
      //    //placeOfDeath: (params.placeOfDeath) ? params.placeOfDeath : null,
      //    gender: (params.gender) ? params.gender : null,
      //    bio: (params.personalbio) ? params.personalbio : null,
      //    //notes: (params.notes) ? params.notes : null,
      //    id: req.session.individualId
      //  },
      //  send = {};
      //send.error = '';
      //database.initializeProfile(function(id, response){
      //  database.initializeName(params.firstName, params.lastName, id,);
      //});
    }
  };

