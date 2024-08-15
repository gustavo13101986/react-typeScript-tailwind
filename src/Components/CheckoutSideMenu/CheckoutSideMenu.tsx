import React, { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '@/Context';
import './CheckoutSideMenu.css';
import { OrderCard } from '../OrderCard';
import { totalPrice } from '@/utils';
import { Link } from 'react-router-dom';
import { Test } from '../Test';

export type CheckoutSideMenuProps = {
	// types...
}

const CheckoutSideMenu: React.FC<CheckoutSideMenuProps> = () => {
	
	const context = useContext(ShoppingCartContext);

	if (!context) {
		throw new Error("useContext debe ser utilizado dentro de un ShoppingCartProvider");
	}

	const { isCheckoutSideMenuOpen, closeCheckoutSideMenu, cartProducts, setCartProducts, order, setOrder } = context;

	const handleDelete = (id: number) => {
		const filteredProducts = cartProducts.filter(product => (product.id !== id))
		setCartProducts(filteredProducts)
	}

	const handleCheckout = () => {
		const orderToAdd = {
			date: '13-08-2024',
			products: cartProducts,
			totalProducts: cartProducts.length,
			totalPrice: totalPrice(cartProducts)
		}
		setOrder([...order, orderToAdd])
		setCartProducts([])
	}

	
	return (
		<aside
			className={`${isCheckoutSideMenuOpen ? 'show-checkout-side-menu' : 'hidden'} 
			checkout-side-menu flex flex-col fixed right-0 border border-black rounded-lg bg-white`}
		>
			<div className='flex justify-between items-center p-6'>
				<h2 className='font-medium text-xl'>My Order</h2>
				<div>
					<XMarkIcon
						className="size-6 text-black cursor-pointer"
						onClick={() => closeCheckoutSideMenu()}
					/>
				</div>
			</div>
			<div className='px-6 overflow-y-scroll flex-1'>
				{
					cartProducts.map((product) => (
						<OrderCard
							key={product.id}
							id={product.id}
							title={product.title}
							imageUrl={product.image}
							price={product.price}
							handleDelete={handleDelete}
						/>
					))
				}
			</div>
			<div className='px-6 mb-6'>
				<p className='flex justify-between items-center'>
					<span>Total:</span>
					<span>${totalPrice(cartProducts)}</span>
				</p>
				<Link to={'/my-orders/last'}>
					<button className='bg-black py-3 w-full text-white rounded-lg' onClick={() => handleCheckout()}>Checkout</button>
				</Link>
			</div>
			<Test id={1}/>
		</aside>
	);
};

export default CheckoutSideMenu;
