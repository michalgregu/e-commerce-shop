import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { auth } from './../firebase/utils';

function Navbar(props) {
	const { currentUser } = props;

	const history = useHistory();

	function goHome() {
		history.push('/');
	}

	function goLogin() {
		history.push('/login');
	}

	function goRegister() {
		history.push('/register');
	}

	return (
		<StyledMenu size='huge'>
			<Menu.Item header link onClick={goHome}>
				Michcio Vinyl Shop
			</Menu.Item>

			<Menu.Menu position='right'>
				{currentUser && (
					<Menu.Item name='Logout' link onClick={() => auth.signOut()} />
				)}

				{!currentUser && (
					<>
						<Menu.Item name='Register' link onClick={goRegister} />
						<Menu.Item name='Login' link onClick={goLogin} />
					</>
				)}
				<Menu.Item name='My Cart' link />
			</Menu.Menu>
		</StyledMenu>
	);
}

Navbar.defaultProps = {
	currentUser: null,
};

export default Navbar;

const StyledMenu = styled(Menu)`
	padding: 0 300px;
`;
