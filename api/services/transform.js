
module.exports = {

    toTree: function(data, next) {
//    console.log(data);
        var easyData = {};
        for(i in data){
            for(key in data[i]){
                easyData[key] = data[i][key];
            }
        }
//        var oldestId = Object.keys(easyData)[0];
        var oldestId = 670;
        var tree = {};
        tree['name'] = "oldest";
        tree["marriages"] = [{
                "spouse": {"name": "Unknown"},
                "children": []
        }]
        transform.getChild(oldestId, easyData, function(response, result){
            if(result){
                tree["marriages"][0]["children"] = result;
                console.log(tree);
                next("success", tree);
            }
            else{
                next("kinda success", data);
            }
        });
    },

    getChild: function (currentId, data, next){
        if(data[currentId] && data[currentId].length > 0){
                var person = [];
                var array = data[currentId];
                var kid = array.shift();
//                console.log(array);
//                console.log(kid);
                person.push({"name": kid['first_name'] + kid['last_name'], "marriages": [{"spouse": {"name": "Unknown"}, "children": []}]});
                transform.getChild(kid["individual_id"], data, function(response, result){
                    person[person.length-1]["marriages"][0]["children"] = result;
                    if (array.length>0){
                        kid = array.shift();
                        person.push({"name": kid['first_name'] + kid['last_name'], "marriages": [{"spouse": {"name": "Unknown"}, "children": []}]});
                        transform.getChild(kid["individual_id"], data, function(response, result){
                            person[person.length-1]["marriages"][0]["children"] = result;
                                if (array.length>0){
                                    kid = array.shift();
                                    person.push({"name": kid['first_name'] + kid['last_name'], "marriages": [{"spouse": {"name": "Unknown"}, "children": []}]});
                                    transform.getChild(kid["individual_id"], data, function(response, result){
                                        person[person.length-1]["marriages"][0]["children"] = result;
                                            if (array.length>0){
                                                kid = array.shift();
                                                person.push({"name": kid['first_name'] + kid['last_name'], "marriages": [{"spouse": {"name": "Unknown"}, "children": []}]});
                                                transform.getChild(kid["individual_id"], data, function(response, result){
                                                    person[person.length-1]["marriages"][0]["children"] = result;
                                                        if (array.length>0){
                                                            kid = array.shift();
                                                            person.push({"name": kid['first_name'] + kid['last_name'], "marriages": [{"spouse": {"name": "Unknown"}, "children": []}]});
                                                            transform.getChild(kid["individual_id"], data, function(response, result){
                                                                person[person.length-1]["marriages"][0]["children"] = result;
                                                                    if (array.length>0){
                                                                        kid = array.shift();
                                                                        person.push({"name": kid['first_name'] + kid['last_name'], "marriages": [{"spouse": {"name": "Unknown"}, "children": []}]});
                                                                        transform.getChild(kid["individual_id"], data, function(response, result){
                                                                            person[person.length-1]["marriages"][0]["children"] = result;
                                                                                if (array.length>0){
                                                                                    kid = array.shift();
                                                                                    person.push({"name": kid['first_name'] + kid['last_name'], "marriages": [{"spouse": {"name": "Unknown"}, "children": []}]});
                                                                                    transform.getChild(kid["individual_id"], data, function(response, result){
                                                                                        person[person.length-1]["marriages"][0]["children"] = result;
                                                                                        if (array.length>0){
                                                                                            kid = array.shift();
                                                                                            person.push({"name": kid['first_name'] + kid['last_name'], "marriages": [{"spouse": {"name": "Unknown"}, "children": []}]});
                                                                                            transform.getChild(kid["individual_id"], data, function(response, result){
                                                                                                person[person.length-1]["marriages"][0]["children"] = result;
                                                                                                if (array.length>0){
                                                                                                    kid = array.shift();
                                                                                                    person.push({"name": kid['first_name'] + kid['last_name'], "marriages": [{"spouse": {"name": "Unknown"}, "children": []}]});
                                                                                                    transform.getChild(kid["individual_id"], data, function(response, result){
                                                                                                        person[person.length-1]["marriages"][0]["children"] = result;
                                                                                                        if (array.length>0){
                                                                                                            kid = array.shift();
                                                                                                            person.push({"name": kid['first_name'] + kid['last_name'], "marriages": [{"spouse": {"name": "Unknown"}, "children": []}]});
                                                                                                            transform.getChild(kid["individual_id"], data, function(response, result){
                                                                                                                person[person.length-1]["marriages"][0]["children"] = result;
                                                                                                                next("success", person);
                                                                                                            });
                                                                                                        }
                                                                                                        else {
                                                                                                            next("success", person);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                                else {
                                                                                                    next("success", person);
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        else {
                                                                                            next("success", person);
                                                                                        }
                                                                                    });
                                                                                }
                                                                                else {
                                                                                    next("success", person);
                                                                                }
                                                                        });
                                                                    }
                                                                    else {
                                                                        next("success", person);
                                                                    }
                                                            });
                                                        }
                                                        else {
                                                            next("success", person);
                                                        }
                                                });
                                            }
                                            else {
                                                next("success", person);
                                            }
                                    });
                                }
                                else {
                                    next("success", person);
                                }
                        });
                    }
                    else {
                        next("success", person);
                    }
                });
        }
        else {
            next("no children", [{"name": "none"}]);
        }
    },

    toParliamentChart: function(data, next){
        var person = {},
            family = [],
            startId = 5,
            oneId,
            twoId,
            chart = {
                 "type": 'multilevelpie',
                 "renderAt": 'chart-container',
                 "id": "myChart",
                 "width": '600',
                 "height": '600',
                 "dataFormat": 'json',
                 "dataSource":{
                    "chart": {
                        "caption": "Ancestors Sunburst",
                        //                                "subcaption": "A my roots feature",
                        "showPlotBorder": "1",
                        "piefillalpha": "60",
                        "pieborderthickness": "2",
                        "hoverfillcolor": "#CCCCCC",
                        "piebordercolor": "#000000",
                        "plottooltext": "$label",
                        //Theme
                        "theme": "fint"
                    },
                    "category": []
                 }
            };
        person['label'] = "Abbie";
        person['color'] = '000000';

        var easyData = {};
        for(i in data){
            for(key in data[i]){
                easyData[key] = data[i][key];
            }
        }
//            console.log(easyData['5'][0]['first_name']);


        transform.getParents(startId, easyData, 0, function(response, result){
            person['category'] = result;
            family.push(person);
            chart["dataSource"]["category"] = family;
            next('success', chart);
        });
    },

    getParents: function(currentId, data, counter, next){
        if(!data[currentId] || data[currentId].length === 0) {
            next("no parents", [{"label": "Unknown"},{"label": "Unknown"}]);
        }
        else {
            if(counter>3){
                next("forced stop", [{"label": "LIMIT"},{"label": "LIMIT"}]);
            }
            else if(data[currentId].length === 1){
                var person = {};
                person['label'] = data[currentId][0]['first_name'] + data[currentId][0]['last_name'];
                transform.getParents(data[currentId][0]['individual_id'], data, counter+1, function(response, result){
                    person['category'] = result;
                    next('success', [person, {"label": "Unknown"}]);
                });
            }
            else if (data[currentId].length === 2){
                var person1 = {},
                    person2 = {};
                person1['label'] = data[currentId][0]['first_name'] + data[currentId][0]['last_name'];
                person2['label'] = data[currentId][1]['first_name'] + data[currentId][0]['last_name'];
                transform.getParents(data[currentId][0]['individual_id'], data, counter+1, function(response, result){
                    person1['category'] = result;
                    transform.getParents(data[currentId][1]['individual_id'], data, counter+1, function(response2, result2){
                        person2['category'] = result2;
                        next('success', [person1, person2]);
                    });
                });
            }
            else {
                next("no parents", [{"label": "Unknown"},{"label": "Unknown"}]);
            }
        }
    },
  getFarParents: function(currentId, data, counter, next){
    if(!data[currentId] || data[currentId].length === 0) {
      next("no parents", [{"label": "Unknown"},{"label": "Unknown"}]);
    } else {
      if(data[currentId].length === 1){
        var person = {};
        person['label'] = data[currentId][0]['first_name'] + data[currentId][0]['last_name'];
        transform.getParents(data[currentId][0]['individual_id'], data, counter+1, function(response, result){
          person['category'] = result;
          next('success', [person, {"label": "Unknown"}]);
        });
      }
      else if (data[currentId].length === 2){
        var person1 = {},
          person2 = {};
        person1['label'] = data[currentId][0]['first_name'] + data[currentId][0]['last_name'];
        person2['label'] = data[currentId][1]['first_name'] + data[currentId][0]['last_name'];
        transform.getParents(data[currentId][0]['individual_id'], data, counter+1, function(response, result){
          person1['category'] = result;
          transform.getParents(data[currentId][1]['individual_id'], data, counter+1, function(response2, result2){
            person2['category'] = result2;
            next('success', [person1, person2]);
          });
        });
      }
      else {
        next("no parents", [{"label": "Unknown"},{"label": "Unknown"}]);
      }
    }


  },

    getData: function(data, next) {
        var newData = {},
            hm = {},
            heatMap = [],
            country;

        for(key in data){
            for(parents in data[key]){
                for(person in data[key][parents]) {
                    country = data[key][parents][person]['country_of_birth'];
                    if(country){
                        if (hm[country]) {
                            hm[country]++;
                        }
                        else {
                            hm[country]=1;
                        }
                    }
                }
            }
        }
        for(country in hm){
            heatMap.push({
                'location': country,
                'relatives': hm[country]
            });
        }
        newData['heatMap'] = heatMap;
        next('success', heatMap);
    }
};
