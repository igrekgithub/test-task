import React, { useContext, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { updateUser } from "../../http/userApi"
import { Context } from "../.."
import { observer } from "mobx-react-lite"



const ChangePassword = observer(({ onHide, show }) => {
	const { userStore } = useContext(Context)

	const [password, setPassword] = useState('')

const hideModal = () => {
	setPassword('')
	onHide()
}

	const changePass = () => {
		const oldPassword = userStore.users.find(u => u.id === userStore.user.id)
		console.log('changePass', oldPassword)
		//updateUser(userStore.user.id, { password }).then(data => {
		//	console.log('data ChangePassword ', data)
		//	userStore.updateUser(data.id, data)
		//}
		//)
		setPassword('')
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
					Изменить пароль
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Control placeholder="Введите новый пароль"
					value={password}
					onChange={e => setPassword(e.target.value)}
				></Form.Control>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-success" onClick={changePass}>Изменить</Button>
				<Button variant="outline-danger" onClick={hideModal}>Закрыть</Button>
			</Modal.Footer>
		</Modal>
	)
})
export default ChangePassword