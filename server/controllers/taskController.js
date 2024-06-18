const ApiError = require("../error/ApiError")
const uuid = require('uuid')

let { tasks } = require('../distributive')

class TaskController {
	async create(req, res, next) {
		const task = req.body
		task.id = uuid.v4()
		tasks.push(task)
		res.status(200).json(task)
	}

	async getAll(req, res, next) {
		res.status(200).json(tasks)
	}

	async getById(req, res, next) {
		const { id } = req.params
		res.status(200).json(tasks.find(task => task.id === id))
	}

	async delete(req, res, next) {
		const { id } = req.params
		tasks = tasks.filter(task => task.id !== id)
		res.status(200).json(id)
	}

	async update(req, res, next) {
		const { id } = req.params
		const { code, title } = req.body
		const task = tasks.find(task => task.id === id)
		const newTask = {
			id: id,
			code: code ? code : task.code,
			title: title ? title : task.title,
		}
		
		tasks.map((task, i, arr) => {
			if (task.id === newTask.id) {
				arr[i] = { ...newTask }
			}
		}
		)
		res.status(200).json(newTask)
	}
}

module.exports = new TaskController()