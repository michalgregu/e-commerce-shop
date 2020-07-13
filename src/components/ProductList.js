import React, { useState, useEffect } from 'react';

import { Grid } from 'semantic-ui-react';

import ProductCard from './ProductCard';
import { fetchRecords } from '../utils';

function ProductList() {
	const [recordsList, setRecordsList] = useState([]);

	useEffect(() => {
		(async function fetchData() {
			const records = await fetchRecords();
			setRecordsList(records);
		})();
	}, []);
	return (
		<Grid container relaxed columns={4}>
			{recordsList.map(record => (
				<Grid.Column key={record.documentID}>
					<ProductCard record={record} />
				</Grid.Column>
			))}
		</Grid>
	);
}

export default ProductList;
