import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'; // This loads .env file variables into process.env

dotenv.config();

const UNSPLASH_ACCESS_KEY =
  process.env.VITE_UNSPLASH_ACCESS_KEY || 'YOUR_UNSPLASH_ACCESS_KEY_HERE';

const BASE_URL = process.env.UNSPLASH_BASE_URL || 'UNSPLASH_BASE_URL_HERE';

/*
  function searchPhotos(query, page = 1, perPage = 15) {
    try {
      // random every 10 s refresh
      const response = await fetch(
        `${this.baseURL}/photos/random/?query=${encodeURIComponent(
          query
        )}&count=${perPage}&client_id=${this.accessKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log('data: ' + JSON.stringify(data));
      return {
        photos: data,
        total: 10,
        totalPages: 5,
      };
    } catch (error) {
      console.error('Error fetching photos:', error);
      throw error;
    }
  }
*/

export default {
  getPhotosData: async (req: Request, res: Response, next: NextFunction) => {
    console.log('In someAPIController.getPhotosData middleware');
    console.log('UNSPLASH_ACCESS_KEY:', UNSPLASH_ACCESS_KEY);
    console.log('BASE_URL:', BASE_URL);

    const query = JSON.stringify(req.query.search) || 'shapes';
    const perPage = req.query.count || '1';

    try {
      // random every 10 s refresh
      const response = await fetch(
        `${BASE_URL}/?query=${encodeURIComponent(
          query
        )}&count=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      res.locals.photosData = {
        photos: data,
        total: perPage,
      };
      next();
      // console.log('data: ' + JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching photos:', error);
      next(error);
      throw error;
    }
  },

  // MIDDLEWARE TO GET MORE CHARACTER DATA
  getMoreCharacterData: (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const swiEndpoint = 'https://swapi.info/api/people/';

    fetch(swiEndpoint + id)
      .then((response) => {
        if (!response.ok) {
          return next({
            log: 'Error query character id unavailable',
            error: 400,
            message: { err: 'character id unavailable' },
          });
        }
        return response.json();
      })
      .then((data) => {
        res.locals.characterData = data;
        next();
      })
      .catch((error) => {
        console.error('Error fetching character data:', error);
        const errHandler = {
          log: 'Error fetching character data',
          message: { err: error.message },
        };

        next(errHandler);
      });
  },

  // ADD MIDDLEWARE TO GET MORE CHARACTERS HERE
  getMoreCharacters: (req: Request, res: Response, next: NextFunction) => {
    const swiEndpoint = 'https://swapi.info/api/people/';

    fetch(swiEndpoint)
      .then((response) => {
        if (!response.ok) {
          return next({
            log: 'swapIController.ts: getMoreCharacters Error query more characters unavailable',
            error: 400,
            message: {
              err: 'swapiController.getMoreCharacters: ERROR: Check server logs for details',
            },
          });
        }

        return response.json();
      })
      .then((data) => {
        res.locals.moreCharacters = data;
        next();
      })
      .catch((error) =>
        next({
          log: 'swapIController.ts: getMoreCharacters Error fetching more characters',
          message: {
            err: `swapiController.getMoreCharacters: ERROR: ${error.message}`,
          },
        })
      );
  },
};
