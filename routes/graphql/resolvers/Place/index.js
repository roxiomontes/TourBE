// The User schema.
import User from "../../../models/Place";

export default {
  Query: {
    place: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    places: () => {
      return new Promise((resolve, reject) => {
        User.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
  },
  Mutation: {
    addPlace: (root, { id, images, description, reviewerNames, reviewerRatings, reviewerText, lat, log, name, state, region }) => {
      const newUser = new User({ id, images, description, reviewerNames,reviewerRatings, reviewerText, lat, log, name, state, region });

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    editPlace: (root, { id, images, description, reviewerNames, reviewerRatings, reviewerText, lat, log, name, state, region }) => {
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ id }, { $set: { id, images, description, reviewerNames, reviewerRatings, reviewerText, lat, log, name, state, region } }).exec(
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
