import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import {
	Button,
	Form,
	Segment,
	Header,
	Container,
	Icon,
	Divider,
} from 'semantic-ui-react';

import { signInWithGoogle, auth } from '../../firebase/utils';

const Login = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const resetForm = () => {
		setEmail('');
		setPassword('');
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			await auth.signInWithEmailAndPassword(email, password);
			resetForm();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<StyledContainer>
			<Segment textAlign='center'>
				<Header textAlign='center' as='h1'>
					Login
				</Header>
				<Form onSubmit={handleSubmit}>
					<Form.Field>
						<Label>Email</Label>
						<input
							type='email'
							value={email}
							name='email'
							placeholder='Email'
							onChange={e => setEmail(e.target.value)}
						/>
					</Form.Field>
					<Form.Field>
						<Label>Password</Label>
						<input
							type='password'
							value={password}
							name='password'
							placeholder='Password'
							onChange={e => setPassword(e.target.value)}
						/>
					</Form.Field>

					<Button type='submit'>Login</Button>
					<StyledLink to='/recovery'>Reset your password</StyledLink>
					<Divider horizontal>Or</Divider>
					<Button color='google plus' icon onClick={signInWithGoogle}>
						<Icon name='google' /> Sign In With Google
					</Button>
				</Form>
			</Segment>
		</StyledContainer>
	);
};

export default Login;

const StyledContainer = styled(Container)`
	width: 300px !important;
`;

const Label = styled.label`
	text-align: left;
`;

const StyledLink = styled(Link)`
	display: block;
	color: black;
	margin-top: 1rem;
	font-size: 0.9rem;
`;
