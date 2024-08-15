import React, { useContext } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { ShoppingCartContext } from '@/Context';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';


export type NavbarProps = {
	// types...
}

const Navbar: React.FC<NavbarProps> = () => {

	const context = useContext(ShoppingCartContext);

	if (!context) {
		throw new Error("useContext debe ser utilizado dentro de un ShoppingCartProvider");
	}

	const { count, setSearchByCategory } = context;

	const activeStyle = "underline underline-offset-4"

	return (
		<nav className='navbar flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'>
			<ul className='flex items-center gap-3'>
				<li className='font-semibold text-lg'>
					<NavLink onClick={() => setSearchByCategory('')} to='/'>
						Shopi
					</NavLink>
				</li>
				<li>
					<NavLink onClick={() => setSearchByCategory('')} to='/' className={({ isActive }) =>
						isActive ? activeStyle : undefined
					}
					>
						All
					</NavLink>
				</li>
				<li>
					<NavLink onClick={() => setSearchByCategory("men's clothing")} to='/clothes' className={({ isActive }) =>
						isActive ? activeStyle : undefined
					}
					>
						Clothes
					</NavLink>
				</li>
				<li>
					<NavLink onClick={() => setSearchByCategory('electronics')} to='/electronics' className={({ isActive }) =>
						isActive ? activeStyle : undefined
					}
					>
						Electronics
					</NavLink>
				</li>
				<li>
					<NavLink onClick={() => setSearchByCategory('furnitures')} to='/furnitures' className={({ isActive }) =>
						isActive ? activeStyle : undefined
					}
					>
						Furnitures
					</NavLink>
				</li>
				<li>
					<NavLink onClick={() => setSearchByCategory('jewelery')} to='/toys' className={({ isActive }) =>
						isActive ? activeStyle : undefined
					}
					>
						Toys
					</NavLink>
				</li>
				<li>
					<NavLink onClick={() => setSearchByCategory('others')} to='/others' className={({ isActive }) =>
						isActive ? activeStyle : undefined
					}
					>
						Others
					</NavLink>
				</li>
			</ul>

			<ul className='flex items-center gap-3'>
				<li className='text-white/60'>
					test@cadena.com
				</li>
				<li>
					<NavLink to='/my-orders' className={({ isActive }) =>
						isActive ? activeStyle : undefined
					}
					>
						My Orders
					</NavLink>
				</li>
				<li>
					<NavLink to='/my-account' className={({ isActive }) =>
						isActive ? activeStyle : undefined
					}
					>
						My Account
					</NavLink>
				</li>
				<li>
					<NavLink to='/sign-in' className={({ isActive }) =>
						isActive ? activeStyle : undefined
					}
					>
						Sign In
					</NavLink>
				</li>
				<li>
					<NavLink to='/furnitures' className={({ isActive }) =>
						isActive ? activeStyle : undefined
					}
					>
					</NavLink>
				</li>
				<li className='flex items-center'>
					<ShoppingCartIcon className="size-6 text-white" />
					<div>{count}</div>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
