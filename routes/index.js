const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const modelRouter = require('./modelRouter')
const productRouter = require('./productRouter')

router.use('/user', userRouter)
router.use('/brand', brandRouter)
router.use('/model', modelRouter)
router.use('/product', productRouter)

module.exports = router