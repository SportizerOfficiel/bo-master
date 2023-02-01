import React, { useState, useEffect, Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, Backdrop, Button, CircularProgress, Snackbar } from '@mui/material';
import { getRequest, deleteRequest } from '../../utils/utils';

const PlayersList = () => {

  const [listPlayers, setListPlayers] = useState([]);
  const [range, setRange] = useState([0, 9]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(40);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortModel, setSortModel] = useState([]);

  console.log(sortModel[0])
  
  useEffect(() => {
    getListPlayers()
  }, [range, sortModel]);

  const getListPlayers = () => {
    let sort = [`"id"`, `"desc"`]
    if (sortModel.length > 0) sort = [`"${sortModel[0].field}"`, `"${sortModel[0].sort}"`]
    getRequest(`players?range=[${range}]&sort=[${sort}]`)
      .then((res) => {
        setListPlayers(res.data)
      })
  }

  const deletePlayer = (club) => {
    setIsLoading(true)
    deleteRequest(`players/${club.id}`)
      .then(() => {
        window.location.reload(false)
      }).catch((e) => {
        setOpen(true)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  let navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: 'firstName', headerName: 'FirstName', width: 200 },
    { field: 'lastName', headerName: 'LastName', width: 200 },
    { field: 'sport', headerName: 'Sport', width: 200 },
    { field: 'category', headerName: 'Category', width: 200 },
    {
      field: "show",
      headerName: "Show",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate(`/players/${params.id}`)
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
          navigate(`/players/${params.id}/edit`)
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
          deletePlayer(params)
        };

        return <Button onClick={onClick}>Delete</Button>;
      }
    },
  ];

  console.log(listPlayers)
  
  return (
    <div>
      <h1>Players</h1>

      <Button onClick={() => navigate(`/players/create`)}>Create new Player</Button>

      <div style={{ height: "90vh", width: '100%' }}>
        <DataGrid
          rows={listPlayers}
          rowCount={totalCount}
          paginationMode="server"
          sortingMode='server'
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          disableColumnMenu
          columns={columns}
          pageSize={10}
          page={page}
          onPageChange={(newPage) => {setPage(newPage); setRange([newPage*10, newPage*10+9])}}
        />
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          An error has occured
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default PlayersList;