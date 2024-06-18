import React, { useContext, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { Context } from "../.."
import { createTask } from "../../http/taskApi"
import { observer } from "mobx-react-lite"



const CreateTask = observer(({ show, onHide }) => {
	const { taskStore } = useContext(Context)
	const [code, setCode] = useState('')
	const [title, setTitle] = useState('')

	const createNewTask = () => {
		console.log('task', { code, title })
		createTask({ code, title }).then(data => taskStore.addTask(data))
		setCode('')
		setTitle('')
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
					Создать задачу
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					
						<Form.Control className="mt-2" placeholder={"Код задачи"}
							value={code}
							onChange={e => setCode(e.target.value)}
						/>
						<Form.Control className="mt-2" placeholder={"Название задачи"}
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
					
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-success" onClick={createNewTask}>Создать</Button>
				<Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default CreateTask
