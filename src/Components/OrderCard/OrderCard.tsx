import React from 'react';
import './OrderCard.css';
import { XMarkIcon } from '@heroicons/react/24/solid';

export type OrderCardProps = {
	id: number
	title: string,
	imageUrl: string,
	price: number
	handleDelete?: (id:number) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({id, title, imageUrl, price, handleDelete}) => {
	return (
		<div className='flex justify-between items-center mb-2'>
			<div className='flex items-center gap-2'>
				<figure className='w-20 h-20'>
					<img className='w-full h-full rounded-lg object-cover' src={imageUrl} alt={title} />
				</figure>
				<p className='text-sm font-light'></p>
			</div>
			<div className='flex items-center gap-2'>
				<p className='text-lg font-medium'>{price}</p>
				{handleDelete &&
					<XMarkIcon onClick={()=> handleDelete(id)} className="size-6 text-black cursor-pointer" />
				}
			</div>
		</div>
	);
};

export default OrderCard;
