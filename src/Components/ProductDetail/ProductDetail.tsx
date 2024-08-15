import React, { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid'
import './ProductDetail.css';
import { ShoppingCartContext } from '@/Context';

export type ProductDetailProps = {
	// types...
}


const ProductDetail: React.FC<ProductDetailProps> = () => {

	const context = useContext(ShoppingCartContext);

	if (!context) {
		throw new Error("useContext debe ser utilizado dentro de un ShoppingCartProvider");
	}

	const { isProductDetailOpen, closeProductDetail, productToShow } = context;

	return (
		<aside
			className={`${isProductDetailOpen ? 'show-product-detail' : 'hidden'} product-detail flex flex-col fixed right-0 border border-black rounded-lg bg-white`}
		>
			<div className='flex justify-between items-center p-6'>
				<h2 className='font-medium text-xl'>Detail</h2>
				<div>
					<XMarkIcon
						className="size-6 text-black cursor-pointer"
						onClick={() => closeProductDetail()}
					/>
				</div>
			</div>
			<figure className='px-6'>
				<img
					className='w-full h-64 object-cover rounded-lg'
					src={productToShow?.image}
					alt={productToShow?.title} />
			</figure>
			<p className='flex flex-col p-6'>
				<span className='font-medium text-2xl'>${productToShow?.price}</span>
				<span className='font-medium text-md'>{productToShow?.title}</span>
				<span className='font-light text-sm'>{productToShow?.description}</span>
			</p>
		</aside>
	);
};

export default ProductDetail;
