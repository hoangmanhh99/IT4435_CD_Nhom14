const router = require('express').Router();
const authUser = require('../middlewares/authUser')
const {authModerator} = require('../middlewares/authModerator')
const upload = require('../configs/multer.config');
const songController = require('../controllers/songController');
const asyncMiddleware = require('../middlewares/async');

// TODO : sau phải thêm middleware check authorize vào tất cả các api
router.post('/admin/songs', upload.array('fileAndImage', 2), authModerator, asyncMiddleware(songController.create));
router.put('/admin/songs/:songId', authModerator, asyncMiddleware(songController.update));
router.put('/admin/songs/cover-image/:songId', upload.single('cover_image'), authModerator,asyncMiddleware(songController.updateCoverImage));
router.put('/admin/songs/file/:songId',upload.single('file'), authModerator, asyncMiddleware(songController.updateSongFile));
router.delete('/admin/songs/:songId', authModerator, asyncMiddleware(songController.deleteSong));
router.get('/users/songs/:songId', authUser, asyncMiddleware(songController.watchSong));
router.get('/songs', asyncMiddleware(songController.get_list_songs));

module.exports = router;



