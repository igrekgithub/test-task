import { makeAutoObservable } from 'mobx'

export default class BarStore {
	constructor() {
		this._selected = 'problems'
		makeAutoObservable(this)
	}
	setSelected(val) { this._selected = val }
	
	get selected() { return this._selected }
}