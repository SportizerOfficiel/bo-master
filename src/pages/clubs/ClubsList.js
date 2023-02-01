import React, { useState, useEffect, Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { Alert, Backdrop, Button, CircularProgress, Snackbar } from '@mui/material';
import { deleteRequest, getRequest } from '../../utils/utils';

export const ClubsList = (props) => {
  const [listClubs, setListClubs] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [range, setRange] = useState([0, 9]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(40);
  const [sortModel, setSortModel] = useState([]);

  const search = useLocation().search;
  const idTH = new URLSearchParams(search).get('idTH')

  let navigate = useNavigate();

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'sport', headerName: 'Sport', width: 200 },
    { field: 'address', headerName: 'Address', width: 330 },
    {
      field: "show",
      headerName: "Show",
      sortable: false,
      renderCell: (params) => {
        console.log(params)
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate(`/clubs/${params.id}`)
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
          navigate(`/clubs/${params.id}/edit`)
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
          deleteClub(params)
        };

        return <Button onClick={onClick}>Delete</Button>;
      }
    },
  ];


  useEffect(() => {
    getListClubs()
  }, [range, sortModel]);

  const getListClubs = () => {
    let sort = [`"id"`, `"desc"`]
    if (sortModel.length > 0) sort = [`"${sortModel[0].field}"`, `"${sortModel[0].sort}"`]
    if (idTH !== null) {
      getRequest(`townhalls/${idTH}/clubs?range=[${range}]&sort=[${sort}]`)
        .then((res) => {
          setListClubs(res.data)
        })
    } else {
      getRequest(`clubs?range=[${range}]&sort=[${sort}]`)
        .then((res) => {
          setListClubs(res.data)
        })
    }
  }

  const deleteClub = (club) => {
    setIsLoading(true)
    deleteRequest(`clubs/${club.id}`)
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

  const urlCreateClub = idTH !== null ? `/clubs/create?idTH=${idTH}` : `/clubs/create`

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Clubs</h1>

      <Button onClick={() => navigate(urlCreateClub)}>Create new Club</Button>
      {console.log(listClubs)}
      <DataGrid
          rows={listClubs}
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