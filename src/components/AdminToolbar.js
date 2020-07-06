import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

function AdminToolbar() {
	const history = useHistory();

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
