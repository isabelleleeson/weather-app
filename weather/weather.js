const request = require('request');

var getWeather = (lat,long,callback) => {
    
    request({
        url: `https://api.darksky.net/forecast/00b5597bac6f651e352feaca46f9387e/${lat},${long}`,
        json: true,
        }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature : Math.round((((body.currently.temperature)-32)/1.8)*10)/10,
                apparentTemperature: Math.round((((body.currently.apparentTemperature)-32)/1.8)*10)/10,
            })
        } else {
            callback('Unable to fetch weather.');
        }

        //console.log('It is ' + Math.round((((body.currently.temperature)-32)/1.8)*10)/10 + 'ºC');
    })
    
}

module.exports.getWeather = getWeather;

