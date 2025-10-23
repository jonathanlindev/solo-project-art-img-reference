import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'; // This loads .env file variables into process.env

dotenv.config();

const UNSPLASH_ACCESS_KEY =
  process.env.VITE_UNSPLASH_ACCESS_KEY || 'YOUR_UNSPLASH_ACCESS_KEY_HERE';

const BASE_URL = process.env.UNSPLASH_BASE_URL || 'UNSPLASH_BASE_URL_HERE';
const UNSPLASH_FEATURED_URL =
  process.env.UNSPLASH_FEATURED_URL || 'UNSPLASH_FEATURED_URL_HERE';

export default {
  getPhotosData: (req: Request, res: Response, next: NextFunction) => {
    console.log('In someAPIController.getPhotosData middleware');

    //featured photos
    //https://api.unsplash.com/photos/?featured=true&client_id=Hy9QnwAyCm0R7ogQthu-t7zWllEGb2VQpJAuXo8nF4Q

    const perPage = req.query.count || '3';

    // random every 10 s refresh
    fetch(
      `${UNSPLASH_FEATURED_URL}?featured=true&per_page=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          return next({
            log: 'Error query photos data unavailable',
            error: 400,
            message: {
              err: 'unsplashAPIController.searchPhotosData: ERROR: Check server logs for details',
            },
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched featured photos data:', JSON.stringify(data));
        data.map((photo: any) => {
          console.log('Photo ID:', photo.id, 'Category: featured');
          photo.category = 'featured';
          photo.search = 'featured';
          return photo;
        });
        req.body = data;
        req.query.category = 'featured';

        // console.log('!!!' + JSON.stringify(req.body[0]));
        res.locals.photosData = {
          photos: data,
          total: perPage,
        };
        next();
      })
      .catch((error) => {
        console.error('Error fetching photos data:', error);
        const errHandler = {
          log: 'Error fetching photos data',
          message: { err: error.message },
        };

        next(errHandler);
      });
  },
  getPhotosCategoryData: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('In someAPIController.getPhotosCategoryData middleware');

    const query = JSON.stringify(req.query.category) || 'nature';
    const perPage = req.query.count || '3';
    // random every 10 s refresh
    fetch(
      `${BASE_URL}/?query=${encodeURIComponent(
        query
      )}&count=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          return next({
            log: 'Error query photos data unavailable',
            error: 400,
            message: {
              err: 'unsplashAPIController.getPhotosCategoryData: ERROR: Check server logs for details',
            },
          });
        }
        return response.json();
      })
      .then((data) => {
        data.map((photo: any) => {
          photo.category = query;
          photo.search = query;
          return photo;
        });
        req.body = data;
        res.locals.photosData = {
          photos: data,
          total: perPage,
        };
        next();
        // console.log('data: ' + JSON.stringify(data));
      })
      .catch((error) => {
        console.error('Error fetching photos data:', error);
        const errHandler = {
          log: 'Error fetching photos data',
          message: { err: error.message },
        };

        next(errHandler);
      });
  },
  searchPhotosData: (req: Request, res: Response, next: NextFunction) => {
    console.log('In someAPIController.getPhotosData middleware');
    // console.log('UNSPLASH_ACCESS_KEY:', UNSPLASH_ACCESS_KEY);
    // console.log('BASE_URL:', BASE_URL);

    //featured photos
    //https://api.unsplash.com/photos/?featured=true&client_id=qa2kEUMJhMIYt-Lnf7dVKXWN0swIijdUNQQEVGfhH9Q

    const query = JSON.stringify(req.query.search) || 'shapes';
    const perPage = req.query.count || '3';
    // random every 10 s refresh
    fetch(
      `${BASE_URL}/?query=${encodeURIComponent(
        query
      )}&count=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          return next({
            log: 'Error query photos data unavailable',
            error: 400,
            message: {
              err: 'unsplashAPIController.searchPhotosData: ERROR: Check server logs for details',
            },
          });
        }
        return response.json();
      })
      .then((data) => {
        data.map((photo: any) => {
          console.log('Photo ID:', photo.id, 'search: ', query);
          photo.category = query;
          photo.search = query;
          return photo;
        });
        req.body = data;

        res.locals.photosData = {
          photos: data,
          total: perPage,
        };
        next();
        // console.log('data: ' + JSON.stringify(data));
      })
      .catch((error) => {
        console.error('Error fetching photos data:', error);
        const errHandler = {
          log: 'Error fetching photos data',
          message: { err: error.message },
        };

        next(errHandler);
      });
  },
};
