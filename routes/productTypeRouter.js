const Router = require('express')
const router = new Router()
const productTypeController = require('../controllers/productTypeController')

router.post('/', productTypeController.create)
router.put('/', productTypeController.upsert)
router.get('/', productTypeController.getAll)
router.delete('/', productTypeController.delete)

module.exports = router