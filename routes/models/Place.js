import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let reviewSchema = new Schema({name: String, rating: Number, review: String})

const PlaceSchema = new Schema({
    id: {
	  type: String,
	  required: false,
	  unique: true
	},
   checkins: {
	  type: String,
	  required: false,
	  unique: false
	},
   picture: {
	  type: String,
	  required: false,
	  unique: false
	},
  lat: {
	type: String,
	required: false,
	unique: false
	},
  long: {
	type: String,
	required: false,
	unique: false
	},
  website: {
	type: String,
	required: false,
	unique: false
	},
  description: {
	type: String,
	required: false,
	unique: false	
       },
  name: {
	type: String,
	required: false,
	unique: false
        },
  link: {
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
