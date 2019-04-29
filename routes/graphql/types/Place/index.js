export default `
	type Place {
		id: String!
	        images: [String]!
		description: String!
		reviewerNames: [String!]!
		reviewerRatings: [String!]!
		reviewerText: [String!]!
		lat: String!,
		log: String!,
		name: String!,
		state: String!,
		region: String!	
	}
	type Query {
		place(id: String!): Place
		places: [Place]
	}
	type Mutation {
		addPlace(id: String!, images: [String]!, description: String!, reviewerNames: [String!]!, reviewerRatings: [String!]!, reviewerText: [String!]!, lat: String, log: String, name: String, state: String, region: String): Place
		editPlace(id: String!, images: [String]!, description: String!, reviewerNames: [String!]!, reviewerRatings: [String!]!, reviewerText: [String!]!, lat: String, log: String, name: String, state: String, region: String): Place
		deletePlace(id: String!, images: [String]!, description: String!, reviewerNames: [String!]!, reviewerRatings: [String!]!, reviewerText: [String!]!, lat: String, log: String, name: String, state: String, region: String): Place
	}
`
