import { Alert, Backdrop, Button, CircularProgress, Snackbar, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRequest, putRequest } from '../../utils/utils';

export const TownHallsEdit = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();

    const { id } = useParams()

    const GetTownHall = async () => {
        await getRequest(`townhalls/${id}`)
            .then(async res => {
                const townhall = res.data
                setName(townhall.name)
                setAddress(townhall.address)
            })
    }

    const updateTownHall = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        await putRequest(`townhalls/${id}`, {
            "name": name,
            "address": address,
        })
            .then(() => {
                navigate("/townhalls")
            }).catch((e) => {
                setOpen(true)
            }).finally(()=>{
                setIsLoading(false)
              })
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        GetTownHall()
    }, []);

    return (
        <div>
            <h1>TownHall Edit</h1>

            <form onSubmit={updateTownHall}>
                <Stack direction="column" spacing={3}>
                    <TextField
                        required
                        id="standard-required"
                        label="Name"
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="Address"
                        variant="standard"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button type='submit' variant="contained">Update townhall</Button>
                </Stack>
            </form>
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