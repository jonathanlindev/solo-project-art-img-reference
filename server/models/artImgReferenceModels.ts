import mongoose from 'mongoose';

const MONGO_URI =
  'mongodb+srv://jonathanlindev_db_user:7bOoh8L9kAeUxRhv@cluster0.w5z8nwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(MONGO_URI, {
    // sets the name of the DB that our collections are part of
    dbName: 'art-img-reference',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

mongoose.connect(MONGO_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

const photosSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  search: {
    type: String,
    required: true,
  },
  urls: {
    raw: {
      type: String,
      required: true,
    },
    full: {
      type: String,
      required: true,
    },
    regular: {
      type: String,
      required: true,
    },
    small: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    small_s3: {
      type: String,
    },
  },
  alt_description: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  links: {
    self: String,
    html: String,
    download: String,
    download_location: String,
  },
  user: {
    id: String,
    username: String,
    name: String,
    profile_image: {
      small: String,
      medium: String,
      large: String,
    },
  },
});

// Export your model here
// The collection name should be 'photos'
const Photos = mongoose.model('photos', photosSchema);

// exports all the models in an object to be used in the controller
export default {
  Photos,
};
