import React, { useState } from 'react';
import { Form, Segment, Header } from 'semantic-ui-react';
import { auth } from '../firebase/utils';

import { addRecord } from '../utils';

function AdminNewRecord() {
	const optionsFormat = [
		{ key: '7 inch', text: '7 inch', value: '7 inch' },
		{ key: '12 inch', text: '12 inch', value: '12 inch' },
		{ key: 'LP', text: 'LP', value: 'LP' },
	];

	const optionsGenre = [
		{ key: 'Reggae', text: 'Reggae', value: 'Reggae' },
		{ key: 'Soul/Funk', text: 'Soul/Funk', value: 'Soul/Funk' },
	];

	const [state, setState] = useState({
		artist: '',
		title: '',
		imageUrl: '',
		audioUrl: '',
		format: '',
		genre: '',
		price: '',
		stock: '',
	});

	const handleSubmit = e => {
		const timestamp = new Date();

		e.preventDefault();

		addRecord({
			...state,
			AdminUserUID: auth.currentUser.uid,
			createdDate: timestamp,
		});

		setState({
			artist: '',
			title: '',
			imageUrl: '',
			audioUrl: '',
			format: '',
			genre: '',
			price: '',
			stock: '',
		});
	};

	return (
		<Segment>
			<Header as='h3'>Add A New Record</Header>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Input
						label='Artist'
						placeholder='Artist'
						width={8}
						value={state.artist}
						onChange={(e, data) => {
							setState({ ...state, artist: data.value });
						}}
					/>
					<Form.Input
						label='Title'
						placeholder='Title'
						width={8}
						value={state.title}
						onChange={(e, data) => {
							setState({ ...state, title: data.value });
						}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Input
						label='Image URL'
						placeholder='Image URL'
						width={16}
						value={state.imageUrl}
						onChange={(e, data) => {
							setState({ ...state, imageUrl: data.value });
						}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Input
						label='Audio URL'
						placeholder='Audio URL'
						width={16}
						value={state.audioUrl}
						onChange={(e, data) => {
							setState({ ...state, audioUrl: data.value });
						}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Select
						width={6}
						fluid
						label='Format'
						options={optionsFormat}
						placeholder='Format'
						value={state.format}
						onChange={(e, data) => {
							setState({ ...state, format: data.value });
						}}
					/>
					<Form.Select
						width={6}
						fluid
						label='Genre'
						options={optionsGenre}
						placeholder='Genre'
						value={state.genre}
						onChange={(e, data) => {
							setState({ ...state, genre: data.value });
						}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Input
						width={4}
						fluid
						label='Price (£)'
						placeholder='Price'
						value={state.price}
						onChange={(e, data) => {
							setState({ ...state, price: data.value });
						}}
					/>
					<Form.Input
						width={4}
						fluid
						label='Stock amount (1-10)'
						options={optionsGenre}
						placeholder='Stock Amount'
						value={state.stock}
						onChange={(e, data) => {
							setState({ ...state, stock: data.value });
						}}
					/>
				</Form.Group>
				<Form.Button>Submit</Form.Button>
			</Form>
		</Segment>
	);
}

export default AdminNewRecord;
