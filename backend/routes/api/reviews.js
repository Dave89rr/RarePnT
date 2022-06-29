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

//**************** CREATE REVIEW ****************************//
router.post(
  '/',
  validateRating,
  asyncHandler(async (req, res) => {
    const ratingInfo = req.body;

    const review = await Review.create(ratingInfo);

    return res.send({ review });
  })
);

//**************** GET REVIEWS ******************************//
// router.get(
//   '/spot/:id',
//   asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     const reviews = await Review.findAll({
//       where: {
//         spotId: id,
//       },
//     });
//     return res.send({ reviews });
//   })
// );

//**************** REMOVE REVIEWS ***************************//
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const delReview = await Review.findByPk(id);

    try {
      await delReview.destroy();
      res.send({ message: 'ok' });
    } catch (e) {
      res.status(500);
    }
  })
);
module.exports = router;
