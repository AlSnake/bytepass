const router = require('express').Router();

const AuthRoutes = require('./auth/auth');

router.use('/api/auth', AuthRoutes);

module.exports = router;
