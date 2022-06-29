const express = require('express');
const asyncHandler = require('express-async-handler');

const { Spot, Review, Image } = require('../../db/models');

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
    const spots = await Spot.findAll({
      include: [
        {
          model: Review,
        },
        {
          model: Image,
        },
      ],
    });

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

    return res.json(spots);
  })
);

//**************** GET SPECIFIC SPOT ************************//
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: Review,
        },
        {
          model: Image,
        },
      ],
    });

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

//******************** DELETE SPOT **************************//
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

//******************** EDIT SPOT ****************************//
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const editSpot = await Spot.findByPk(id);
    editSpot.name = req.body.name;
    editSpot.address = req.body.address;
    editSpot.city = req.body.city;
    editSpot.state = req.body.state;
    editSpot.country = req.body.country;
    editSpot.description = req.body.description;
    editSpot.latitude = req.body.latitude;
    editSpot.longitude = req.body.longitude;
    editSpot.save();

    res.send({ message: 'Edit Successful', editSpot });
  })
);
module.exports = router;
