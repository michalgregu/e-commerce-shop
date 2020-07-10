import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { auth } from './../firebase/utils';

import AdminToolbar from './AdminToolbar';
import UserContext from '../context/UserContext';

const Navbar = () => {
	const currentUser = useContext(UserContext);
	const history = useHistory();

	return (
		<StyledMenu size='huge'>
			<Menu.Item header link onClick={() => history.push('/')}>
				Michcio Vinyl Shop
			</Menu.Item>

			<AdminToolbar />

			<Menu.Menu position='right'>
				{currentUser && (
					<>
						<Menu.Item
							name='My Account'
							link
							onClick={() => history.push('/dashboard')}
						/>
						<Menu.Item name='Logout' link onClick={() => auth.signOut()} />
					</>
				)}

				{!currentUser && (
					<>
						<Menu.Item
							name='Register'
							link
							onClick={() => history.push('/register')}
						/>
						<Menu.Item
							name='Login'
							link
							onClick={() => history.push('/login')}
						/>
					</>
				)}
				<Menu.Item name='My Cart' link onClick={() => history.push('/cart')} />
			</Menu.Menu>
		</StyledMenu>
	);
};

export default Navbar;

const StyledMenu = styled(Menu)`
	padding: 0 300px;
`;
