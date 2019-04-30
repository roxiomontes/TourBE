let express = require('express');
let router = express.Router();
let expressGraphQL = require('express-graphql');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors')
let { buildSchema } = require('graphql');
const db = "mongodb://admin:admin1@ds143608.mlab.com:43608/f8hack"
let schema = require("./graphql/").default;
let fb = require('fb');
import Place from './models/Place';
const fetch = require('node-fetch');
fb.setAccessToken("2646297552053593|31fdbfa39fa34829523e8ab9f8a4c305");
//fb.setAccessToken("1584170635209020|0367603d1b37b3d18d3a0abffbbe68aa")
const fs = require('fs');
let Promise = require('bluebird');

// connect to mongoose
mongoose.connect(db, {useCreateIndex: true, useNewUrlParser: true}).then(() => { console.log("mongoDB connected")  }).catch(err => { console.log("error") })

var root = { hello: () => 'Hello world!' };

router.get('/', (req, res, next) => {
	res.send(200);
})

console.log(schema)

router.post('/store', (req, res, next) => {
	fs.writeFile('locations.json', JSON.stringify(req.body), 'utf8', (err) => {
		if (err) { console.log(err); }
		else {
			console.log('saved');
		}
	})
	res.send(200);
})

router.use('/graphql', cors(), bodyParser.json(), expressGraphQL({
	schema,
	graphiql: true
}));

function pGETFacebookPlacesAPI(q) {
       return new Promise((resolve, reject) => {
		fb.api("/search?type=place&q=" + q, "GET", (res, err) => {
			console.log(res)
       		 	if (res.error || (res.data && res.data.length === 0)) {resolve(0)}
			else {resolve(res.data[0].id)}
        	})
       })
}

function pGETFacebookPlaceInformationAPI(pid) {
	return new Promise ((resolve, reject) => {
		fb.api("/" + pid + "?fields=about,checkins,picture,location,photos,website,description,id,name,link", "GET", (res, err) => {
			console.log("pid: " + pid)
                	if (res.error || (res.data && res.data.length === 0)) { resolve({}) }
			resolve(res)
        	})	
	})
}

parseScript();

function parseScript() {
	fs.readFile('./locations.json','utf8', (err, data) => {
		if (err) { throw err }
		let content = JSON.parse(data).splice(41,90)
		Promise.try(() => {
			return content
		}).map((e) => {
			return pGETFacebookPlacesAPI(e.name_en)
		}).map((e) => {
			return pGETFacebookPlaceInformationAPI(e)
		}).each((e) => {
			console.log("ID: " + e.id)
			let id = e.id
			let checkins = e.checkins
			let picture = "https://www.google.com/images/placeholder"
			if (e && e.picture) {
				picture = e.picture.url
			}
			let lat = "0.0"
			let long = "0.0"
			if (e && e.location) {
				lat = e.location.latitude
				long = e.location.longitude
			}
			let website = e.website
			let description = "placeholder"
			if (e && e.description) {
				description = e.description.substring(0,900)
			}
			let name = e.name
			let link = e.link
			let state = "state"
			let region = "region"
			let place = new Place({id, checkins, picture, lat, long, website, description, name, link, state, region});
			place.save();
		}).catch((err) => {
			console.log("error: " + err)
		})
	})
}


module.exports = router;
