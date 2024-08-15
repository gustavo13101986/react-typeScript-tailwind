import React, { useContext } from 'react';
import { Layout } from '@/Components/Layout';
import { ShoppingCartContext } from '@/Context';
import { Table } from '@/Components/Table';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";


export type MyOrderProps = {
	// types...
}

const MyOrder: React.FC<MyOrderProps> = () => {

	const context = useContext(ShoppingCartContext);
	const params = useParams();
	let indexOrderPath = Number(params.id);


	if (!context) {
		throw new Error("useContext debe ser utilizado dentro de un ShoppingCartProvider");
	}

	const { order } = context;

	if (!indexOrderPath) indexOrderPath = order?.length - 1

	return (
		<Layout>
			<div className='flex items-center justify-center relative w-80 mb-6'>
				<Link to='/my-orders' className='absolute left-0'>
					<ChevronLeftIcon
						className="size-6 text-black cursor-pointer"
					/>
				</Link>
				<h1>MyOrders</h1>
			</div>
			{/* MyOrder works!
			<div className='px-6 overflow-y-scroll flex-1'>
				{
					order?.slice(-1)[0].products.map((product) => (
						<OrderCard
							key={product.id}
							id={product.id}
							title={product.title}
							imageUrl={product.image}
							price={product.price}
						/>
					))
				}
			</div> */}
			<Table
				_data={order?.[indexOrderPath]?.products}
			/>
		</Layout>
	);
};

export default MyOrder;
