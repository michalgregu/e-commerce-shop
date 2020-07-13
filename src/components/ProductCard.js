import React, { useContext } from 'react';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';
import { Card, Icon, Image, Button } from 'semantic-ui-react';

import CartContext from '../context/CartContext';

function ProductCard({ record }) {
	const [cart, setCart] = useContext(CartContext);
	const {
		artist,
		audioUrl,
		format,
		genre,
		imageUrl,
		price,
		stock,
		title,
	} = record;

	const addToCart = () => {
		setCart([...cart, record]);
	};

	return (
		<Card centered raised>
			<Image src={imageUrl} wrapped ui={false} />
			<Card.Content>
				<Card.Header>{title}</Card.Header>
				<Card.Header>by {artist}</Card.Header>
				<Card.Meta>
					<span className='date'>genre: {genre}</span>
				</Card.Meta>
				<Card.Meta>
					<span className='date'>format: {format}</span>
				</Card.Meta>
				<StyledReactAudioPlayer
					controlsList='nodownload'
					src={audioUrl}
					controls
				/>
			</Card.Content>
			<Card.Content extra>
				<Button.Group floated='left'>
					<Button
						onClick={addToCart}
						animated='vertical'
						size='large'
						style={{ width: '100px' }}>
						<Button.Content hidden>Add To Cart</Button.Content>
						<Button.Content visible>
							<Icon name='shop' />
						</Button.Content>
					</Button>
				</Button.Group>
				<StyledSpan>£ {stock === '0' ? 'Out of Stock' : price}</StyledSpan>
			</Card.Content>
		</Card>
	);
}

export default ProductCard;

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
