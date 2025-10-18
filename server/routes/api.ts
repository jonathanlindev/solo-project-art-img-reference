import express from 'express';
import starWarsController from '../controllers/starWarsController.ts';

const router = express.Router();

router.get('/', starWarsController.getCharacters, (req, res) => {
  // console.log(res.locals.characters);
  res.status(200).json(res.locals.character);
});
// router.get('/test', starWarsController.getCharacters, (req, res) => {
//   res.status(200).json(res.locals.character);
// });

router.get('/species', starWarsController.getSpecies, (req, res) =>
  res.status(200).json({})
);

router.get('/homeworld', starWarsController.getHomeworld, (req, res) =>
  res.status(200).json({})
);

router.get('/film', starWarsController.getFilm, (req, res) =>
  res.status(200).json({})
);

router.post('/character', starWarsController.addCharacter, (req, res) =>
  res.status(200).json({})
);

export default router;
