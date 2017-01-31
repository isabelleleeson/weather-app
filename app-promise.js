const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    }).help().alias('help','h').argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address='${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.')
    }
    
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/00b5597bac6f651e352feaca46f9387e/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => { // no need to check for errors here
    var temperature = Math.round((((response.data.currently.temperature)-32)/1.8)*10)/10;
    var apparentTemperature = Math.round((((response.data.currently.apparentTemperature)-32)/1.8)*10)/10;
    console.log(`It is currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});

// ideas:  add more info, hi-lo temps
//         command that lets you set the default location 