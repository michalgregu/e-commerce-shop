import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

import WithAuth from './hoc/WithAuth';

import Navbar from './components/Navbar';
import Homepage from './components/pages/Homepage';
import Registration from './components/pages/Registration';
import Login from './components/pages/Login';
import Recovery from './components/pages/Recovery';
import Dashboard from './components/pages/Dashboard';

const App = props => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const authListener = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot(snapshot => {
					setCurrentUser({
						id: snapshot.id,
						...snapshot.data(),
					});
				});
			}

			setCurrentUser(null);
		});

		return () => {
			authListener();
		};
	}, []);

	return (
		<>
			<Navbar currentUser={currentUser} />
			<Route
				path='/'
				exact
				render={routeProps => (
					<Homepage {...routeProps} currentUser={currentUser} />
				)}
			/>
			<Route
				path='/register'
				render={routeProps =>
					currentUser ? (
						<Redirect to='/' />
					) : (
						<Registration {...routeProps} currentUser={currentUser} />
					)
				}
			/>
			<Route
				path='/login'
				render={routeProps =>
					currentUser ? (
						<Redirect to='/' />
					) : (
						<Login {...routeProps} currentUser={currentUser} />
					)
				}
			/>
			<Route path='/recovery' render={() => <Recovery />} />
			<Route
				path='/dashboard'
				render={routeProps => (
					<WithAuth {...routeProps} currentUser={currentUser}>
						<Dashboard />
					</WithAuth>
				)}
			/>
		</>
	);
};

export default App;
