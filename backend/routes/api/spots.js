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

router.get(
  '/',
  asyncHandler(async (req, res) => {
    res.send('hello, here is ya token');
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

module.exports = router;
