import React from 'react';
import { Menu, Input } from 'semantic-ui-react';

function Navbar() {
	return (
		<Menu size='huge'>
			<Menu.Item header>Michcio Vinyl Shop</Menu.Item>

			<Menu.Menu position='right'>
				<Menu.Item
					name='Login'
					link
					// active={activeItem === 'jobs'}
					// onClick={this.handleItemClick}
				/>
				<Menu.Item
					name='My Cart'
					link
					// active={activeItem === 'locations'}
					// onClick={this.handleItemClick}
				/>
			</Menu.Menu>
		</Menu>
	);
}

export default Navbar;
