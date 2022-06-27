const express = require('express');
const asyncHandler = require('express-async-handler');

const { Review } = require('../../db/models');

const router = express.Router();
const { check } = require('express-validator');

const validateRating = [
  check('rating')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a rating'),
];

//******************** CREATE REVIEW **************************//
router.post(
  '/',
  validateRating,
  asyncHandler(async (req, res) => {
    const ratingInfo = req.body;

    const review = await Review.create(ratingInfo);

    return res.send({ review });
  })
);

module.exports = router;
