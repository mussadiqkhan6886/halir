'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FaEdit, FaTrash } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Link from 'next/link';
import { PerfumeType } from '@/type';

interface ProductTableProps {
  products: PerfumeType[];
}

export default function ProductTable({ products }: ProductTableProps) {

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/perfumes/${id}`);
      if (res.status === 200) {
        alert("Product deleted successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  const columns: GridColDef<any>[] = [

    {
    field: 'mainImage',
    headerName: 'Image',
    width: 100,
    sortable: false,
    renderCell: (params) => (
      params.row.mainImage ? (
        <img
          src={params.row.mainImage}
          alt={params.row.name}
          style={{ width: 60, height: 60, objectFit: 'cover'}}
        />
      ) : (
        <span>No Image</span>
      )
    ),
  },
    { field: 'name', headerName: 'Product Name', flex: 1, minWidth: 100 },
    { field: 'sizes', headerName: 'Sizes', width: 300, renderCell: (params) => (
      <div>
        {params.row.sizes.map((item: {sku: string, ml: string}) => (
          <p className='inline' key={item.sku}>{item.ml} ml, </p>
        ))}
      </div>
    ) },
    { field: 'gender', headerName: 'Gender', type: 'string', width: 100, },
    {
      field: 'longevity',
      headerName: 'longevity',
      type: 'string',
      width: 130,
    },
    {
      field: 'categories',
      headerName: 'Category',
      width: 220,
      renderCell: (params) => (
        <div>
          {params.row.categories.join(", ")}
        </div>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary">
            <Link href={`/admin-dashboard/update-product/${params.row._id}`}><FaEdit /></Link>
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row._id)}>
            <FaTrash />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%', borderRadius: 2 }}>
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row._id} 
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 10, 20]}
        showToolbar
        disableRowSelectionOnClick
      />
    </Box>
  );
}
