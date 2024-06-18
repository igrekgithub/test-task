import { makeAutoObservable } from "mobx"


export default class TaskStore {
	constructor() {
		this._tasks = []
		this._selected = {}
		makeAutoObservable(this)
	}

	setSelected(task) { this._selected = task }
	get selected() { return this._selected }

	fetchTasks(tasks) { this._tasks = tasks }

	addTask(task) { this._tasks.push(task) }

	removeTask(id) { this._tasks = this._tasks.filter(task => task.id !== id) }

	updateTask(id, data) {
		this._tasks.map((task, i, arr) => {
			if (task.id === id) { arr[i] = data }
		})
	}

	get tasks() { return this._tasks }
}