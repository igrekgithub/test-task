import React, { useContext, useState } from "react"
import { Button, Dropdown, Form, Modal } from "react-bootstrap"
import { Context } from "../.."
import { observer } from "mobx-react-lite"
import { updateProblem } from "../../http/problemApi"



const UpdateProblem = observer(({ show, onHide, problem }) => {
	const { userStore, taskStore, problemStore } = useContext(Context)

	const problemTask = taskStore.tasks.find(task => task.id === problem.taskId)
	const problemUser = userStore.users.find(user => problem.solutionAuthorId === user.id)

	const [description, setDescription] = useState('')
	const [taskId, setTaskId] = useState('')
	const [solutionAuthorId, setSolutionAuthorId] = useState('')
	const [task, setTask] = useState('')
	const [solutionAuthor, setSolutionAuthor] = useState('')

	const updateCurrentProblem = () => {
		console.log('problem', { description, solutionAuthorId, taskId })
		updateProblem(problem.id, { description, solutionAuthorId, taskId }).then(data => {
			console.log('data in updateCurrentProblem', data)
			problemStore.updateProblem(data.id, data)
		})
		setDescription('')
		setTaskId('')
		setSolutionAuthorId('')
		setTask('')
		setSolutionAuthor('')
		onHide()
	}

	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton onHide={onHide}>
				<Modal.Title id="contained-modal-title-vcenter">
					Редактировать проблему
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<div className="d-flex align-items-center justify-content-between">
						<Dropdown className="mt-2">
							<Dropdown.Toggle>{task || "Выберите задачу"}</Dropdown.Toggle>
							<Dropdown.Menu>{taskStore.tasks.map(task =>
								<Dropdown.Item key={task.id}
									onClick={() => {
										setTaskId(task.id)
										setTask(`Код: ${task.code} Наименование: ${task.title}`)
									}}
								>
									{`Код: ${task.code} Наименование: ${task.title}`}
								</Dropdown.Item>
							)}</Dropdown.Menu>
						</Dropdown>
						<span className="me-5">
							{problemTask && `Код: ${problemTask.code} Наименование: ${problemTask.title}`}
						</span>
					</div>
					<div className="d-flex align-items-center justify-content-between">
						<Dropdown className="mt-2">
							<Dropdown.Toggle>
								{solutionAuthor || "Выберите исполнителя"}
							</Dropdown.Toggle>
							<Dropdown.Menu>{userStore.users.map(user =>
								<Dropdown.Item key={user.id}
									onClick={() => {
										setSolutionAuthorId(user.id)
										setSolutionAuthor(`${user.surname} ${user.name} ${user.patronymic}`)
									}}
								>
									{`${user.surname} ${user.name} ${user.patronymic}`}
								</Dropdown.Item>
							)}</Dropdown.Menu>
						</Dropdown>
						<span className="me-5">
							{problemUser && `${problemUser.surname} ${problemUser.name} ${problemUser.patronymic}`}
						</span>
					</div>
					<Form.Group className="mt-2">
						<Form.Label>Описание</Form.Label>
						<Form.Control as="textarea" rows={3}
							placeholder={problem.description}
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-success" onClick={updateCurrentProblem}>Редактировать</Button>
				<Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
			</Modal.Footer>
		</Modal>
	)

})


export default UpdateProblem
