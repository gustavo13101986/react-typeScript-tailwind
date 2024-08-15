import React from 'react';
import './OrdersCard.css';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export type OrdersCardProps = {
	totalPrice: number;
	totalProduct: number
}

const OrdersCard: React.FC<OrdersCardProps> = ({ totalPrice, totalProduct }) => {
	return (
		<div className='flex justify-between items-center mb-3 border border-black rounded-lg p-4 w-80'>
			<div className='flex justify-between w-full'>
				<p className='flex flex-col'>
					<span className='font-light'>01.02.23</span>
					<span className='font-light'>{totalProduct} arttcles</span>
				</p>
				<p className='flex items-center'>
					<span className='font-medium text-2xl'>$ {totalPrice}</span>
					<ChevronRightIcon
						className="h6 w-6 text-black cursor-pointer"
					/>
				</p>
			</div>
		</div>
	);
};

export default OrdersCard;
