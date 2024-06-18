import { $authHost, $host } from ".";


export const createTask = async (problem) => {
	const { data } = await $authHost.post('api/task', problem)
	return data
}

export const fetchTasks = async () => {
	const { data } = await $host.get('api/task')
	return data
}

export const getTaskByTask = async (id) => {
	const { data } = await $host.get('api/task/' + id)
	return data
}

export const removeTask = async (id) => {
	const { data } = await $host.delete('api/task/' + id)
	return data
}

export const updateTask = async (id, task) => {
	const { data } = await $host.put('api/task/' + id, task)
	return data
}


