import React, { useContext } from "react"
import { Context } from ".."
import { Container, Navbar, Nav, Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { ADMIN_ROUTE, CABINET_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from "../utils/routesConsts"
import { observer } from 'mobx-react-lite'
import { useNavigate } from "react-router-dom"


const NavBar = observer(() => {
	const { userStore } = useContext(Context)
	const navigate = useNavigate()

	const clickAuthorization = () => {
		navigate(LOGIN_ROUTE)
	}

	const clickLogout = () => {
		navigate(HOME_ROUTE)
		userStore.setIsAuth(false)
		userStore.setUser({})
	} 

	return (
		<Navbar bg="dark" data-bs-theme="dark">
			<Container>
				<NavLink style={{ color: "white", fontSize: "28px", fontStyle: 'italic', fontWeight: 'bold'}}
				 to={HOME_ROUTE}>Brain Community</NavLink>
				{userStore.isAuth ?
					<Nav className="ml-auto" style={{ color: "white" }}>
						{userStore.isAdmin ?
							<>
								<Button className="me-2" variant="outline-light"
									onClick={() => navigate(ADMIN_ROUTE)}
								>Админ Панель</Button>
								<Button className="me-2" variant="outline-light"
									onClick={() => navigate(CABINET_ROUTE)}
								>Кабинет</Button>
							</>
							:
							<>
								<Button className="me-2" variant="outline-light"
									onClick={() => navigate(ADMIN_ROUTE)}
								>Админ Панель</Button>
								<Button className="me-2" variant="outline-light"
									onClick={() => navigate(CABINET_ROUTE)}
								>Кабинет</Button>
							</>
						}
						<Button variant="outline-light"
							onClick={clickLogout}
						>Выйти</Button>
					</Nav>
					:
					<Nav className="ml-auto" style={{ color: "white" }}>
						<Button variant="outline-light"
							onClick={clickAuthorization}
						>Авторизация</Button>
					</Nav>
				}
			</Container>
		</Navbar>
	)
})


export default NavBar
