import express from 'express';
import photosController from '../controllers/photosController.ts';
import apiController from '../controllers/unsplashAPIController.ts';

const router = express.Router();

router.get(
  '/',
  apiController.getPhotosData,
  photosController.getPhotosByCategory,
  (req, res) => {
    res.status(200).json(JSON.stringify(res.locals.photosData));
  }
);
router.get('/category', apiController.getPhotosCategoryData, (req, res) => {
  res.status(200).json(JSON.stringify(res.locals.photosData));
});

router.get('/search', apiController.searchPhotosData, (req, res) => {
  res.status(200).json(JSON.stringify(res.locals.photosData));
});

export default router;
