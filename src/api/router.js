const router = require('express').Router();

const AuthRoutes = require('./auth/auth');
const UserRoutes = require('./user/user');

router.use('/api/auth', AuthRoutes);
router.use('/api/user', UserRoutes);

module.exports = router;
