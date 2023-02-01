import React, { useState, useEffect, Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, Backdrop, Button, CircularProgress, Snackbar } from '@mui/material';
import { deleteRequest, getRequest } from "../../utils/utils"

export const TownHallsList = () => {

  const [listTownHalls, setListTownHalls] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [range, setRange] = useState([0, 9]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(40);
  const [sortModel, setSortModel] = useState([]);

  useEffect(() => {
    getListTownHalls()
  }, [range, sortModel]);

  const getListTownHalls = () => {
    let sort = [`"id"`, `"desc"`]
    if (sortModel.length > 0) sort = [`"${sortModel[0].field}"`, `"${sortModel[0].sort}"`]
    getRequest(`townhalls?range=[${range}]&sort=[${sort}]`)
      .then((res) => {
        setListTownHalls(res.data)
      })
  }

  const deleteTownHall = (club) => {
    setIsLoading(true)
    deleteRequest(`townhalls/${club.id}`)
      .then(() => {
        window.location.reload(false)
      }).catch((e) => {
        setOpen(true)
      }).finally(() => {
        setIsLoading(false)
      })
  }


  const handleClose = () => {
    setOpen(false);
  };

  let navigate = useNavigate();
  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'address', headerName: 'Address', width: 330 },
    {
      field: "show",
      headerName: "Show",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate(`/townhalls/${params.id}`)
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
          navigate(`/townhalls/${params.id}/edit`)
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
          deleteTownHall(params)
        };

        return <Button onClick={onClick}>Delete</Button>;
      }
    },
    {
      field: "clubs",
      headerName: "Clubs",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate(`/clubs?idTH=${params.id}`)
        };

        return <Button onClick={onClick}>Clubs</Button>;
      }
    },
  ];

  return (
    <div>
      <h1>TownHalls</h1>

      <Button onClick={() => navigate(`/townhalls/create`)}>Create new townhall</Button>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={listTownHalls}
          rowCount={totalCount}
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