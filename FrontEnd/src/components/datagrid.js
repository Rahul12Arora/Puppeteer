import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import HttpService from '../services/httpService';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'facebook',
    headerName: 'Facebook',
    width: 110,
    editable: true,
  },
  {
    field: 'instagram',
    headerName: 'Instagram',
    width: 110,
    editable: true,
  },
  {
    field: 'linkedin',
    headerName: 'Linkedin',
    width: 110,
    editable: true,
  },
  {
    field: 'twitter',
    headerName: 'Twitter',
    width: 110,
    editable: true,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 110,
    editable: true,
  },
  {
    field: 'phoneno',
    headerName: 'Phone No',
    width: 110,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 110,
    editable: true,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataGridDemo(props) {
    
    const {tableData} = props;
    const [displayData, setDisplayData] = useState(tableData)

    const getDataOnPageLoading = async ()=>{
        console.log('getDataOnPageLoading')
        const response = await HttpService.all();
        setDisplayData(response.data.map((el,i)=>{
          return {
            ...el,
            id:i+1
          }
        }));
      }
    
      useEffect(()=>{
        console.log('useEffect')
        getDataOnPageLoading();
      },[])
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={displayData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}