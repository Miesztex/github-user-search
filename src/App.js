import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// xyz = Object.values(xyz) - object into array
// Promise.allSettled([promise1, promise2])
// Auth0: logitWithRedirect, logout, error, isLoading
// isAuthenticated && user = isUser
// AuthWrapper
// PrivateRoute

function App() {
	return (
		// isLoading?
		<AuthWrapper>
			<Router>
				<Switch>
					{/* ------------------- */}
					<PrivateRoute path='/' exact>
						<Dashboard></Dashboard>
					</PrivateRoute>
					{/* ----------------- */}
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='*'>
						<Error />
					</Route>
				</Switch>
			</Router>
		</AuthWrapper>
	);
}

export default App;
