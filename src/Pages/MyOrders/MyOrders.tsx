import React, { useContext } from 'react';
import { Layout } from '@/Components/Layout';
import './MyOrders.css';
import { OrdersCard } from '@/Components/OrdersCard';
import { ShoppingCartContext } from '@/Context';
import { Link } from 'react-router-dom';


export type MyOrdersProps = {
	// types...
}

const MyOrders: React.FC<MyOrdersProps> = () => {

	const context = useContext(ShoppingCartContext);

	if (!context) {
		throw new Error("useContext debe ser utilizado dentro de un ShoppingCartProvider");
	}

	const { order } = context;

	return (
		<Layout>
			MyOrders works!
			{
				order.map((order, index) => (
					<Link key={index} to={`/my-orders/${index}`}>
						<OrdersCard
							totalPrice={order.totalPrice}
							totalProduct={order.totalProducts}
						/>
					</Link>
				))
			}
		</Layout>
	);
};

export default MyOrders;
