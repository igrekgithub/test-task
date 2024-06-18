const Router = require('express')
const taskController = require('../controllers/taskController')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', taskController.create)
router.get('/', taskController.getAll)
router.get('/:id', taskController.getById)
router.delete('/:id', taskController.delete)
router.put('/:id', taskController.update)


module.exports = router