import React, { useContext } from "react"
import { Context } from ".."
import { ListGroup } from "react-bootstrap"
import { BsFillTrash3Fill, BsPen } from "react-icons/bs"
import { BsChatRightDots } from "react-icons/bs"
import style from '../styles/list.module.css'
import { observer } from "mobx-react-lite"
import { removeTask } from "../http/taskApi"

const TasksList = observer(({ showUpdateTask }) => {
	const { taskStore } = useContext(Context)

	const deleteTask = (id) => {
		removeTask(id).then(id => taskStore.removeTask(id))
	}

	return (
		<ListGroup>
			{taskStore.tasks.map(task =>
				<ListGroup.Item key={task.id} className={style.list}>
					<div className={style.icon}>
						<BsPen className="me-4" title="редактировать"
							onClick={() => showUpdateTask(task)} />
						<BsFillTrash3Fill title="удалить"
							onClick={() => deleteTask(task.id)}
						/>
					</div>
					<span>Code: {task.code}</span><br />
					<span>Title: {task.title}</span><br />
					<span>Id: {task.id}</span>
				</ListGroup.Item>
			)}
		</ListGroup>
	)
})


export default TasksList
