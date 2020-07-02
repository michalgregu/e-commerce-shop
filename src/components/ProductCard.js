import React from 'react';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';

import { Card, Icon, Image, Button } from 'semantic-ui-react';

function ProductCard({ item }) {
	const {
		id,
		author,
		title,
		format,
		genre,
		price,
		newStock,
		outOfStock,
		image,
		audio,
	} = item;

	return (
		<StyledCard centered raised>
			<Image
				src={image.downloadUrl}
				wrapped
				ui={false}
				label={
					newStock
						? {
								as: 'a',
								content: 'New!',
								color: 'blue',
								size: 'large',
								ribbon: true,
						  }
						: false
				}
			/>
			<Card.Content>
				<Card.Header>{title}</Card.Header>
				<Card.Header>by {author}</Card.Header>
				<Card.Meta>
					<span className='date'>genre: {genre}</span>
				</Card.Meta>
				<Card.Meta>
					<span className='date'>format: {format}</span>
				</Card.Meta>
				<StyledReactAudioPlayer
					controlsList='nodownload'
					src={audio.downloadUrl}
					controls
				/>
			</Card.Content>
			<Card.Content extra>
				<Button.Group floated='left'>
					<Button animated='vertical' size='large' style={{ width: '100px' }}>
						<Button.Content hidden>Add To Cart</Button.Content>
						<Button.Content visible>
							<Icon name='shop' />
						</Button.Content>
					</Button>
				</Button.Group>
				<StyledSpan>£ {outOfStock ? 'Out of Stock' : price}</StyledSpan>
			</Card.Content>
		</StyledCard>
	);
}

export default ProductCard;

const StyledCard = styled(Card)`
	position: relative;
`;

const StyledSpan = styled.span`
	transform: translateY(5px);
	position: absolute;
	right: 5px;
	bottom: 26px;
	font-size: 20px;
`;

const StyledReactAudioPlayer = styled(ReactAudioPlayer)`
	width: 100%;
	height: 40px;
	outline: none;
	margin-top: 10px;
`;
