import React, { useContext } from 'react';
import {
	Container,
	Button,
	Icon,
	Table,
	Segment,
	Header,
	Divider,
	Image,
} from 'semantic-ui-react';
import styled from 'styled-components';

import CartContext from '../../context/CartContext';

const Cart = () => {
	const [cart, setCart] = useContext(CartContext);

	const subTotal =
		cart.length < 1
			? 0
			: cart
					.map(item => parseFloat(item.price))
					.reduce((acc, value) => acc + value);

	return (
		<StyledContainer>
			<StyledSegment>
				<Header as='h1' textAlign='center'>
					Shopping Basket
				</Header>
				<Divider hidden />
				<Table basic='very' padded>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell></Table.HeaderCell>
							<Table.HeaderCell>Title</Table.HeaderCell>
							<Table.HeaderCell>Format</Table.HeaderCell>
							<Table.HeaderCell>Price</Table.HeaderCell>
							<Table.HeaderCell>Delete</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{cart.map(item => (
							<Table.Row>
								<Table.Cell>
									<Image size='tiny' src={item.imageUrl} />
								</Table.Cell>
								<Table.Cell>{`${item.title} by ${item.artist}`}</Table.Cell>
								<Table.Cell>{item.format}</Table.Cell>
								<Table.Cell>{`£ ${item.price}`}</Table.Cell>
								<Table.Cell>
									<Icon name='delete' />
								</Table.Cell>
							</Table.Row>
						))}

						<Table.Row>
							<Table.Cell></Table.Cell>
							<Table.Cell></Table.Cell>
							<Table.Cell textAlign='right'>Sub Total:</Table.Cell>

							<Table.Cell>{`£ ${subTotal}`}</Table.Cell>
						</Table.Row>
					</Table.Body>

					<Table.Footer fullWidth>
						<Table.Row>
							<Table.HeaderCell colSpan='4'>
								<Button
									floated='right'
									icon
									labelPosition='left'
									primary
									size='small'>
									<Icon name='user' /> Add User
								</Button>
								<Button size='small'>Clear All</Button>
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</Table>
			</StyledSegment>
		</StyledContainer>
	);
};

export default Cart;

const StyledContainer = styled(Container)`
	margin-top: 50px;
`;

const StyledSegment = styled(Segment)`
	padding: 100px !important;
`;
