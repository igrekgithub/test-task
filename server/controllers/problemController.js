const ApiError = require("../error/ApiError")
const uuid = require('uuid')

let { problems } = require('../distributive')

class ProblemController {
	async create(req, res) {
		const problem = req.body

		problem.id = uuid.v4()
		problems.push(problem)
		res.status(200).json(problem)
	}
	async getAll(req, res) {
		res.status(200).json(problems)
	}
	async getById(req, res) {
		const { id } = req.params
		res.status(200).json(problems.find(problem => problem.id === id))
	}
	async delete(req, res) {
		const { id } = req.params
		problems = problems.filter(problem => problem.id !== id)
		res.status(200).json(id)
	}
	async update(req, res, next) {
		const { id } = req.params
		const { creationDate, solutionDate, description, solution,
			requestAuthorId, solutionAuthorId, taskId, status } = req.body
		const problem = problems.find(problem => problem.id === id)
		const newProblem = {
			id: id,
			creationDate: creationDate ? creationDate : problem.creationDate,
			solutionDate: solutionDate ? solutionDate : problem.solutionDate,
			description: description ? description : problem.description,
			solution: solution ? solution : problem.solution,
			requestAuthorId: requestAuthorId ? requestAuthorId : problem.requestAuthorId,
			solutionAuthorId: solutionAuthorId ? solutionAuthorId : problem.solutionAuthorId,
			taskId: taskId ? taskId : problem.taskId,
			status: status ? status : problem.status
		}

		problems.map((problem, i, arr) => {
			if (problem.id === newProblem.id) {
				arr[i] = { ...newProblem }
			}
		}
		)
		console.log('newProblem', newProblem)
		res.status(200).json(newProblem)
	}

}


module.exports = new ProblemController()