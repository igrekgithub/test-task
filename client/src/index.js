import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import '../src/styles/App.css'
import App from './App'
import UserStore from './store/UserStore'
import TaskStore from './store/TaskStore'
import ProblemStore from './store/ProblemStore'
import BarStore from './store/BarStore'


export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Context.Provider value={{
			userStore: new UserStore(),
			taskStore: new TaskStore(),
			problemStore: new ProblemStore(),
			barStore: new BarStore()
		}}>
			<div>
				<App />
			</div>
		</Context.Provider>
	</React.StrictMode>
)

