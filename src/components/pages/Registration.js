import React, { Component } from 'react';
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

const initialState = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
	err: false,
};

export class Registration extends Component {
	state = { ...initialState };

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = async e => {
		e.preventDefault();
		const { displayName, email, password, confirmPassword } = this.state;

		if (password !== confirmPassword) {
			this.setState({ err: true });
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			await handleUserProfile(user, { displayName });

			this.setState({ ...initialState });
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { displayName, email, password, confirmPassword, err } = this.state;

		return (
			<StyledContainer>
				<Segment>
					<Header textAlign='center' as='h1'>
						Register
					</Header>
					<Form error={err} onSubmit={this.handleSubmit}>
						<Form.Field>
							<label>Full Name</label>
							<input
								required
								placeholder='Full Name'
								name='displayName'
								value={displayName}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<label>Email</label>
							<input
								required
								placeholder='Email'
								name='email'
								value={email}
								onChange={this.handleChange}
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
								onChange={this.handleChange}
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
								onChange={this.handleChange}
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
	}
}

export default Registration;

const StyledContainer = styled(Container)`
	width: 300px !important;
`;
