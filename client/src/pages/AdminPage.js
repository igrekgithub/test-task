import React, { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import SideBar from "../components/SideBar"
import { observer } from "mobx-react-lite"
import { Context } from ".."

import ProblemsList from "../components/ProblemsList"
import TasksList from '../components/TasksList'
import UsersList from '../components/UsersList'

import CreateUser from "../components/modals/CreateUser"
import UpdateUser from '../components/modals/UpdateUser'
import CreateTask from "../components/modals/CreateTask"
import UpdateTask from "../components/modals/UpdateTask"
import CreateProblem from '../components/modals/CreateProblem'
import UpdateProblem from "../components/modals/UpdateProblem"
import { fetchTasks } from "../http/taskApi"
import { fetchUsers } from "../http/userApi"
import {fetchProblems} from '../http/problemApi'

const AdminPage = observer(() => {
		const { barStore, taskStore, userStore, problemStore } = useContext(Context)
		const [userCreateVisible, setUserCreateVisible] = useState(false)
		const [userUpdateVisible, setUserUpdateVisible] = useState(false)
		const [taskCreateVisible, setTaskCreateVisible] = useState(false)
		const [taskUpdateVisible, setTaskUpdateVisible] = useState(false)
		const [problemCreateVisible, setProblemCreateVisible] = useState(false)
		const [problemUpdateVisible, setProblemUpdateVisible] = useState(false)

		const [user, setUser] = useState({})
		const [task, setTask] = useState({})
		const [problem, setProblem] = useState({})

		useEffect(() => {
			fetchTasks().then(data => taskStore.fetchTasks(data))
			fetchUsers().then(data => userStore.fetchUsers(data))
			fetchProblems().then(data => problemStore.fetchProblems(data))
		}, [])


		const showCreateUser = () => { setUserCreateVisible(true) }
		const showCreateTask = () => { setTaskCreateVisible(true) }
		const showCreateProblem = () => { setProblemCreateVisible(true) }

		const showUpdateUser = (user) => {
			setUser(user)
			setUserUpdateVisible(true)
		}

		const showUpdateTask = (task) => {
			setTask(task)
			setTaskUpdateVisible(true)
		}

		const showUpdateProblem = (problem) => {
			setProblem(problem)
			setProblemUpdateVisible(true)
		}

		return (

			<Container className="">
				<Row className="mt-3">
					<Col md={3}>
						<SideBar
							showCreateTask={showCreateTask}
							showCreateProblem={showCreateProblem}
							showCreateUser={showCreateUser} />
					</Col>
					<Col md={9}>
						{(barStore.selected === 'users') && 
						 <UsersList showUpdateUser={showUpdateUser} />}
						{(barStore.selected === 'tasks') &&
						 <TasksList showUpdateTask={showUpdateTask} />}
						{(barStore.selected === 'problems') &&
						 <ProblemsList showUpdateProblem={showUpdateProblem} />}
					</Col>
				</Row>
				<CreateUser show={userCreateVisible} onHide={() => setUserCreateVisible(false)} />
				<CreateTask show={taskCreateVisible} onHide={() => setTaskCreateVisible(false)} />
				<CreateProblem show={problemCreateVisible} onHide={() => setProblemCreateVisible(false)} />
				<UpdateUser show={userUpdateVisible} onHide={() => setUserUpdateVisible(false)}
					user={user} />
				<UpdateTask show={taskUpdateVisible} onHide={() => setTaskUpdateVisible(false)}
					task={task} />
				<UpdateProblem show={problemUpdateVisible} onHide={() => setProblemUpdateVisible(false)}
					problem={problem} />
			</Container>
		)
	})


export default AdminPage
