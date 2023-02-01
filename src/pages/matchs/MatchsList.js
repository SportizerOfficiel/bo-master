import React, { useState, useEffect, Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios"
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@mui/material';

const MatchsList = () => {

  const [listMatchs, setListMatchs] = useState([]);
  const [range, setRange] = useState([0, 9]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(40);
  const [sortModel, setSortModel] = useState([]);

  useEffect(() => {
    getListMatchs()
  }, [range, sortModel]);

  const getListMatchs = () => {
    let sort = [`"id"`, `"desc"`]
    if (sortModel.length > 0) sort = [`"${sortModel[0].field}"`, `"${sortModel[0].sort}"`]
    axios.get(`${process.env.REACT_APP_URL_API}/matchs?range=[${range}]&sort=[${sort}]`)
      .then((res) => {
        setListMatchs(res.data)
      })
  }

  const deleteMatch = (match) => {
    axios.delete(`${process.env.REACT_APP_URL_API}/matchs/${match.id}`)
      .then(() => {
        window.location.reload(false)
      })
  }

  let navigate = useNavigate();

  const columns = [
    { field: 'homeTeam', headerName: 'HomeTeam', width: 200 },
    { field: 'awayTeam', headerName: 'AwayTeam', width: 200 },
    { field: 'sport', headerName: 'Sport', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'category', headerName: 'Category', width: 200 },
    {
      field: "show",
      headerName: "Show",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate(`/matchs/${params.id}`)
        };

        return <Button onClick={onClick}>Show</Button>;
      }
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate(`/matchs/${params.id}/edit`)
        };

        return <Button onClick={onClick}>Edit</Button>;
      }
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          deleteMatch(params)
        };

        return <Button onClick={onClick}>Delete</Button>;
      }
    },
  ];

  return (
    <div>
      <h1>Matchs</h1>

      <Button onClick={() => navigate(`/matchs/create`)}>Create new Match</Button>

      <div style={{ height: "90vh", width: '100%' }}>
        <DataGrid
          rows={listMatchs}
          rowCount={totalCount}
          paginationMode="server"
          sortingMode='server'
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          disableColumnMenu
          columns={columns}
          pageSize={10}
          page={page}
          onPageChange={(newPage) => { setPage(newPage); setRange([newPage * 10, newPage * 10 + 9]) }}
        />
      </div>
    </div>
  );
};

export default MatchsList;