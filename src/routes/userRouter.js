const router = require('express').Router();
const authUser = require('../middlewares/authUser')
const upload = require('../configs/multer.config');
const { apiTypes,
        validate,
        getValidateResult
        } = require('../middlewares/validate');
const userController = require('../controllers/userController');
const asyncMiddleware = require('../middlewares/async');

/*** Da TEST */
router.post('/users/login', validate(apiTypes.LOGIN), getValidateResult, asyncMiddleware(userController.login));
router.post('/users/register', getValidateResult, asyncMiddleware(userController.register));
router.put('/users/avatar', authUser, upload.single("avatar"), asyncMiddleware(userController.updateAvatar));
router.post('/users/like_singers/:id', authUser, asyncMiddleware(userController.like_singers));
router.post('/users/like_song/:id', authUser, asyncMiddleware(userController.like_song));
router.get('/get_user_info', authUser, asyncMiddleware(userController.get_user_info))
router.post('/user/logout', authUser, asyncMiddleware(userController.logout));

module.exports = router;
