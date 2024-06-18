import { $authHost, $host } from ".";


export const createProblem = async (problem) => {
	const { data } = await $authHost.post('api/problem', problem)
	return data
}

export const fetchProblems = async () => {
	const { data } = await $host.get('api/problem')
	return data
}

export const getProblemById = async (id) => {
	const { data } = await $host.get('api/problem/' + id)
	return data
}

export const removeProblem = async (id) => {
	const { data } = await $host.delete('api/problem/' + id)
	console.log('API removeProblem', data)
	return data
}

export const updateProblem = async (id, problem) => {
	const { data } = await $host.put('api/problem/' + id, problem)
	return data
}