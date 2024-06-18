import React, { useContext, useEffect } from "react"
import { Context } from ".."
import { ListGroup } from "react-bootstrap"
import { BsFillTrash3Fill, BsPen } from "react-icons/bs"
import { BsChatRightDots } from "react-icons/bs"
import style from '../styles/list.module.css'
import { observer } from "mobx-react-lite"
import { removeUser } from "../http/userApi"


const UsersList = observer(({ showUpdateUser }) => {
	const { userStore } = useContext(Context)
	
	const deleteUser = (id) => {
		removeUser(id).then(id => userStore.removeUser(id))
	}

	return (
		<ListGroup>
			{userStore.users.map(user =>
				<ListGroup.Item key={user.id} className={style.list}>
					<div className={style.icon}>
						<BsPen className="me-4" title="редактировать"
							onClick={() => showUpdateUser(user)} />
						<BsFillTrash3Fill title="удалить"
						onClick={() => deleteUser(user.id)}
						/>
					</div>
					<span>Фамилия: {user.surname}</span><br />
					<span>Имя: {user.name}</span><br />
					<span>Отчество: {user.patronymic}</span><br />
					<span>Роль: {user.role}</span><br />
					<span>Пароль: {user.password}</span><br />
					<span>Id: {user.id}</span>
				</ListGroup.Item>
			)}
		</ListGroup>
	)

})


export default UsersList
