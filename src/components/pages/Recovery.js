import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import {
	Button,
	Form,
	Header,
	Container,
	Segment,
	Message,
} from 'semantic-ui-react';

import { auth } from '../../firebase/utils';

const Recovery = props => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const config = {
				url: 'http://localhost:3000/login',
			};

			await auth
				.sendPasswordResetEmail(email, config)
				.then(() => {
					props.history.push('/login');
				})
				.catch(() => {
					setError(true);
				});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<StyledContainer>
			<Segment>
				<Form error={error} onSubmit={handleSubmit}>
					<Header as='h1'>Recover password</Header>
					<Form.Field>
						<label>Email</label>
						<input
							type='email'
							value={email}
							name='email'
							placeholder='Enter Your Email'
							onChange={e => setEmail(e.target.value)}
						/>
						<Message
							error
							header='Email not found'
							content='Please try again'
						/>
					</Form.Field>
					<Button type='submit'>Recover Password</Button>
				</Form>
			</Segment>
		</StyledContainer>
	);
};

export default withRouter(Recovery);

const StyledContainer = styled(Container)`
	width: 300px !important;
`;
