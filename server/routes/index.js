const Router = require('express')
const userRouter = require('./userRouter')
const taskRouter = require('./taskRouter')
const problemRouter = require('./problemRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/task', taskRouter)
router.use('/problem', problemRouter)


module.exports = router