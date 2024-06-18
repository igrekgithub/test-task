import React, { useContext } from "react"
import { Routes, Route } from 'react-router-dom'
import { authRoutes, publicRoutes } from "../routes"
import Error from "../pages/ErrorPage"
import { Context } from ".."



const AppRouter = () => {
	const { userStore } = useContext(Context)

	return (
		<Routes>
			{userStore.isAdmin && authRoutes.map(({ path, Element }) =>
				<Route key={path} path={path} element={Element} exact />
			)}
			{userStore.isAuth && authRoutes.map(({ path, Element }) =>
				<Route key={path} path={path} element={Element} exact />
			)}
			{publicRoutes.map(({ path, Element }) =>
				<Route key={path} path={path} element={Element} exact />
			)}
			<Route path="*" element={<Error />} />
		</Routes>
	)
}


export default AppRouter
