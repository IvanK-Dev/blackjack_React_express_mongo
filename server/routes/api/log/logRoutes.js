const { Router } = require('express');
const { createLog } = require('../../../controllers/log/createLog');
const { createPlayerLog } = require('../../../controllers/log/createPlayerLog');


const router=Router()

router.route('/:gameId').get(createLog)
router.route('/:gameId/createPlayer').post(createPlayerLog)

module.exports = router;