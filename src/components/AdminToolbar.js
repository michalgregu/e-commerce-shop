import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import UserContext from '../context/UserContext';
import { checkUserIsAdmin } from '../utils';

function AdminToolbar() {
	const history = useHistory();
	const currentUser = useContext(UserContext);

	const isAdmin = checkUserIsAdmin(currentUser);
	if (!isAdmin) return null;

	return (
		<Dropdown item icon='wrench' text='Admin'>
			<Dropdown.Menu>
				<Dropdown.Item onClick={() => history.push('/admin')}>
					Admin
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default AdminToolbar;
