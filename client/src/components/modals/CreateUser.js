import React, { useContext, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { Context } from "../.."
import { registration } from "../../http/userApi"
import { observer } from "mobx-react-lite"



const CreateUser = observer(({ show, onHide }) => {
	const { userStore } = useContext(Context)
	const [surname, setSurname] = useState('')
	const [name, setName] = useState('')
	const [patronymic, setPatronymic] = useState('')
	const [role, setRole] = useState('user')
	const [password, setPassword] = useState('')

	const createNewUser = () => {
		registration(name, surname, patronymic, password, role)
			.then(data => (
				userStore.addUser(data)
			))
		setName('')
		setSurname('')
		setPatronymic('')
		setRole('')
		setPassword('')
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
					Добавить пользователя
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control className="mt-2" placeholder={"Фамилия"}
						value={surname}
						onChange={e => setSurname(e.target.value)}
					/>
					<Form.Control className="mt-2" placeholder={"Имя"}
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<Form.Control className="mt-2" placeholder={"Отчество"}
						value={patronymic}
						onChange={e => setPatronymic(e.target.value)}
					/>
					<Form.Control className="mt-2" placeholder={"Пароль"}
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<Form.Control className="mt-2" placeholder={"Роль"}
						value={role}
						onChange={e => setRole(e.target.value)}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-success" onClick={createNewUser}>Добавить</Button>
				<Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
			</Modal.Footer>
		</Modal>
	)
})

export default CreateUser
