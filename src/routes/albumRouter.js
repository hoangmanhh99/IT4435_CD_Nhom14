const router = require('express').Router();
const {authModerator} = require('../middlewares/authModerator')
const upload = require('../configs/multer.config');
const albumController = require('../controllers/albumController');
const asyncMiddleware = require('../middlewares/async');

router.post('/admin/albums', upload.single('cover_image'), authModerator, asyncMiddleware(albumController.create));
router.put('/admin/albums/:albumId', authModerator, asyncMiddleware(albumController.update));
router.put('/admin/albums/updateCoverImage/:albumId', upload.single('cover_image'), authModerator, asyncMiddleware(albumController.updateCoverImage));
router.delete('/admin/albums/:albumId', authModerator, asyncMiddleware(albumController.deleteById));

router.get('/albums/:albumId', asyncMiddleware(albumController.getById));
router.get('/albums', asyncMiddleware(albumController.get_list_albums));

module.exports = router;