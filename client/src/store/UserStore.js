import { makeAutoObservable } from 'mobx'

export default class UserStore {
	constructor() {
		this._user = {}
		this._users = []
		this._isAuth = false
		this._isAdmin = false
		this._selected = {}
		makeAutoObservable(this)
	}

	setIsAuth(bool) {this._isAuth = bool}
	get isAuth() { return this._isAuth }

	setIsAdmin(bool) { this._isAdmin = bool }
	get isAdmin() { return this._isAdmin }

	setUser(user) { this._user = user }
	get user() { return this._user }

	setSelected(user){this._selected = user}
	get selected(){return this._selected}

	fetchUsers(users) { this._users = users }

	addUser(user) { this._users.push(user) }

	removeUser(id) { this._users = this._users.filter(user => user.id !== id) }

	updateUser(id, data) {
		this._users.map((user, i, arr) => {
			if (user.id === id) { arr[i] = data }
		})
	}

	get users() { return this._users }
}