import models from '../models/artImgReferenceModels';
import { Request, Response, NextFunction } from 'express';

const PhotosController = {
  // Create a new photo in the Database
  // Photo information will be sent in the request body
  // This should send the created photo
  createPhoto: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        id,
        category,
        search,
        urls,
        alt_description,
        likes,
        links,
        user,
      } = req.body;

      // Validate required fields
      if (!id || !search || !urls) {
        return next({
          log: `PhotosController.createPhoto: ERROR: Missing required fields - id: ${id}, search: ${search}, urls: ${urls}`,
          message: 'Missing required fields: id, search, and urls are required',
        });
      }

      // Validate urls object has required properties
      if (
        !urls.raw ||
        !urls.full ||
        !urls.regular ||
        !urls.small ||
        !urls.thumb
      ) {
        return next({
          log: `PhotosController.createPhoto: ERROR: Missing required URL fields in urls object`,
          message:
            'Missing required URL fields: raw, full, regular, small, and thumb are required in urls',
        });
      }

      // Check if photo already exists
      const existingPhoto = await models.Photos.findOne({ id });
      if (existingPhoto) {
        return next({
          log: `PhotosController.createPhoto: ERROR: Photo with id ${id} already exists`,
          message: `Photo with id ${id} already exists`,
        });
      }

      const newPhoto = new models.Photos({
        id,
        category,
        search,
        urls,
        alt_description,
        likes: likes || 0,
        links,
        user,
      });

      const savedPhoto = await newPhoto.save();
      res.locals.photo = savedPhoto;
      return next();
    } catch (err) {
      console.error('Error creating photo:', err);
      return next({
        log: `PhotosController.createPhoto: ERROR: ${err.message}`,
        message: 'Error creating photo',
      });
    }
  },

  // Get photos by category from the database
  // Category will be in the request parameter 'category'
  // This should send the found photos
  getPhotosByCategory: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { category } = req.params;

      if (!category) {
        return next({
          log: `PhotosController.getPhotosByCategory: ERROR: Category parameter is missing`,
          message: 'Category parameter is required',
        });
      }

      const photos = await models.Photos.find({
        category: { $regex: new RegExp(category, 'i') }, // Case-insensitive search
      });

      res.locals.photos = photos;
      res.locals.count = photos.length;
      return next();
    } catch (err) {
      console.error('Error retrieving photos by category:', err);
      return next({
        log: `PhotosController.getPhotosByCategory: ERROR: ${err.message}`,
        message: 'Error retrieving photos by category',
      });
    }
  },

  // Get photos by search term from the database
  // Search term will be in the request parameter 'search' or query 'q'
  // This should send the found photos
  getPhotosBySearch: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const searchTerm = req.params.search || (req.query.q as string);

      if (!searchTerm) {
        return next({
          log: `PhotosController.getPhotosBySearch: ERROR: Search parameter is missing`,
          message: 'Search parameter is required',
        });
      }

      // Search in both 'search' field and 'alt_description' field
      const photos = await models.Photos.find({
        $or: [
          { search: { $regex: new RegExp(searchTerm, 'i') } },
          { alt_description: { $regex: new RegExp(searchTerm, 'i') } },
          { category: { $regex: new RegExp(searchTerm, 'i') } },
        ],
      });

      res.locals.photos = photos;
      res.locals.count = photos.length;
      res.locals.searchTerm = searchTerm;
      return next();
    } catch (err) {
      console.error('Error retrieving photos by search:', err);
      return next({
        log: `PhotosController.getPhotosBySearch: ERROR: ${err.message}`,
        message: 'Error retrieving photos by search',
      });
    }
  },

  // Get all photos from the database
  // This should send all photos
  getAllPhotos: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const photos = await models.Photos.find({});

      res.locals.photos = photos;
      res.locals.count = photos.length;
      return next();
    } catch (err) {
      console.error('Error retrieving all photos:', err);
      return next({
        log: `PhotosController.getAllPhotos: ERROR: ${err.message}`,
        message: 'Error retrieving all photos',
      });
    }
  },

  // Delete all photos from the database
  // This should send a success status
  deleteAllPhotos: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await models.Photos.deleteMany({});

      res.locals.deletedCount = result.deletedCount;
      res.locals.message = `Successfully deleted ${result.deletedCount} photos`;
      return next();
    } catch (err) {
      console.error('Error deleting all photos:', err);
      return next({
        log: `PhotosController.deleteAllPhotos: ERROR: ${err.message}`,
        message: 'Error deleting all photos',
      });
    }
  },

  // Delete a specific photo by ID
  // Photo ID will be in the request parameter 'id'
  deletePhotoById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) {
        return next({
          log: `PhotosController.deletePhotoById: ERROR: Photo ID is missing`,
          message: 'Photo ID is required',
        });
      }

      const result = await models.Photos.findOneAndDelete({ id });

      if (!result) {
        return next({
          log: `PhotosController.deletePhotoById: ERROR: Photo with id ${id} not found`,
          message: `Photo with id ${id} not found`,
        });
      }

      res.locals.deletedPhoto = result;
      res.locals.message = `Successfully deleted photo with id ${id}`;
      return next();
    } catch (err) {
      console.error('Error deleting photo by ID:', err);
      return next({
        log: `PhotosController.deletePhotoById: ERROR: ${err.message}`,
        message: 'Error deleting photo by ID',
      });
    }
  },
};

export default PhotosController;
