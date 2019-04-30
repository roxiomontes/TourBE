export default `
	type Place {
		id: String
	        checkins: String
		picture: String
		lat: String
		long: String
		website: String
		description: String,
		name: String,
		link: String,
		state: String,
		region: String	
	}
	type PlaceList {
		places: [Place],
		test: Place
	}
	type Query {
		place(id: String, lat: String, long: String): Place
		places: [Place]
		getLocationsGPS(id: String, lat: String, long: String, distance: String): PlaceList
		getLocations(id: String, lat: String, long: String, state: String): PlaceList
	}
	type Mutation {
		addPlace(id: String!, checkins: String!, picture: String!, lat: String!, long: String!, website: String!, description: String, name: String, link: String, state: String, region: String): Place
		editPlace(id: String!, checkins: String!, picture: String!, lat: String!, long: String!, website: String!, description: String, name: String, link: String, state: String, region: String): Place
		deletePlace(id: String!, checkins: String!, picture: String!, lat: String!, long: String!, website: String!, description: String, name: String, link: String, state: String, region: String): Place
	}
`
