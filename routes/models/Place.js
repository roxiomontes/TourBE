import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let reviewSchema = new Schema({name: String, rating: Number, review: String})

const PlaceSchema = new Schema({
    id: {
	  type: String,
	  required: false,
	  unique: true
	},
   images: {
	  type: [String],
	  required: false,
	  unique: false
	},
   description: {
	  type: String,
	  required: false,
	  unique: false
	},
  reviewerNames: {
	type: [String],
	required: false,
	unique: false
	},
  reviewerRatings: {
	type: [String],
	required: false,
	unique: false
	},
  reviewerText: {
	type: [String],
	required: false,
	unique: false
	},
  lat: {
	type: String,
	required: false,
	unique: false	
       },
  log: {
	type: String,
	required: false,
	unique: false
        },
  name: {
	type: String,
	required: false,
	unique: false	
	},
  state: {
	type: String,
	required: false,
	unique: false
	},
  region: {
	type: String,
	required: false,
	unique: false
	}
})

const Place = mongoose.model("Place", PlaceSchema);

export default Place;
