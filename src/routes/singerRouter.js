const router = require('express').Router();
const upload = require('../configs/multer.config');
const { authModerator } = require('../middlewares/authModerator')
const singerController = require('../controllers/singerController');
const asyncMiddleware = require('../middlewares/async');

router.post('/admin/singers', upload.single('avatar'), authModerator, asyncMiddleware(singerController.create));
router.put('/admin/singers/:singerId', authModerator, asyncMiddleware(singerController.update));
router.put('/admin/singers/updateAvatar/:singerId', authModerator, upload.single('avatar'), asyncMiddleware(singerController.updateAvatar));
router.delete('/admin/singers/:singerId', authModerator, asyncMiddleware(singerController.deleteById));

router.get('/singers/:singerId', asyncMiddleware(singerController.getById));
router.get('/singers', asyncMiddleware(singerController.get_list_singers))


module.exports = router;