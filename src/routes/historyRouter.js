const router = require('express').Router();

const historyController = require('../controllers/historyController');
const asyncMiddleware = require('../middlewares/async');

router.get('/histories/:userId', asyncMiddleware(historyController.getHistory));
router.delete('/histories/:userId', asyncMiddleware(historyController.deleteHistory));

module.exports = router;
