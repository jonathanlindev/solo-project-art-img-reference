import mongoose from 'mongoose';

const MONGO_URI =
  'mongodb+srv://jonathanlindev_db_user:7bOoh8L9kAeUxRhv@cluster0.w5z8nwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(MONGO_URI, {
    // sets the name of the DB that our collections are part of
    dbName: 'starwars',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

// sets a schema for the 'species' collection
const speciesSchema = new Schema({
  name: String,
  classification: String,
  average_height: String,
  average_lifespan: String,
  hair_colors: String,
  skin_colors: String,
  eye_colors: String,
  language: String,
  homeworld: String,
  homeworld_id: {
    // type of ObjectId makes this behave like a foreign key referencing the 'planet' collection
    type: Schema.Types.ObjectId,
    ref: 'planet',
  },
});

// TODO: create a schema for 'planet' and use it to create the model for it below
const planetSchema = new Schema({
  name: String,
  rotation_period: Number,
  orbital_period: Number,
  diameter: Number,
  climate: String,
  gravity: String,
  terrain: String,
  surface_water: String,
  population: Number,
});
// TODO: create a schema for 'film' and use it to create the model for it below

const filmSchema = new Schema({
  title: String,
  episode_id: Number,
  opening_Crawl: String,
  director: String,
  producer: String,
  release_date: Date,
});
// TODO: create a schema for 'person' and use it to create the model for it below

const personSchema = new Schema({
  name: { type: String, required: true },
  mass: String,
  hair_color: String,
  skin_color: String,
  eye_color: String,
  birth_year: String,
  gender: String,
  species: String,
  species_id: {
    type: Schema.Types.ObjectId,
    ref: 'species',
  },
  homeworld: String,
  homeworld_id: {
    type: Schema.Types.ObjectId,
    ref: 'planet',
  },
  height: Number,
  films: [
    {
      film: {
        type: Schema.Types.ObjectId,
        ref: 'film',
      },
      title: String,
    },
  ],
});

// creats a model for the 'species' collection that will be part of the export
const Species = mongoose.model('species', speciesSchema);

const Planet = mongoose.model('planet', planetSchema);

const Film = mongoose.model('film', filmSchema);

const Person = mongoose.model('person', personSchema);
// exports all the models in an object to be used in the controller
export default {
  Species,
  Planet,
  Film,
  Person,
};
