import React, { ReactNode } from 'react';
import './Layout.css';

export type LayoutProps = {
	children?: ReactNode 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className='flex flex-col items-center mt-16 pt-4'>
			{children}
		</div>
	);
};

export default Layout;
