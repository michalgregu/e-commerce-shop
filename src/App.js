import React, { Component, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

import Navbar from './components/Navbar';
import Homepage from './components/pages/Homepage';
import Registration from './components/pages/Registration';
import Login from './components/pages/Login';
import Recovery from './components/pages/Recovery';

class App extends Component {
	const [currentUser,setCurrentUser] = useState(null)
	
	state = { currentUser: null };

	authListener = null;

	componentDidMount() {
		this.authListener = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await handleUserProfile(userAuth);
				userRef.onSnapshot(snapshot => {
					this.setState({
						currentUser: {
							id: snapshot.id,
							...snapshot.data(),
						},
					});
				});
			}

			this.setState({ currentUser: null });
		});
	}

	componentWillUnmount() {
		this.authListener();
	}

	render() {
		const { currentUser } = this.state;

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
			</>
		);
	}
}

export default App;
