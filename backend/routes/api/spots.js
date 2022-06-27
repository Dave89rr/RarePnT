const express = require('express');
const asyncHandler = require('express-async-handler');

const { Spot } = require('../../db/models');

const router = express.Router();
const { check } = require('express-validator');

//******** CURRENTLY ONLY CHECKS FIELD NOT BLANK ************//
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide an address'),
  check('city')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a city'),
  check('state')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a state'),
  check('country')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a state'),
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a name'),
  check('latitude')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a latitude'),
  check('longitude')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a longitude'),
];

//**************** GET ALL SPOTS ****************************//
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const spots = await Spot.findAll();
    return res.json(spots);
  })
);

//**************** GET USER SPOTS****************************//
router.get(
  '/users/:id',
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const spots = await Spot.findAll({
      where: { userId: userId },
      order: [['createdAt', 'DESC']],
    });

    // console.log(spots);
    return res.json(spots);
  })
);

//**************** GET SPECIFIC SPOT ************************//
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId);

    return res.json(spot);
  })
);

//******************** CREATE SPOT **************************//
router.post(
  '/',
  validateSpot,
  asyncHandler(async (req, res) => {
    const spotInfo = req.body;

    const spot = await Spot.create(spotInfo);

    return res.send({ spot });
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const delSpot = await Spot.findByPk(id);
    try {
      await delSpot.destroy();
      res.send({ message: 'ok' });
    } catch (e) {
      res.status(500);
    }
  })
);

module.exports = router;
