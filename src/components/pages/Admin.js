import React, { useContext, useState } from 'react';
import { Menu, Container, Icon, Header, Grid } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import { auth } from '../../firebase/utils';

import UserContext from '../../context/UserContext';
import AdminNewRecord from '../AdminNewRecord';
import AdminManageRecords from '../AdminManageRecords';

function Admin() {
	const history = useHistory();
	const currentUser = useContext(UserContext);
	const [active, setActive] = useState('');

	return (
		<>
			<Grid container>
				<Grid.Column width={4}>
					<Menu vertical inverted pointing>
						<Menu.Item>
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
							onClick={() => history.push('/')}></Menu.Item>
						<Menu.Item
							active={active === 'add record'}
							link
							name='add a record'
							onClick={() => setActive('add record')}></Menu.Item>
						<Menu.Item
							active={active === 'manage records'}
							link
							name='manage records'
							onClick={() => setActive('manage records')}></Menu.Item>

						<Menu.Item
							active={active === 'sign out'}
							link
							name='sign out '
							onClick={() => auth.signOut()}></Menu.Item>
					</Menu>
				</Grid.Column>

				{active === 'add record' && (
					<Grid.Column width={12}>
						<AdminNewRecord />
					</Grid.Column>
				)}
				{active === 'manage records' && (
					<Grid.Column width={12}>
						<AdminManageRecords />
					</Grid.Column>
				)}
			</Grid>
		</>
	);
}

export default Admin;
