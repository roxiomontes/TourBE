// The User schema.
import User from "../../../models/Place";
import fs from 'fs'
import Promise from 'bluebird'
import fb from 'fb'
fb.setAccessToken("2646297552053593|31fdbfa39fa34829523e8ab9f8a4c305")
function pGETFacebookPlacesAPI(q) {
       return new Promise((resolve, reject) => {
                fb.api("/search?type=place&q=" + q, "GET", (res, err) => {
			console.log("id: " + res.data[0].id)
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

function getNearbyLocations(lat, long, distance) {
	return new Promise((resolve, reject) => {
		fb.api("/search?type=place&center=" + lat + "," + long + "&distance=" + distance, "GET", (res, err) => {
			console.log("res: " + JSON.stringify(res))
			if (res.error || (res.data && res.data.length === 0)) { resolve({}) }
			else {resolve(res)}
		})
	})
}

export default {
  Query: {
    place: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    getLocationsGPS: (root, args) => {
	return new Promise((resolve, reject) => {
		Promise.try(() => {
			return getNearbyLocations(args.lat, args.long, args.distance)
		}).then((A) => {
			return A.data
		}).map((e) => {
			return pGETFacebookPlaceInformationAPI(e.id)
		}).map((e) => {
			return {
				id: e.id,
				checkins: e.picture.data.url,
				picture: e.picture.data.url,
				lat: e.location.latitude,
				long: e.location.longitude,
				website: e.website,
				description: e.description,
				name: e.name,
				state: "state",
				region: "region"
			       }
		}).then((A) => {
			resolve({places: A})
		}).catch((err) => {
			reject(err)
		})
	})
    },
    getLocations: (root, args) => {
      return new Promise((resolve, reject) => {
	fs.readFile('./locations.json', 'utf8', (err, data) => {
		if (err) {throw err};
		let content = JSON.parse(data);
		console.log("args: " + JSON.stringify(args))	
		Promise.try(() => {
			return content;
		}).filter((e) => {
			return e.states_name_en === args.state
		}).map((e) => {
			return pGETFacebookPlacesAPI(e.name_en)
		}).map((e) => {
			return pGETFacebookPlaceInformationAPI(e)
		}).map((e) => {
			return {
				id: e.id,
				checkins: e.checkins,
				picture: e.picture.data.url,
				lat: e.location.latitude,
				long: e.location.longitude,
				website: e.website,
				description: e.description,
				name: e.name,
				state: "state",
				region: "region"
			}
		}).then((A) => {
			console.log("A: " + A)
			resolve({places: A})
		}).catch ((err) => {
			reject("error: " + err)
		})
	})	
      });
    }
  },
  Mutation: {
    addPlace: (root, { id, checkins, picture, lat, long, website, description, name, link, state, region}) => {
      const newUser = new User({ id, checkins, picture, lat, long, website, description, name, link, state, region });

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    editPlace: (root, {  id, checkins, picture, lat, long, website, description, name, link, state, region}) => {
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ id }, { $set: { id, checkins, picture, lat, long, website, description, name, link, state, region } }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deletePlace: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
