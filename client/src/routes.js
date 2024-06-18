import AdminPage from "./pages/AdminPage"
import AuthPage from "./pages/AuthPage"
import CabinetPage from "./pages/CabinetPage"
import ProblemPage from "./pages/ProblemPage"
import HomePage from "./pages/HomePage"
import {
	ADMIN_ROUTE,
	CABINET_ROUTE,
	HOME_ROUTE,
	LOGIN_ROUTE,
	PROBLEM_ROUTE,
	REGISTRATION_ROUTE
} from "./utils/routesConsts"


export const adminRoutes = [
	{ path: ADMIN_ROUTE, Element: <AdminPage /> },
	{ path: CABINET_ROUTE, Element: <CabinetPage /> },
]

export const authRoutes = [
	{ path: ADMIN_ROUTE, Element: <AdminPage /> }, // убрать
	{ path: CABINET_ROUTE, Element: <CabinetPage /> },
]

export const publicRoutes = [
	{ path: PROBLEM_ROUTE, Element: <ProblemPage /> },
	{ path: HOME_ROUTE, Element: <HomePage /> },
	{ path: LOGIN_ROUTE, Element: <AuthPage /> },
	{ path: REGISTRATION_ROUTE, Element: <AuthPage /> },
]