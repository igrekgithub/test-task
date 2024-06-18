const jwt = require('jsonwebtoken')


module.exports = function(role){
	return function (req, res, next) {
		if (req.method === "OPTIONS") { next() }
		try {
			const token = req.headers.authorization.split(' ')[1]
			if (!token) { res.status(401).json({ message: "Вы не авторизованы" }) }
			const decodeUser = jwt.verify(token, process.env.SECRET)
			
			if(decodeUser.role !== role){
				res.status(403).json({ message: "Нет доступа." }) 
			}
			req.user = decodeUser
			next()
		} catch (error) {
			res.status(401).json({ message: "Вы не авторизованы" })
		}
	}
}
