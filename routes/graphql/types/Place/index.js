export default `
	type Place {
		id: String!
	        checkins: String!
		picture: String!
		lat: String!
		long: String!
		website: String!
		description: String!,
		name: String!,
		link: String!,
		state: String!,
		region: String!	
	}
	type Query {
		place(id: String, lat: String, long: String): Place
		places: [Place]
	}
	type Mutation {
		addPlace(id: String!, checkins: String!, picture: String!, lat: String!, long: String!, website: String!, description: String, name: String, link: String, state: String, region: String): Place
		editPlace(id: String!, checkins: String!, picture: String!, lat: String!, long: String!, website: String!, description: String, name: String, link: String, state: String, region: String): Place
		deletePlace(id: String!, checkins: String!, picture: String!, lat: String!, long: String!, website: String!, description: String, name: String, link: String, state: String, region: String): Place
	}
`
