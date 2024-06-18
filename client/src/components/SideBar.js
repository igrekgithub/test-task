import { observer } from "mobx-react-lite";
import React, { useContext } from "react"
import { ListGroup } from "react-bootstrap"
import { CiSquarePlus } from "react-icons/ci";
import { Context } from "..";



const SideBar = observer(({showCreateTask, showCreateProblem, showCreateUser}) => {
	const {barStore} = useContext(Context)

	return (
		<ListGroup>

			<ListGroup.Item onClick={()=> barStore.setSelected('users')}
				active={barStore.selected === 'users'}
				>
				<div className="d-flex justify-content-between align-items-center">
					<span style={{cursor:"pointer"}}>Пользователи</span>
					<CiSquarePlus style={{ cursor: 'pointer' }} className="mt-1"
					onClick={showCreateUser}
					/>
				</div>
			</ListGroup.Item>

			<ListGroup.Item onClick={()=> barStore.setSelected('tasks')}
			active={barStore.selected === 'tasks'}
			>
			<div className="d-flex justify-content-between align-items-center">
				<span style={{cursor:"pointer"}}>Задачи</span>&nbsp;&nbsp;
				<CiSquarePlus style={{ cursor: 'pointer' }}  className="mt-1"
				onClick={showCreateTask}
				/>
				</div>
			</ListGroup.Item >

			<ListGroup.Item onClick={()=> barStore.setSelected('problems')}
			active={barStore.selected === 'problems'}
			>
			<div className="d-flex justify-content-between align-items-center">
				<span style={{cursor:"pointer"}}>Проблемы</span>&nbsp;&nbsp;
				<CiSquarePlus style={{ cursor: 'pointer' }}  className="mt-1"
				onClick={showCreateProblem}
				/>
				</div>
			</ListGroup.Item>
		</ListGroup>
	)
})


export default SideBar
