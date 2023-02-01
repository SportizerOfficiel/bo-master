import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Backdrop, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Snackbar, Stack, TextField } from '@mui/material';
import { getRequest, putRequest } from '../../utils/utils';

export const ClubsEdit = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [sport, setSport] = useState("");
    const [idClub, setIdClub] = useState("");
    const [idTH, setIdTH] = useState("");
    const [townHall, setTownHall] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();

    const { id } = useParams()

    const GetClub = async () => {
        await getRequest(`clubs/${id}`)
            .then(async res => {
                const club = res.data
                setName(club.name)
                setAddress(club.address)
                setSport(club.sport)
                setIdClub(club.id)
                setIdTH(club.idTH)
                getRequest(`townhalls/${club.idTH}`)
                    .then(res => {
                        const townhall = res.data
                        setTownHall(townhall.name)
                    })
            })
    }

    const updateClub = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        await putRequest(`townhalls/${idTH}/clubs/${idClub}`, {
            "name": name,
            "sport": sport,
            "address": address,
            "idTH": idTH
        })
            .then(() => {
                navigate("/clubs")
            }).catch((e) => {
                setOpen(true)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        GetClub()
    }, []);


    return (
        <div>
            <h1>Club Edit</h1>

            <form onSubmit={updateClub}>
                <Stack direction="column" spacing={3}>
                    <TextField
                        required
                        id="townhall"
                        variant="standard"
                        label="Townhall"
                        value={townHall}
                        disabled
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="Name"
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <FormControl required>
                        <InputLabel id="sport">Sport</InputLabel>
                        <Select
                            id="sport"
                            label="Sport"
                            variant="standard"
                            value={sport}
                            onChange={(e) => setSport(e.target.value)}
                            required
                        >
                            <MenuItem value="Basket" key="">Basket</MenuItem>
                            {/* <MenuItem value="Foot" key="">Foot</MenuItem> */}
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        id="standard-required"
                        label="Address"
                        variant="standard"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button type='submit' variant="contained">Update Club</Button>
                </Stack>
            </form >
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