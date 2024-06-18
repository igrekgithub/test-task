import React, { useContext, useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { Context } from "../.."
import { updateTask } from "../../http/taskApi"
import { observer } from "mobx-react-lite"



const UpdateTask = observer(({ show, onHide, task }) => {
	const { taskStore } = useContext(Context)
	const [code, setCode] = useState('')
	const [title, setTitle] = useState('')

	const updateCurrentTask = () => {
		console.log('task', { code, title })
		updateTask(task.id, { code, title }).then(data => {
			console.log('data in updateCurrentTask', data)
			taskStore.updateTask(data.id, data)
		}
		)
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
					Редактировать задачу
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Label>Код задачи</Form.Label>
						<Form.Control className="mt-2" placeholder={task.code}
							value={code}
							onChange={e => setCode(e.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mt-3">
						<Form.Label>Название</Form.Label>
						<Form.Control className="mt-2" placeholder={task.title}
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-success" onClick={updateCurrentTask}>Редактировать</Button>
				<Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
			</Modal.Footer>
		</Modal>
	)

})


export default UpdateTask
