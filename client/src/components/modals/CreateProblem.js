import React, { useContext, useState } from "react"
import { Button, Dropdown, Form, Modal } from "react-bootstrap"
import { Context } from '../../index'
import { createProblem } from "../../http/problemApi"
import { observer } from "mobx-react-lite"



const CreateProblem = observer(({ show, onHide }) => {
	const { userStore, taskStore, problemStore } = useContext(Context)
	const [description, setDescription] = useState('')
	const [taskId, setTaskId] = useState('')
	const [solutionAuthorId, setSolutionAuthorId] = useState('')
	const [task, setTask] = useState('')
	const [solutionAuthor, setSolutionAuthor] = useState('')
	

	const hideModal = () => {
		setDescription('')
		setTaskId('')
		setSolutionAuthorId('')
		setTask('')
		setSolutionAuthor('')
		onHide()
	}

	const createNewProblem = () => {
		const problem = {
			creationDate: new Date().toLocaleString(),
			solutionDate: '',
			description: description,
			solution: '',
			requestAuthorId: userStore.user.id,
			solutionAuthorId: solutionAuthorId,
			taskId: taskId,
			status: false,
		}
		createProblem(problem).then(data => problemStore.addProblem(data))
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
			onHide={hideModal}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton onHide={hideModal}>
				<Modal.Title id="contained-modal-title-vcenter">
					Создать проблему
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
										setTask(`${task.code} ${task.title}`)
									}}
								>
									{`${task.code} ${task.title}`}
								</Dropdown.Item>
							)}</Dropdown.Menu>
						</Dropdown>
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
					</div>
					<Form.Group className="mt-2">
						<Form.Label>Описание</Form.Label>
						<Form.Control as="textarea" rows={3}
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-success" onClick={createNewProblem}>Создать</Button>
				<Button variant="outline-danger" onClick={hideModal}>Закрыть</Button>
			</Modal.Footer>
		</Modal>
	)

})


export default CreateProblem
