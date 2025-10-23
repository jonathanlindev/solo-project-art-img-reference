import express from 'express';
import photosController from '../controllers/photosController.ts';
import apiController from '../controllers/unsplashAPIController.ts';

const router = express.Router();

router.get(
  '/',
  apiController.getPhotosData,
  // photosController.createPhotos,
  // photosController.getPhotosByCategory,
  (req, res) => {
    console.log('In / route handler');
    res.status(200).json(JSON.stringify(res.locals.photosData));
  }
);

router.get(
  '/category',
  apiController.getPhotosCategoryData,
  photosController.createPhotos,
  photosController.getPhotosByCategory,
  (req, res) => {
    console.log('In /category route handler');
    res.status(200).json(JSON.stringify(res.locals.photosData));
  }
);

router.get('/search', apiController.searchPhotosData, (req, res) => {
  console.log('In /search route handler');
  res.status(200).json(JSON.stringify(res.locals.photosData));
});

export default router;
