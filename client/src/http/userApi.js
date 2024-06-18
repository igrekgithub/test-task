import { $authHost, $host } from ".";
import { jwtDecode } from 'jwt-decode'

export const registration = async (name, surname, patronymic, password, role = 'user') => {
	const { data } = await $host.post('api/user/registration',
		{ name, surname, patronymic, password, role }
	)
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}

export const login = async (name, surname, patronymic, password) => {
	const { data } = await $authHost.post('api/user/login',
		{ name, surname, patronymic, password }
	)
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}

export const check = async () => {
	const { data } = await $authHost.get('api/user/auth')
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}

export const fetchUsers = async () => {
	const { data } = await $host.get('api/user')
	return data
}

export const removeUser = async (id) => {
	const { data } = await $host.delete('api/user/' + id)
	return data
}

export const updateUser = async (id, user) => {
	const { data } = await $host.put('api/user/' + id, user)
	return data
}