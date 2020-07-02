import React, { useState } from 'react';
import styled from 'styled-components';
import {
	Container,
	Button,
	Checkbox,
	Form,
	Header,
	Segment,
	Message,
} from 'semantic-ui-react';

import { auth, handleUserProfile } from '../../firebase/utils';

const Registration = props => {
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState(false);

	const reset = () => {
		setDisplayName('');
		setEmail('');
		setPassword('');
		setConfirmPassword('');
		setError(false);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError(true);
			return;
		}
		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await handleUserProfile(user, { displayName });

			reset();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<StyledContainer>
			<Segment>
				<Header textAlign='center' as='h1'>
					Register
				</Header>
				<Form error={error} onSubmit={handleSubmit}>
					<Form.Field>
						<label>Full Name</label>
						<input
							required
							placeholder='Full Name'
							name='displayName'
							value={displayName}
							onChange={e => setDisplayName(e.target.value)}
						/>
					</Form.Field>
					<Form.Field>
						<label>Email</label>
						<input
							type='email'
							required
							placeholder='Email'
							name='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</Form.Field>
					<Form.Field>
						<label>Password</label>
						<input
							required
							placeholder='Password'
							type='password'
							name='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</Form.Field>
					<Form.Field>
						<label>Confirm Password</label>
						<input
							required
							placeholder='Confirm Password'
							type='password'
							name='confirmPassword'
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
						/>
						<Message error header='Passwords do not match!' />
					</Form.Field>
					<Form.Field>
						<Checkbox label='I agree to the Terms and Conditions' />
					</Form.Field>
					<Button type='submit'>Submit</Button>
				</Form>
			</Segment>
		</StyledContainer>
	);
};

export default Registration;

const StyledContainer = styled(Container)`
	width: 300px !important;
`;
