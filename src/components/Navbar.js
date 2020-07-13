import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Menu, Label } from 'semantic-ui-react';
import { auth } from './../firebase/utils';

import AdminToolbar from './AdminToolbar';
import UserContext from '../context/UserContext';
import CartContext from '../context/CartContext';

const Navbar = () => {
	const currentUser = useContext(UserContext);
	const [cart, setCart] = useContext(CartContext);
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
				<Menu.Item link onClick={() => history.push('/cart')}>
					My Cart
					{cart.length === 0 ? null : (
						<StyledLabel color='teal' floating>
							{cart.length}
						</StyledLabel>
					)}
				</Menu.Item>
			</Menu.Menu>
		</StyledMenu>
	);
};

export default Navbar;

const StyledMenu = styled(Menu)`
	padding: 0 300px;
`;

const StyledLabel = styled(Label)`
	transform: translateY(100%);
`;
