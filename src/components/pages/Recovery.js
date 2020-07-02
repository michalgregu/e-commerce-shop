import React, { Component } from 'react';
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

const initialState = {
	email: '',
	error: false,
};

export class Recovery extends Component {
	state = { ...initialState };

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = async e => {
		e.preventDefault();

		try {
			const { email } = this.state;

			const config = {
				url: 'http://localhost:3000/login',
			};

			await auth
				.sendPasswordResetEmail(email, config)
				.then(() => {
					this.props.history.push('/login');
				})
				.catch(() => {
					this.setState({ error: true });
				});
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		const { email, error } = this.state;

		return (
			<StyledContainer>
				<Segment>
					<Form error={error} onSubmit={this.handleSubmit}>
						<Header as='h1'>Recover password</Header>
						<Form.Field>
							<label>Email</label>
							<input
								type='email'
								value={email}
								name='email'
								placeholder='Enter Your Email'
								onChange={this.handleChange}
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
	}
}

export default withRouter(Recovery);

const StyledContainer = styled(Container)`
	width: 300px !important;
`;
