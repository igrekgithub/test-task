const Router = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.post('/', userController.create)
router.get('/', userController.getAll)
router.get('/:id', userController.getById)
router.delete('/:id', userController.delete)
router.put('/:id', userController.update)


module.exports = router