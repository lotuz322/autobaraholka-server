const Router = require('express')
const router = new Router()
const modelController = require('../controllers/modelController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')


router.post('/', checkRoleMiddleware('ADMIN'), modelController.create)
router.get('/', modelController.getAll)
router.get('/:brandId', modelController.getAllByBrandId)
router.delete('/', modelController.delete)
router.put('/', modelController.upsert)


module.exports = router