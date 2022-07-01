const express = require('express');
const asyncHandler = require('express-async-handler');

const { Review, User } = require('../../db/models');

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

    const check = await Review.findOne({
      where: {
        userId: ratingInfo.userId,
        spotId: ratingInfo.spotId,
      },
    });

    let review;
    if (check === null) {
      const newReview = await Review.create(ratingInfo);

      review = await Review.findByPk(newReview.id, {
        include: {
          model: User,
          attribute: User.username,
        },
      });

      return res.send({ review });
    } else {
      return res.send({ message: 'User already reviewed spot' });
    }
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
