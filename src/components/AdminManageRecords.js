import React, { useEffect, useState } from 'react';
import { Button, Icon, Item, Label, Segment, Header } from 'semantic-ui-react';
import { fetchRecords, deleteRecord } from '../utils';

function AdminManageRecords() {
	const [recordsList, setRecordsList] = useState([]);

	useEffect(() => {
		(async function fetchData() {
			const records = await fetchRecords();
			setRecordsList(records);
		})();
	});

	return (
		<Segment>
			<Header as='h3'>Manage Records</Header>
			<Item.Group divided>
				{recordsList
					? recordsList.map(record => (
							<Item>
								<Item.Image size='tiny' src={record.imageUrl} />

								<Item.Content>
									<Item.Header as='a'>{record.title}</Item.Header>
									<Item.Meta>
										<span className='cinema'>{`by ${record.artist}`}</span>
									</Item.Meta>

									<Item.Extra>
										<Label
											icon='factory'
											content={`In stock: ${record.stock}`}
										/>
										<Label icon='pound' content={record.price} />
										<Label icon='info' content={record.genre} />
										<Label icon='tags' content={record.format} />
										<Button
											icon
											labelPosition='left'
											size='mini'
											primary
											floated='right'
											onClick={() => deleteRecord(record.documentID)}>
											Delete
											<Icon name='delete' />
										</Button>
									</Item.Extra>
									<Item.Extra></Item.Extra>
								</Item.Content>
							</Item>
					  ))
					: null}
			</Item.Group>
		</Segment>
	);
}

export default AdminManageRecords;
