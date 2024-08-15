import React from 'react';
import './Table.css';

import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'

export type TableProps = {
	_data: Product[]
}

type Product = {
	id: number;
	title: string;
	category: string;
	price: number

}

const columnHelper = createColumnHelper<Product>()

const columns = [
	columnHelper.accessor('id', {
		cell: info => info.getValue(),
		// footer: info => info.column.id,
	}),
	columnHelper.accessor('title', {
		cell: info => info.getValue(),
		// footer: info => info.column.id,
	}),
	columnHelper.accessor('category', {
		cell: info => info.getValue(),
		// footer: info => info.column.id,
	}),
	columnHelper.accessor('price', {
		cell: info => info.getValue(),
		// footer: info => info.column.id,
	}),
]


const Table: React.FC<TableProps> = ({ _data }) => {

	const [data, _setData] = React.useState(() => [..._data])

	// const rerender = React.useReducer(() => ({}), {})[1]

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})
	return (
		<div className="p-2">
			<table>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
