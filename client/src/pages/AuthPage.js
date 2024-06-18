import React, { useContext, useState } from "react"
import { Button, Card, Container, Form } from "react-bootstrap"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/routesConsts"
import { registration } from "../http/userApi"
import { login } from "../http/userApi"
import { Context } from ".."
import { observer } from "mobx-react-lite"



const AuthPage = observer(() => {
	const { userStore } = useContext(Context)
	const location = useLocation()
	const navigate = useNavigate()
	const isLogin = location.pathname === LOGIN_ROUTE

	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [patronymic, setPatronymic] = useState('')
	const [password, setPassword] = useState('')

	const click = async () => {
		try {
			let data
			if (!isLogin) {
				data = await registration(name, surname, patronymic, password)
				console.log('data REGISTRATION', data)
			} else {
				data = await login(name, surname, patronymic, password)
				console.log('data LOGIN', data)
				userStore.setUser(data)
				userStore.setIsAuth(true)
				userStore.setIsAdmin(userStore.user.role === "admin")
				navigate(HOME_ROUTE)
			}
		} catch (error) {
			alert(error.response.data.message)
		}
	}

	return (


		<Container className="d-flex justify-content-center align-items-center"
			style={{ height: window.innerHeight - 54.45 }}
		>
			<Card style={{ width: 480 }} className="p-5">
				<h3>{isLogin ? "Авторизация" : "Регистрация"}</h3>
				<Form className="d-flex flex-column" >
					<Form.Control className="mt-2" placeholder="Фамилия"
						value={surname}
						onChange={e => setSurname(e.target.value)}
					/>
					<Form.Control className="mt-2" placeholder="Имя"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<Form.Control className="mt-2" placeholder="Отчество"
						value={patronymic}
						onChange={e => setPatronymic(e.target.value)}
					/>
					<Form.Control className="mt-2" placeholder="Пароль"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<div className="d-flex justify-content-between align-items-center">
						{isLogin ?
							<div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>
								Зарегистрируйся!</NavLink>
							</div>
							:
							<div>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>
								Авторизуйся!</NavLink>
							</div>
						}

						<Button variant="outline-success"
							className="mt-3 align-self-end mb-3"
							onClick={click}
						>{isLogin ? "Войти" : "Регистрация"}
						</Button>

					</div>
				</Form>
			</Card>
		</Container>
	)

})


export default AuthPage
