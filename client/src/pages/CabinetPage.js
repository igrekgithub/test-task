import React, { useContext, useEffect, useState } from "react"
import style from '../styles/cabinet.module.css'
import { Context } from ".."
import { InputGroup, ListGroup, Form, Button, Container } from "react-bootstrap"
import { BsPen } from "react-icons/bs"
import { BsChatRightDots } from "react-icons/bs"
import { fetchTasks } from "../http/taskApi"
import { fetchUsers } from "../http/userApi"
import { fetchProblems } from "../http/problemApi"
import { useNavigate } from "react-router-dom"
import ChangePassword from "../components/modals/ChangePassword"
import RefineDescription from "../components/modals/RefineDescription"
import CreateProblem from "../components/modals/CreateProblem"
import CreateTask from "../components/modals/CreateTask"
import { observer } from "mobx-react-lite"

const CabinetPage = observer(() => {
	const { userStore, taskStore, problemStore } = useContext(Context)
	const [variant, setVariant] = useState('Все')
	const [search, setSearch] = useState('')
	const [filteredProblems, setFilteredProblems] = useState([])
	const [passwordChangeVisible, setPasswordChangeVisible] = useState(false)
	const [taskCreateVisible, setTaskCreateVisible] = useState(false)
	const [problemCreateVisible, setProblemCreateVisible] = useState(false)
	const [descriptionRefineVisible, setDescriptionRefineVisible] = useState(false)
	const [problem, setProblem] = useState({})
	const navigate = useNavigate()

	const handleSearch = (variant, search) => {
		let data = problemStore.problems
		if (variant === 'Свои') { data = data.filter(problem => problem.id === userStore.user.id) }
		if (variant === 'В работе') { data = data.filter(problem => problem.status === false) }
		if (variant === 'Завершённые') { data = data.filter(problem => problem.status === true) }
		if (variant === 'Без исполнителя') { data = data.filter(problem => problem.solutionAuthorId === '') }
		if (search) {
			data = data.filter(problem => problem.description.toLowerCase()
				.includes(search.toLowerCase())
			)
		}
		setFilteredProblems(data)
	}

	useEffect(() => {
		fetchTasks().then(data => taskStore.fetchTasks(data))
		fetchUsers().then(data => userStore.fetchUsers(data))
		fetchProblems().then(data => {
			problemStore.fetchProblems(data)
			setFilteredProblems(data)
		})
	}, [])

	useEffect(()=> {
		let data = problemStore.problems
		setFilteredProblems(data)
	},[problemStore.problems])

	useEffect(() => {
		handleSearch(variant, search)
	}, [search, variant])

	const details = (problem) => {
		problemStore.setSelected(problem)
		navigate('/problem')
	}

	const showRefineDescription = (problem) => {
		problemStore.setSelected(problem)
		setProblem(problem)
		setDescriptionRefineVisible(true)
	}

	const infoTask = (arr, id) => {
		arr = arr.find(task => task.id === id)
		return arr && `Код: ${arr.code} Наименование: ${arr.title}`
	}
	const infoUser = (arr, id) => {
		arr = arr.find(user => user.id === id)
		return arr && `${arr.surname} ${arr.name} ${arr.patronymic}`
	}

	return (
		<Container className={style.cabinet}>
			<div className={style.header}>
				<h3>Личный кабинет</h3>
				<div style={{ display: 'flex', position: "relative" }}>
					<div style={{ width: '600px' }}>
						<h5>Фамилия: {userStore.user.surname}</h5>
						<h5>Имя: {userStore.user.name}</h5>
						<h5>Отчество: {userStore.user.patronymic}</h5>
					</div>
					<div style={{ width: '600px' }}>
						<h5>Роль: {userStore.user.role}</h5>
						<h5>Авторизован: {userStore.isAuth ? 'Да' : 'Нет'}</h5>
						<h5>Администратор: {userStore.isAdmin ? 'Да' : 'Нет'}</h5>
					</div>
				</div>
			</div>
			<Button variant="outline-success" className="mb-2"
				onClick={() => setTaskCreateVisible(true)}
			>Создать задачу</Button>
			<Button variant="outline-success" className="mb-2 ms-2"
				onClick={() => setProblemCreateVisible(true)}
			>Создать проблему</Button>
			<Button variant="outline-success" className="mb-2 ms-2"
				onClick={() => setPasswordChangeVisible(true)}
			>Изменить пароль</Button>
			<div>
				<InputGroup className="mb-1">
					<InputGroup.Text id="basic-addon1">Описание</InputGroup.Text>
					<Form.Control
						type="search"
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder="Введите текст для поиска"
						aria-label="Username"
						aria-describedby="basic-addon1"
					/>
				</InputGroup>

				<Form.Select className="mb-1"
					onClick={e => setVariant(e.target.value)}
				>
					<option>Выберите вид проблемы</option>
					<option value="Все">Все</option>
					<option value="Свои">Свои</option>
					<option value="В работе">В работе</option>
					<option value="Завершённые">Завершённые</option>
					<option value="Без исполнителя">Без исполнителя</option>
				</Form.Select>
			</div>
			<ListGroup className="mb-2">
				{filteredProblems.map(problem =>
					<ListGroup.Item key={problem.id} className={style.list}>
						<div className={style.icon}>
							<BsChatRightDots className="me-5" title="детализация"
								onClick={() => details(problem)}
							/>
							<BsPen className="me-4" title="редактировать"
								onClick={() => showRefineDescription(problem)} />
						</div>
						<span>Дата создания: {problem.creationDate}</span><br />
						<span>Дата решения: {problem.solutionDate}</span><br />
						<span>Описание: {problem.description}</span><br />
						<span>Решение: {problem.solution}</span><br />
						<span>Автор заявки: {infoUser(userStore.users, problem.requestAuthorId)}</span><br />
						<span>Автор решения: {infoUser(userStore.users, problem.solutionAuthorId)}</span><br />
						<span>Задача: {infoTask(taskStore.tasks, problem.taskId)}</span><br />
						<span>Статус: {problem.status ? 'завершено' : 'в работе'} </span><br />
						<span>Id: {problem.id}</span>
					</ListGroup.Item>
				)}
			</ListGroup>
			<ChangePassword show={passwordChangeVisible} onHide={() => setPasswordChangeVisible(false)} />
			<RefineDescription show={descriptionRefineVisible} onHide={() => setDescriptionRefineVisible(false)} problem={problem}/>
			<CreateProblem show={problemCreateVisible} onHide={() => setProblemCreateVisible(false)} />
			<CreateTask show={taskCreateVisible} onHide={() => setTaskCreateVisible(false)} />
		</Container>
	)
})


export default CabinetPage
