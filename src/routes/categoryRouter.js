const router = require('express').Router();
const {authModerator} = require('../middlewares/authModerator')
const categoryController = require('../controllers/categoryController');
const upload = require('../configs/multer.config');
const asyncMiddleware = require('../middlewares/async');

router.post('/admin/categorys', authModerator, upload.single('cover_image'), asyncMiddleware(categoryController.create));
router.put('/admin/categorys/:categoryID', authModerator,asyncMiddleware(categoryController.update));
router.delete('/admin/categorys/:categoryID', authModerator,asyncMiddleware(categoryController.deleteById));
router.get('/categorys/:categoryID', asyncMiddleware(categoryController.getById));
router.get('/categorys', asyncMiddleware(categoryController.get_list_categorys))

module.exports = router;