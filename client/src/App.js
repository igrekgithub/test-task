import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check } from './http/userApi';
import { Spinner } from 'react-bootstrap';

const App = observer(() => {
	const { userStore } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			check().then(data => {
				//console.log('dataAppUseEffect', data)
				userStore.setUser(data)
				userStore.setIsAuth(true)
			}).finally(() => setLoading(false))
		}, 300);
	}, [])

	if (loading) {
		return (
			<div style={{
				height: '100vh', width: '100vw', display: 'flex',
				justifyContent: 'center', alignItems: 'center'
			}}>
				<Spinner style={{ width: '200px', height: '200px' }} animation="border" variant="info" />
			</div>
		)
	}

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
		</BrowserRouter>
	);
})

export default App;
