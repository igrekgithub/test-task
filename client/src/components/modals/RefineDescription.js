import React, { useContext, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { Context } from "../.."
import { updateProblem } from "../../http/problemApi"
import { observer } from "mobx-react-lite"



const RefineDescription = observer(({ onHide, show, problem }) => {
	const { problemStore } = useContext(Context)

	const [description, setDescription] = useState('')



	const hideModal = () => {
		setDescription('')
		onHide()
	}

	const descriptionSave = () => {
		updateProblem(problemStore.selected.id, { description })
			.then(data => (console.log('Problem from server', data),
				problemStore.updateProblem(data.id, data)))
		console.log('problemStore.selected >>>', problemStore.selected)
		setDescription('')
		onHide()
	}

	return (
		<Modal
			onHide={onHide}
			show={show}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Уточнение описания
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Control placeholder={problemStore.selected.description}
					as="textarea" rows={10}
					value={description}
					onChange={e => setDescription(e.target.value)}
				></Form.Control>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-success" onClick={descriptionSave}>Изменить</Button>
				<Button variant="outline-danger" onClick={hideModal}>Закрыть</Button>
			</Modal.Footer>
		</Modal>
	)

})


export default RefineDescription
