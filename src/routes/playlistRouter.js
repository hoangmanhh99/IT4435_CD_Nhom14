// CHUA LAM
const router = require('express').Router();
const {authModerator} = require('../middlewares/authModerator')
const playlistController = require('../controllers/playlistController');
const upload = require('../configs/multer.config');
const asyncMiddleware = require('../middlewares/async');

router.post('/admin/playlist', authModerator, upload.single('cover_image'), asyncMiddleware(playlistController.create));
router.put('/admin/playlist/:playlistID', authModerator,asyncMiddleware(playlistController.update));
router.delete('/admin/playlist/:playlistID', authModerator,asyncMiddleware(playlistController.deleteById));
router.get('/playlist/:playlistID', asyncMiddleware(playlistController.getById));

module.exports = router;