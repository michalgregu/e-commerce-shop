import gql from 'graphql-tag';

const PRODUCTS = gql`
	query {
		productsList {
			items {
				id
				createdAt
				author
				title
				format
				genre
				price
				newStock
				outOfStock
				image {
					downloadUrl
				}
				audio {
					downloadUrl
				}
			}
		}
	}
`;

export default PRODUCTS;
