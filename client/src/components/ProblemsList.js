import React, { useContext } from "react"
import { Context } from ".."
import { ListGroup } from "react-bootstrap"
import { BsFillTrash3Fill, BsPen } from "react-icons/bs"
import { BsChatRightDots } from "react-icons/bs"
import style from '../styles/list.module.css'
import { observer } from "mobx-react-lite"
import { removeProblem } from "../http/problemApi"
import { useNavigate } from "react-router-dom"


const ProblemsList = observer(({ showUpdateProblem }) => {
	const { problemStore } = useContext(Context)
	const navigate = useNavigate()

	const deleteProblem = (id) => {
		removeProblem(id).then(id => problemStore.removeProblem(id))
	}

	const details = (problem) => {
		problemStore.setSelected(problem)
		navigate('/problem')
	}

	return (
		<ListGroup>
			{problemStore.problems.map(problem =>
				<ListGroup.Item key={problem.id} className={style.list}>
					<div className={style.icon}>
						<BsChatRightDots className="me-4" title="детализация"
						onClick={() => details(problem)} />
						<BsPen className="me-4" title="редактировать"
							onClick={() => showUpdateProblem(problem)} />
						<BsFillTrash3Fill title="удалить"
						onClick={() => deleteProblem(problem.id)}
						/></div>
					<span>Дата создания: {problem.creationDate}</span><br />
					<span>Дата решения: {problem.solutionDate}</span><br />
					<span>Описание: {problem.description}</span><br />
					<span>Решение: {problem.solution}</span><br />
					<span>Автор заявки: {problem.requestAuthorId}</span><br />
					<span>Автор решения: {problem.solutionAuthorId}</span><br />
					<span>Задача: {problem.taskId}</span><br />
					<span>Статус: {problem.status ? 'завершено' : 'в работе'} </span><br />
					<span>Id: {problem.id}</span>
				</ListGroup.Item>
			)}
		</ListGroup>
	)
})
export default ProblemsList
