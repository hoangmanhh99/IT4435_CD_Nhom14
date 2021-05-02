const router = require('express').Router();
const { authModerator } = require('../middlewares/authModerator')

const upload = require('../configs/multer.config');
const itemController = require('../controllers/itemController');
const asyncMiddleware = require('../middlewares/async');

router.post('/admin/items', authModerator, upload.single('cover_image'), asyncMiddleware(itemController.create));
router.put('/admin/items/:itemId', authModerator, asyncMiddleware(itemController.update));
router.put('/admin/items/updateCoverImage/:itemId', authModerator, upload.single('cover_image'), asyncMiddleware(itemController.updateCoverImage));
router.delete('/admin/items/:itemId', authModerator, asyncMiddleware(itemController.deleteById));

router.get('/items/:itemId', asyncMiddleware(itemController.getById));

module.exports = router;