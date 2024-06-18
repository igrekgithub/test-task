import React, { useContext, useEffect, useState } from "react"
import { Accordion, Button, Card, Col, Container, Row, Form } from 'react-bootstrap'
import style from '../styles/problem.module.css'
import { Context } from ".."
import { observer } from "mobx-react-lite"
import { fetchTasks } from "../http/taskApi"
import { fetchUsers } from "../http/userApi"
import { fetchProblems, updateProblem } from "../http/problemApi"
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom"


const ProblemPage = observer(() => {
	const { userStore, taskStore, problemStore } = useContext(Context)

	const navigate = useNavigate()
	const [solutionText, setSolutionText] = useState('')

	useEffect(() => {
		fetchTasks().then(data => taskStore.fetchTasks(data))
		fetchUsers().then(data => userStore.fetchUsers(data))
		fetchProblems().then(data => problemStore.fetchProblems(data))
	}, [])

	const problem = problemStore.selected
	const task = taskStore.tasks.find(task => task.id === problem.taskId)
	const taskTitle = task ? `Код: ${task.code} Наименование: ${task.title}` : ''
	const solutionAuthor = userStore.users.find(user => user.id === problem.solutionAuthorId)
	const requestAuthor = userStore.users.find(user => user.id === problem.requestAuthorId)
	const solutionAuthorFullName = solutionAuthor ?
		`${solutionAuthor.surname} ${solutionAuthor.name} ${solutionAuthor.patronymic}` : ''
	const requestAuthorFullName = requestAuthor ?
		`${requestAuthor.surname} ${requestAuthor.name} ${requestAuthor.patronymic}` : ''
	const isOwner = problem.id === problem.requestAuthorId
	const isSolution = problem.solutionAuthorId !== ''

	const sendSolution = () => {
		const solutionOptions = {
			solutionDate: new Date().toLocaleString(),
			solution: solutionText,
			solutionAuthorId: userStore.user.id,
			status: true
		}
		updateProblem(problem.id, solutionOptions)
		.then(data => problemStore.updateProblem(data.id, data))
	}

	return (
		<Container className="mt-2">
			<h2 className={style.detail}>Детализация</h2>
			<Button className="mb-2" onClick={() => navigate(-1)}><IoArrowBack /> Back
      </Button><br />
			<Row>
				<Col md={5}>
					<Card className={style.card}>
						<Card.Body>
							<Card.Title className="mb-3" ><span>Задача:</span> {taskTitle}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted"><span>Дата создания :&nbsp;
								{problem.creationDate}</span></Card.Subtitle>
							<Card.Subtitle className="mb-2 text-muted"><span>Дата решения :
								{problem.solutionDate}</span></Card.Subtitle>
							<Card.Subtitle className="mb-2 text-muted"><span>Автор заявки : {requestAuthorFullName}</span></Card.Subtitle>
							<Card.Subtitle className="mb-2 text-muted"><span>Автор решения : {solutionAuthorFullName}</span></Card.Subtitle>
							<Card.Subtitle className="mb-2 text-muted"><span>Статус :
								<span>{problem.status ? ' завершено' : ' в работе'} </span><br /></span>
							</Card.Subtitle>
							<Card.Subtitle className="mb-2 text-muted"><span>Описание :</span></Card.Subtitle>
							<Card.Text className={style.text}>{problem.description}</Card.Text>
							{isSolution && problem.solution && <div>
								<Card.Subtitle className="mb-2 text-muted"><span>Решение :</span></Card.Subtitle>
								<Card.Text className={style.text}>{problem.solution}</Card.Text>
							</div>}
							{isOwner && <Button className="ms-2" variant="outline-success">Редактировать</Button>}
						</Card.Body>
					
						{!isSolution && <Accordion>
								<Accordion.Item eventKey="0">
									<Accordion.Header>Предложить решение</Accordion.Header>
									<Accordion.Body>
										<Form.Control as="textarea" rows={10}
										value={solutionText}
										onChange={e => setSolutionText(e.target.value)}
										></Form.Control>
										<Button className="mt-2"
										onClick={sendSolution}
										>Отправить</Button>
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>}
					</Card>
				</Col>
			</Row>
		</Container>
	)
})
export default ProblemPage
