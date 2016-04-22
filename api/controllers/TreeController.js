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

    },
    createIndividual: function(req, res) {
      var send = {};
      send.error = '';
      database.initializeProfile(function (responseId, resultId){
        if (responseId === 'success') {

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
              id: resultId[0].id
            };
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
        } else {
          send.error = 'Unable to get individual id.';
        }
      })
    },
    updateIndividual: function(req, res) {

    },
    getRelations: function(req,res){
      var send = {};
      send.error = '';
      id = 22;
      database.getUserInfo(req.session.individualId, function(getInfoResponse, getInfoResult) {
        database.getSiblings(id, function(getSiblingsResponse, getSiblingsResult) {
          database.getParents(id,function(getParentsResponse, getParentsResult){
            database.getChildren(id,function(getChildrenResponse, getChildrenResult){
              database.getSpouses(id,function(getSpousesResponse, getSpousesResult){
                //var parents = JSON.parse(getParentsResult);
                //var children = JSON.parse(getChildrenResult);
                //var siblings = JSON.parse(getSiblingsResult);
                //var spouses = JSON.parse(getSpousesResult);
                //var user = JSON.parse(getInfoResult);

                getInfoResult.push({parents: getParentsResult});
                getInfoResult.push({children: getChildrenResult});
                getInfoResult.push({spouses: getSpousesResult});
                getInfoResult.push({siblings: getSiblingsResult});
                return res.json({user: getInfoResult});
              });
            });
          });
        });
      });
    },
    getAllParents: function(req, res){
        database.getUserInfo(req.session.individualId, function(getInfoResponse, getInfoResult) {
            var array = [];
            user.getAllParents(5, array, function(response, result){
//                return res.json({user:result});
                  transform['getData'](result, function(response, data){
                      return res.json({'data': data});
                  });
            });
        });
    },
    viewMap: function(req,res){
      var send = {};
      res.view('map', send);
    },
    getMapData: function(req,res){
      res.json([{
          "location": "United States",
          "relatives": 5
        },
        {
          "location": "Canada",
          "relatives": 4
        },
        {
          "location": "India",
          "relatives": 3
        },
        {
          "location": "Russia",
          "relatives": 10
        },
        {
          "location": "Egypt",
          "relatives": 30
        },
        {
          "location": "Mexico",
          "relatives": 25
        },
        {
          "location": "South Korea",
          "relatives": 15
        }]);
    },
    viewParliament: function(req, res){
      var send = {};
      res.view('parliament',send);
    }

  };

