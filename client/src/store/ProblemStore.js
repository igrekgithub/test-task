import { makeAutoObservable } from "mobx"


export default class ProblemStore {
	constructor() {
		this._problems = []
		this._selected = {}
		makeAutoObservable(this)
	}

	setSelected(problem) { this._selected = problem }
	get selected() { return this._selected }

	fetchProblems(problems) { this._problems = problems }

	addProblem(problem) { this._problems.push(problem) }

	removeProblem(id) { this._problems = this._problems.filter(problem => problem.id !== id) }

	updateProblem(id, data) {
		this._problems.map((problem, i, arr) => {
			if (problem.id === id) { arr[i] = data }
		})
	}

	get problems() { return this._problems }
}