import React, { useContext } from 'react';
import { ShoppingCartContext } from '@/Context';
import './Card.css';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import { Product } from '@/models/products';

export type CardProps = {
	data: Product
	name: string
	image: string
	price: number
	title: string
}

const Card: React.FC<CardProps> = ({ data, name, image, price, title }) => {

	const context = useContext(ShoppingCartContext);

	if (!context) {
		throw new Error("useContext debe ser utilizado dentro de un ShoppingCartProvider");
	}

	const { count, setCount, openProductDetail, setProductToShow, setCartProducts, cartProducts, openCheckoutSideMenu, closeProductDetail } = context;

	const showProduct = (productDetal: Product) => {
		openProductDetail()
		setProductToShow(productDetal)
	}

	const addProductsToCart = (event: React.MouseEvent<HTMLElement>, productDetal: Product) => {
		event.stopPropagation()
		setCount(count + 1)
		setCartProducts([
			...cartProducts,
			productDetal
		])
		openCheckoutSideMenu()
		closeProductDetail()

	}


	const renderIcon = (id: number) => {
		const isInCart = cartProducts.filter(product => product.id === id).length > 0

		if (isInCart) {
			return (
				<div
					className='absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1'>
					<CheckIcon className="size-6 text-white" />
				</div>
			)
		} else {
			return (
				<div
					className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1'
					onClick={(event) => addProductsToCart(event, data)} >
					<PlusIcon className="size-6 text-black" />
				</div>
			)
		}
	}


	return (
		<div
			className='bg-white w-56 h-60 rounded-lg mb-2 border-2 p-2'
			onClick={() => showProduct(data)}
		>
			<figure className='relative mb-2 w-full h-4/5 cursor-pointer'>
				<span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{name}</span>
				<img className='w-full h-full object-cover rounded-lg' src={image} alt={title} />
				{renderIcon(data.id)}
			</figure>
			<p className='flex justify-between'>
				<span className='text-sm font-light'>{title}</span>
				<span className='text-lg font-light'>${price}</span>
			</p>
		</div>
	);
};

export default Card;
