import React, { useContext, useState } from 'react';
import { Menu, Container, Icon, Header, Grid } from 'semantic-ui-react';
import styled from 'styled-components';

import { auth } from '../../firebase/utils';

import UserContext from '../../context/UserContext';
import NewProductForm from '../NewProductForm';

function Admin() {
	const currentUser = useContext(UserContext);
	const [active, setActive] = useState('');

	return (
		<>
			<Grid container>
				<Grid.Column width={4}>
					<Menu vertical inverted pointing>
						<Menu.Item active={active === 'inbox'} name='inbox'>
							<Container textAlign='center'>
								<Icon name='user circle outline' size='huge' />
								<Header as='h3' inverted>
									{currentUser && currentUser.displayName}
								</Header>
							</Container>
						</Menu.Item>

						<Menu.Item
							active={active === 'home'}
							link
							name='home'
							onClick={() => setActive('home')}></Menu.Item>
						<Menu.Item
							active={active === 'add product'}
							link
							name='add product'
							onClick={() => setActive('add product')}></Menu.Item>

						<Menu.Item
							active={active === 'sign out'}
							link
							name='sign out '
							onClick={() => auth.signOut()}></Menu.Item>
					</Menu>
				</Grid.Column>
				<Grid.Column width={12}>
					{active === 'add product' && <NewProductForm />}
				</Grid.Column>
			</Grid>
		</>
	);
}

export default Admin;
