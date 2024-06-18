const ApiError = require("../error/ApiError")
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

let { users } = require('../distributive')

const cryptPassword = async(password) => {
	return await bcrypt.hash(password, 3)
}

const generateJwt = (id, name, surname, patronymic, role) => {
	return jwt.sign({ id, name, surname, patronymic, role },
		process.env.SECRET, { expiresIn: "20d" })
}

class UserController {
	async registration(req, res, next) {
		const { name, surname, patronymic, password, role } = req.body
		if (!name || !surname || !patronymic || !password) {
			return next(ApiError.badRequest('Введены не все данные.'))
		}
		const candidate = await users.find(user => user.name === name
			&& user.surname === surname && user.patronymic === patronymic)
		if (candidate) {
			return next(ApiError.badRequest('Вы зарегистрированы.'))
		}
		const hashPassword = await bcrypt.hash(password, 3)
		const user = { name, surname, patronymic, password: hashPassword, role }
		user.id = uuid.v4()
		await users.push(user)
		const token = generateJwt(user.id, user.name, user.surname, user.patronymic, user.role)
		return res.json({ token })
	}

	
	async login(req, res, next) {
		const { name, surname, patronymic, password } = req.body
		const user = await users.find(user => user.name === name
			&& user.surname === surname && user.patronymic === patronymic)

		if (!user) { return next(ApiError.forbidden('Пользователь не найден.')) }
			let comparePassword = bcrypt.compareSync(password, user.password)
			if (!comparePassword) {
				return next(ApiError.forbidden('Неверный пароль.'))
			}
		const token = generateJwt(user.id, user.name, user.surname, user.patronymic, user.role)
		return res.json({ token })
	}

	async check(req, res, next) {
		const { id, name, surname, patronymic, role } = req.user
		const token = generateJwt(id, name, surname, patronymic, role)
		return res.json({ token })
	}

	async create(req, res, next) {
		try {
			const user = req.body
			user.id = uuid.v4()
			await users.push(user)
			res.status(200).json(user)
		} catch (error) { next(ApiError.badRequest(error.message)) }
	}

	async getAll(req, res, next) {
		res.status(200).json(users)
	}

	async getById(req, res, next) {
		const { id } = req.params
		const user = await users.find(user => user.id === id)
		res.status(200).json(user)
	}

	async delete(req, res, next) {
		const { id } = req.params
		users = users.filter(user => user.id !== id)
		res.status(200).json(id)
	}

	async update(req, res, next) {
		const { id } = req.params
		const { name, surname, patronymic, password, role } = req.body
		const user = await users.find(user => user.id === id)
		const newUser = {
			id: id,
			name: name ? name : user.name,
			surname: surname ? surname : user.surname,
			patronymic: patronymic ? patronymic : user.patronymic,
			password: password ? password : user.password,
			role: role ? role : user.role
		}
		
		users.map((user, i, arr) => {
			if (user.id === newUser.id) {
				arr[i] = { ...newUser }
			}
		}
		)
		res.status(200).json(newUser)
	}
}

module.exports = new UserController()