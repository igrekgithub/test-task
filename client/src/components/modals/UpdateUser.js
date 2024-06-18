import React, { useContext, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { Context } from "../.."
import { updateUser } from "../../http/userApi"
import { observer } from "mobx-react-lite"



const UpdateUser = observer(({ show, onHide, user }) => {
	const { userStore } = useContext(Context)
	const [surname, setSurname] = useState('')
	const [name, setName] = useState('')
	const [patronymic, setPatronymic] = useState('')
	const [role, setRole] = useState('')
	

	const updateCurrentUser = () => {
		updateUser(user.id, { name, surname, patronymic, role })
			.then(data => (
				userStore.updateUser(data.id, data)
			))
		setName('')
		setSurname('')
		setPatronymic('')
		setRole('')
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
					Редактировать данные пользователя
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control className="mt-2" placeholder={user.surname}
						value={surname}
						onChange={e => setSurname(e.target.value)}
					/>
					<Form.Control className="mt-2" placeholder={user.name}
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<Form.Control className="mt-2" placeholder={user.patronymic}
						value={patronymic}
						onChange={e => setPatronymic(e.target.value)}
					/>
					<Form.Control className="mt-2" placeholder={user.role}
						value={role}
						onChange={e => setRole(e.target.value)}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-success" onClick={updateCurrentUser}>Редактировать</Button>
				<Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
			</Modal.Footer>
		</Modal>
	)

})


export default UpdateUser
