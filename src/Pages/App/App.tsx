import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import './App.css';
import { Home } from '../Home';
import { MyAccount } from '../MyAccount';
import { MyOrder } from '../MyOrder';
import { MyOrders } from '../MyOrders';
import { Signin } from '../Signin';
import { NoFound } from '../NoFound';
import { Navbar } from '@/Components/Navbar';
import ShoppingCartProvider from '../../Context/index.js'
import CheckoutSideMenu from '@/Components/CheckoutSideMenu/CheckoutSideMenu.js';

export type AppProps = {
	// types...
}

const AppRoutes = () => {
	const routes = useRoutes([
		{ path: '/', element: <Home /> },
		{ path: '/clothes', element: <Home /> },
		{ path: '/electronics', element: <Home /> },
		{ path: '/furnitures', element: <Home /> },
		{ path: '/toys', element: <Home /> },
		{ path: '/others', element: <Home /> },
		{ path: '/my-account', element: <MyAccount /> },
		{ path: '/my-orders', element: <MyOrders /> },
		{ path: '/my-orders/last', element: <MyOrder /> },
		{ path: '/my-orders/:id', element: <MyOrder /> },
		{ path: '/my-order', element: <MyOrder /> },
		{ path: '/sign-in', element: <Signin /> },
		{ path: '/*', element: <NoFound /> },
	])

	return routes
}

const App: React.FC<AppProps> = () => {
	
	return (
		<ShoppingCartProvider>
			<BrowserRouter>
				<AppRoutes />
				<Navbar />
				<CheckoutSideMenu />
			</BrowserRouter>
		</ShoppingCartProvider>
);
};

export default App;
