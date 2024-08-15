import React, { useContext, useEffect } from 'react';
import { Layout } from '@/Components/Layout';
import { Card } from '@/Components/Card';
import { ProductDetail } from '@/Components/ProductDetail';
import { ShoppingCartContext } from '@/Context';
// import { dataTest } from '@/dataTest/data';

export type HomeProps = {
	// types...
}

const Home: React.FC<HomeProps> = () => {

	const context = useContext(ShoppingCartContext);

	if (!context) {
		throw new Error("useContext debe ser utilizado dentro de un ShoppingCartProvider");
	}

	const { items, searchByTitle, setSearchByTitle, filteredItems, searchByCategory } = context;

	useEffect(() => {
		return () => {
			setSearchByTitle("")
		}
	}, []);

	return (
		<Layout>
			<div className='flex items-center justify-center relative w-80 mb-4'>
				<h1 className='font-medium text-xl'>Exclusive Products</h1>
			</div>
			<input
				type="text"
				placeholder='Search a product'
				className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
				onChange={(event) => setSearchByTitle(event.target.value)}
				value={searchByTitle}
			/>
			<div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
				{searchByTitle?.length > 0 || searchByCategory?.length > 0 ?
					<>
						{filteredItems.map((item, index) => (
							<Card
								key={index}
								data={item}
								name={item.category}
								title={item.title}
								image={item.image}
								price={item.price}
							/>
						))}

					</>
					:
					<>
						{items.map((item, index) => (
							<Card
								key={index}
								data={item}
								name={item.category}
								title={item.title}
								image={item.image}
								price={item.price}
							/>
						))}
					</>
				}
				<ProductDetail />
			</div>
		</Layout>
	);
};

export default Home;
