
module.exports = {
    toTree: function(data, next) {

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
