import express from 'express';
import starWarsController from '../controllers/starWarsController.ts';
import apiController from '../controllers/unsplashAPIController.ts';

const router = express.Router();

router.get('/', apiController.getPhotosData, (req, res) => {
  // console.log(res.locals.characters);
  res.status(200).json(JSON.stringify(res.locals.photosData));
});
router.get('/category', apiController.getPhotosCategoryData, (req, res) => {
  // console.log(res.locals.characters);
  res.status(200).json(JSON.stringify(res.locals.photosData));
});

router.get('/search', apiController.searchPhotosData, (req, res) => {
  // console.log(res.locals.characters);
  res.status(200).json(JSON.stringify(res.locals.photosData));
});

export default router;
