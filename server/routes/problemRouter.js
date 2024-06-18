const Router = require('express')
const problemController = require('../controllers/problemController')
const checkRole = require('../middleware/checkRoleMiddleware')

const router = new Router()

router.post('/', problemController.create)
router.get('/',  problemController.getAll)
router.get('/:id',  problemController.getById)
router.delete('/:id', problemController.delete)
router.put('/:id',  problemController.update)



module.exports = router