
const router = require('express').Router();

const { apiTypes,
        validate,
        getValidateResult
        } = require('../middlewares/validate');
const moderatorController = require('../controllers/moderatorController');
const asyncMiddleware = require('../middlewares/async');

/*** DA TEST */
router.post('/admin/login', validate(apiTypes.LOGIN), getValidateResult, asyncMiddleware(moderatorController.login));
router.post('/admin/register', getValidateResult, asyncMiddleware(moderatorController.register));



module.exports = router;
