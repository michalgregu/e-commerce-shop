import React, { Component } from 'react';

import styled from 'styled-components';
import {
	Button,
	Form,
	Segment,
	Header,
	Container,
	Icon,
	Checkbox,
	Divider,
} from 'semantic-ui-react';

import { signInWithGoogle, auth } from '../../firebase/utils';

const initialState = {
	email: '',
	password: '',
};

class Login extends Component {
	state = { ...initialState };

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = async e => {
		e.preventDefault();
		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);

			this.setState({ ...initialState });
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { email, password } = this.state;

		return (
			<StyledContainer>
				<Segment textAlign='center'>
					<Header textAlign='center' as='h1'>
						Login
					</Header>
					<Form onSubmit={this.handleSubmit}>
						<Form.Field>
							<Label>Email</Label>
							<input
								value={email}
								name='email'
								placeholder='Email'
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<Label>Password</Label>
							<input
								type='password'
								value={password}
								name='password'
								placeholder='Password'
								onChange={this.handleChange}
							/>
						</Form.Field>

						<Button type='submit'>Login</Button>
						<Divider horizontal>Or</Divider>
						<Button color='google plus' icon onClick={signInWithGoogle}>
							<Icon name='google' /> Sign In With Google
						</Button>
					</Form>
				</Segment>
			</StyledContainer>
		);
	}
}

export default Login;

const StyledContainer = styled(Container)`
	width: 300px !important;
`;

const Label = styled.label`
	text-align: left;
`;
