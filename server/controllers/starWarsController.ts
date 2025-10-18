import type { RequestHandler } from 'express';
import models from '../models/starWarsModels.ts';

interface StarWarsController {
  getCharacters: RequestHandler;
  getSpecies: RequestHandler;
  getHomeworld: RequestHandler;
  getFilm: RequestHandler;
  addCharacter: RequestHandler;
}

const starWarsController = {} as StarWarsController;

starWarsController.getCharacters = (req, res, next) => {
  models.Person.find()
    .then((characters) => {
      console.log(characters[0].schema);
      res.locals.character = characters;
      return next();
    })
    .catch((err) =>
      next({
        log: `starWarsController.getCharacters: ERROR: ${err}`,
        message: {
          err: 'Error occurred in starWarsController.getCharacters. Check server logs for more details.',
        },
      })
    );
};
/*
  // use the model to query the database for all characters
  // models.Person.find()
  //   .then((characters) => {
  //     console.log('characters in controller:');
  //     console.log(characters);
  //     res.locals.character = characters;
  //     return next();
  //   })
  //   .catch((err) =>
  //     next({
  //       log: `starWarsController.getCharacters: ERROR: ${err}`,
  //       message: {
  //         err: 'Error occurred in starWarsController.getCharacters. Check server logs for more details.',
  //       },
  //     })
  //   );

  /*
    // mock data to test route
    const characters = [
      JSON.parse(
        '{"_id":"5d964d2a4712b40af6b6b64f","name":"Luke Skywalker","mass":"77","hair_color":"blond"," 
        skin_color":"fair","eye_color":"blue","birth_year":"19BBY","
   */

starWarsController.getSpecies = (req, res, next) => {
  // write code here

  next();
};

starWarsController.getHomeworld = (req, res, next) => {
  // write code here

  next();
};

starWarsController.getFilm = (req, res, next) => {
  // write code here

  next();
};

starWarsController.addCharacter = (req, res, next) => {
  // write code here

  next();
};

export default starWarsController;
