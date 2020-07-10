import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

import WithAuth from './hoc/WithAuth';
import WithAdminAuth from './hoc/WithAdminAuth';

import UserContext from './context/UserContext';

import Navbar from './components/Navbar';
import Homepage from './components/pages/Homepage';
import Registration from './components/pages/Registration';
import Login from './components/pages/Login';
import Recovery from './components/pages/Recovery';
import Dashboard from './components/pages/Dashboard';
import Admin from './components/pages/Admin';
import Cart from './components/pages/Cart';

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
		<UserContext.Provider value={currentUser}>
			<Navbar />

			<Route
				path='/'
				exact
				render={routeProps => <Homepage {...routeProps} />}
			/>
			<Route
				path='/register'
				render={routeProps =>
					currentUser ? <Redirect to='/' /> : <Registration {...routeProps} />
				}
			/>
			<Route
				path='/login'
				render={routeProps =>
					currentUser ? <Redirect to='/' /> : <Login {...routeProps} />
				}
			/>
			<Route path='/cart' render={routeProps => <Cart {...routeProps} />} />
			<Route path='/recovery' render={() => <Recovery />} />
			<Route
				path='/dashboard'
				render={routeProps => (
					<WithAuth {...routeProps}>
						<Dashboard />
					</WithAuth>
				)}
			/>
			<Route
				path='/admin'
				render={routeProps => (
					<WithAdminAuth {...routeProps}>
						<Admin />
					</WithAdminAuth>
				)}
			/>
		</UserContext.Provider>
	);
};

export default App;
