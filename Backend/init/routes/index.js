const express = require('express');
const router = express.Router();

const userRouter = require('./user1');
const userDetailsRouter = require('./userDetails');
const orderRouter = require('./order');
const paymentRouter = require('./payment');
const authorRouter = require('./person');
const storyRouter = require('./story');

router.use('/user', userRouter);
router.use('/user-details', userDetailsRouter);
router.use('/order', orderRouter);
router.use('/payment', paymentRouter);
router.use('/author', authorRouter);
router.use('/story', storyRouter);

module.exports = router;
