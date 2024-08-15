"use client";
import React from 'react';
import './Test.css';

export type TestProps = {
	id: number
}

const Test: React.FC<TestProps> = ({ id }) => {
	console.log(id)
	return (
		<div className='test'>
			Test works!
		</div>
	);
};

export default Test;
