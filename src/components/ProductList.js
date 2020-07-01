import React from 'react';

import { Query } from 'react-apollo';
import { Grid, Container } from 'semantic-ui-react';

import PRODUCTS from './products/index';
import ProductCard from './ProductCard';

function ProductList() {
	return (
		<Query query={PRODUCTS}>
			{({ loading, error, data }) => {
				if (loading) return <div>Fetching</div>;
				if (error) return <div>Error</div>;

				const items = data.productsList.items;

				return (
					// <Container>
					<Grid container relaxed columns={4}>
						{items.map(item => (
							<Grid.Column key={item.id}>
								<ProductCard item={item} />
							</Grid.Column>
						))}
					</Grid>
					// </Container>
				);
			}}
		</Query>
	);
}

export default ProductList;
